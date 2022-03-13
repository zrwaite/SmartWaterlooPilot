import pool from "../database/db";
import {decrypt} from "./encryption";
import {defaultUserData, userDataPairs} from "../database/userData";
import {defaultOrgData, orgDataPairs} from "../database/orgData";

type defaultEntry = typeof defaultUserData|typeof defaultOrgData;
const parseRow = (defaultReturn:defaultEntry, encryptedKeys:{iv:string, name:string}[], rows: any[]) => {
	let result = defaultReturn;
	encryptedKeys.forEach((pair) => {
		result[pair.name as keyof typeof defaultReturn] = decrypt({iv: rows[0][pair.iv], content: rows[0][pair.name]})
	})
	return result;
}
const getEntries = async (multi: boolean, idKey:string, idValue:string, tableName: string, defaultReturn:defaultEntry, encryptedKeys:{iv:string, name:string}[]) => {
	let entries:any;
	let status;
	let queryParams = "";
	let errors:string[] = []
	encryptedKeys.forEach((pair, i) => queryParams += `${i?", ":""}${pair.iv}, ${pair.name}`);
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
			let results = [];
			for (let i = 0; i<entries.rows.length; i++) {
				results.push(parseRow(defaultReturn, encryptedKeys, entries.rows));
			}
			status = 200;
			entries = results;
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
			const {status:userDataStatus, entries, errors:userDataErrors} = await getEntries(false, "id", accountValues.user_data_id, "user_data", defaultUserData, userDataPairs);
			status = userDataStatus;
			result = entries[0];
			errors = userDataErrors;
		} else if (accountValues.account_type==="org") {
			const {status:orgDataStatus, entries, errors:orgDataErrors} = await getEntries(false, "id", accountValues.org_data_id, "org_data", defaultOrgData, orgDataPairs);
			status = orgDataStatus;
			result = entries[0];
			errors = orgDataErrors;
		} else errors.push("invalid account type");
	} else status = 404;
	return {status: status, account: result, errors: errors}
}
const getUsers = async () => {
	const {status, entries, errors} = await getEntries(true, "", "", "user_data", defaultUserData, userDataPairs);
	return {status: status, users: entries, errors: errors}
}
export {getAccount, getUsers}