import pool from "../database/db";
import {decryptRows} from "./encryption";
import {userData} from "../database/userData";
import {orgData} from "../database/orgData";
import {eventData} from "../database/eventData";
import {surveyData} from "../database/surveyData";

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
const getUser = async (userid:string) => {
	let result;
	const data = await pool.query(
		`SELECT user_data_id FROM users WHERE u_id = $1 LIMIT 1`,
		[userid]
	)
	const {status, entries, errors} = await getEntries(false, "id", data.rows[0].user_data_id, "user_data", userData.dataKeys);
	result = decryptRows(entries, userData.dataKeys)[0];
	return {status: status, user: result, errors: errors}
}
const getUsers = async () => {
	const {status, entries, errors} = await getEntries(true, "", "", "user_data", userData.dataKeys);
	return {status: status, users: decryptRows(entries, userData.dataKeys), errors: errors}
}
const getEvent = async (eventId:string) => {
	const {status, entries, errors} = await getEntries(false, "id", eventId, "events", eventData.allEventKeys);
	return {status: status, event: entries[0], errors: errors};
}
const getEvents = async () => {
	const {status, entries, errors} = await getEntries(true, "", "", "events", eventData.allEventKeys);
	return {status: status, events: entries, errors: errors};
}
const getOrgEvents = async (org_id:string) => {
	const {status, entries, errors} = await getEntries(true, "owner", org_id, "events", eventData.allEventKeys);
	return {status: status, events: entries, errors: errors};
}
const getOrg = async (id:string) => {
	const {status, entries, errors} = await getEntries(false, "id", id, "orgs", orgData.orgKeys);
	return {status: status, org: entries[0], errors: errors};
}
const getOwnerOrgs = async (ownerId: string) => {
	const {status, entries, errors} = await getEntries(true, "owner_id", ownerId, "orgs", orgData.orgKeys);
	return {status: status, orgs: entries[0], errors: errors};
}
const getOrgs = async () => {
	const {status, entries, errors} = await getEntries(true, "", "", "events", orgData.orgKeys);
	return {status: status, orgs: entries, errors: errors};
}
const verifyOrgVerification = async (id:string):Promise<boolean> => {
	const {entries} = await getEntries(false, "id", id, "orgs", ["verified"]);
	return (entries && entries[0].verified === '1');
}
const getSurvey = async (surveyId:string) => {
	const {status, entries, errors} = await getEntries(false, "id", surveyId, "surveys", surveyData.allSurveyKeys);
	return {status: status, survey: entries[0], errors: errors};
}
const getSurveys = async () => {
	const {status, entries, errors} = await getEntries(true, "", "", "surveys", surveyData.allSurveyKeys);
	return {status: status, surveys: entries, errors: errors};
}
const getOrgSurveys = async (org_id:string) => {
	const {status, entries, errors} = await getEntries(true, "owner", org_id, "surveys", surveyData.allSurveyKeys);
	return {status: status, surveys: entries, errors: errors};
}
export {getSurvey, getSurveys, getOrgSurveys, getUser, getUsers, getEvent, getEvents, getOrgEvents, getOrg, getOwnerOrgs, getOrgs, verifyOrgVerification}