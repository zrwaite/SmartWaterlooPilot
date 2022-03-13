import pool from "../database/db";
import {decrypt} from "./encryption";
const userDataKeys = [
	{iv: "nickname_iv", name: "nickname"},
	{iv: "birth_day_iv", name: "birth_day"},
	{iv: "birth_month_iv", name: "birth_month"},
	{iv: "birth_year_iv", name: "birth_year"},
	{iv: "gender_iv", name: "gender"},
	{iv: "height_iv", name: "height"},
	{iv: "weight_iv", name: "weight"},
	{iv: "religion_iv", name: "religion"},
	{iv: "sexuality_iv", name: "sexuality"},
	{iv: "race_iv", name: "race"},
	{iv: "grade_iv", name: "grade"},
	{iv: "postal_code_iv", name: "postal_code"},
	{iv: "avatar_string_iv", name: "avatar_string"},
]
const defaultUserData = {
	nickname:"",
	birth_day: "",
	birth_month: "",
	birth_year: "",
	gender: "",
	height: "",
	weight: "",
	religion: "",
	sexuality: "",
	race: "",
	grade: "",
	postal_code: "",
	avatar_string: "",
}

type defaultEntry = typeof defaultUserData;
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
	let errors = []
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
		errors.push(e);
		status = 400;
	}
	return {status: status, entries: entries, errors: errors};
}
const getUser = async (userid:string) => {
	let status = 400;
	let result;
	let errors;
	const userDataId = await pool.query(
		`SELECT user_data_id FROM users WHERE userid = $1 LIMIT 1`,
		[userid]
	)
	if (userDataId.rows[0]) {
		const {status:userDataStatus, entries, errors:userDataErrors} = await getEntries(false, "id", userDataId.rows[0].user_data_id, "user_data", defaultUserData, userDataKeys);
		status = userDataStatus;
		result = entries[0];
		errors = userDataErrors;
	} else status = 404;
	return {status: status, user: result, errors: errors}
}
const getUsers = async () => {
	const {status, entries, errors} = await getEntries(true, "", "", "user_data", defaultUserData, userDataKeys);
	return {status: status, users: entries, errors: errors}
}
export {getUser, getUsers}