import pool from "../database/db";
import {decryptRows} from "./encryption";
import {userData} from "../database/userData";
import {defaultOrgData} from "../database/orgData";
import {eventData} from "../database/eventData";

const getEntries = async (multi: boolean, idKey:string, idValue:string, tableName: string, columns:string[]) => {
	let entries:any;
	let status;
	let queryParams = columns.join(", ");
	let errors:string[] = []
	try {
		if (multi && (idKey==="" || idValue==="")) {
			entries = await pool.query(`SELECT ${queryParams} FROM ${tableName}`)
		} else if (multi && (idKey!=="" && idValue!=="")) {
			entries = await pool.query(
				`SELECT ${queryParams} FROM ${tableName} WHERE ${idKey} = $1`,
				[idValue]
			)
		} else {
			entries = await pool.query(
				`SELECT ${queryParams} FROM ${tableName} WHERE ${idKey} = $1 LIMIT 1`,
				[idValue]
			)
		}
		if (entries.rows) {
			entries = entries.rows;
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
			const {status:userDataStatus, entries, errors:userDataErrors} = await getEntries(false, "id", accountValues.user_data_id, "user_data",userData.dataKeys);
			status = userDataStatus;
			result = decryptRows(entries, userData.dataKeys)[0];
			errors = userDataErrors;
		} else if (accountValues.account_type==="org") {
			const {status:orgDataStatus, entries, errors:orgDataErrors} = await getEntries(false, "id", accountValues.org_data_id, "org_data", Object.keys(defaultOrgData));
			status = orgDataStatus;
			result = decryptRows(entries, Object.keys(defaultOrgData))[0];
			errors = orgDataErrors;
		} else errors.push("invalid account type");
	} else status = 404;
	return {status: status, account: result, errors: errors}
}
const getUsers = async () => {
	const {status, entries, errors} = await getEntries(true, "", "", "user_data", userData.dataKeys);
	return {status: status, users: decryptRows(entries, userData.dataKeys), errors: errors}
}
const getEvent = async (eventId:string) => {
	const {status, entries, errors} = await getEntries(false, "id", eventId, "events", eventData.eventKeys);
	return {status: status, event: entries[0], errors: errors}
}
const getEvents = async () => {
	const {status, entries, errors} = await getEntries(true, "", "", "events", eventData.eventKeys);
	return {status: status, events: entries, errors: errors}
}
const getOrgEvents = async (org_id:string) => {
	const {status, entries, errors} = await getEntries(true, "owner", org_id, "events", eventData.eventKeys);
	return {status: status, events: entries, errors: errors}
}
export {getAccount, getUsers, getEvent, getEvents, getOrgEvents}