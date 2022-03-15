import pool from "../database/db";
import {decrypt} from "./encryption";
import {defaultUserData} from "../database/userData";
import {defaultOrgData} from "../database/orgData";

type defaultEntry = typeof defaultUserData|typeof defaultOrgData;
const getEncryptedEntries = async (multi: boolean, idKey:string, idValue:string, tableName: string, columns:string[]) => {
	let entries:any;
	let status;
	let queryParams = columns.join(", ");
	let errors:string[] = []
	try {
		if (multi) {
			entries = await pool.query(`SELECT ${queryParams} FROM ${tableName}`)
		} else {
			entries = await pool.query(
				`SELECT ${queryParams} FROM ${tableName} WHERE ${idKey} = $1 LIMIT 1`,
				[idValue]
			)
		}
		if (entries.rows) {
			let rows = [];
			for (let i =0; i<entries.rows.length; i++) {
				let rowObject:any = {};
				columns.forEach((column) => {
					rowObject[column] = decrypt(entries.rows[i][column])
				})
				rows.push(rowObject);
			}
			entries = rows;
			status = 200;
		} else status = 404;
	} catch (e) {
		console.log(e)
		errors.push("database error");
		status = 400;
	}
	return {status: status, entries: entries, errors: errors};
}
const getAccount = async (userid:string) => {
	let status = 400;
	let result;
	let errors:string[] = [];
	const accountData = await pool.query(
		`SELECT user_data_id, org_data_id, account_type FROM accounts WHERE account_id = $1 LIMIT 1`,
		[userid]
	)
	const accountValues = accountData.rows[0];
	if (accountValues) {
		if (accountValues.account_type==="user") {
			const {status:userDataStatus, entries, errors:userDataErrors} = await getEncryptedEntries(false, "id", accountValues.user_data_id, "user_data", Object.keys(defaultUserData));
			status = userDataStatus;
			result = entries[0];
			errors = userDataErrors;
		} else if (accountValues.account_type==="org") {
			const {status:orgDataStatus, entries, errors:orgDataErrors} = await getEncryptedEntries(false, "id", accountValues.org_data_id, "org_data", Object.keys(defaultOrgData));
			status = orgDataStatus;
			result = entries[0];
			errors = orgDataErrors;
		} else errors.push("invalid account type");
	} else status = 404;
	return {status: status, account: result, errors: errors}
}
const getUsers = async () => {
	const {status, entries, errors} = await getEncryptedEntries(true, "", "", "user_data", Object.keys(defaultUserData));
	return {status: status, users: entries, errors: errors}
}
export {getAccount, getUsers}