import { unchangedTextChangeRange } from "typescript";
import pool from "../database/db";
import { getEventOrg, getSurveyOrg } from "./getDatabaseInfo";
const foundOrgMembers = async (orgId:number, userId: number):Promise<{success: boolean, error: string}> => {
	try {
		let user:any = await pool.query(
			"SELECT id from users WHERE user_id = $1",
			[userId]
		)
		if (user.rows.length) {
			let result:any = await pool.query(
				"SELECT members, owner_id from orgs WHERE id = $1",
				[orgId]
			);
			if (result.rows.length) {
				console.log(result.rows[0].members, userId)
				if (result.rows[0].owner_id==userId) return {success: false, error: "This user already owns the org"}
				else if (result.rows[0].members.includes(userId)) return {success: false, error: "This user is already an org member"}
				else return {success: true, error: ""};
			} else return {success: false, error: "This org doesn't exist"}
		} else return {success: false, error: "user has not created account"}
	} catch (e) {
		console.log(e);
		return {success: false, error: "database error"}
	}
}
const addOrgMember = async (orgId:number, userId: number) => {
	let result;
	let status = 400;
	let errors:string[] = [];
	let {error: foundMemberErrors, success} = await foundOrgMembers(orgId, userId)
	if (success) {
		try {
			result = await pool.query(
				"UPDATE orgs SET members = array_append(members, $1) WHERE id = $2",
				[userId, orgId]
			);
			if (result && result.rowCount) status = 201;
			else status = 404;
		} catch (e) {
			status = 400;
			console.log(e);
			errors.push("database error");
		}
	} else errors.push(foundMemberErrors);
	return {status: status, result: result, errors: errors};
}
const incrementEvent = async (eventId: number) => {
	try {
		pool.query(
			"UPDATE events SET attendees = attendees + 1 WHERE id = $1",
			[eventId]
		);
	} catch (e) {
		console.log(e);
	}
}

const addUserEvent = async (eventId:number, userId: number) => {
	let result;
	let status = 400;
	let errors: string[] = [];
	let {orgNickname, errors: nicknameErrors} = await getEventOrg(eventId);
	if (orgNickname!=="") {
		try {
			result = await pool.query(
				"UPDATE users SET events = array_append(events, $1), orgs = array_append(orgs, $2) WHERE user_id = $3",
				[eventId, orgNickname, userId]
			);
			if (result && result.rowCount) {
				status = 201;
				incrementEvent(eventId);
			}
			else status = 404;
		} catch (e) {
			status = 400;
			console.log(e);
			errors.push("database error");
		}
	} else {
		errors.push(...nicknameErrors)
	}
	return {status: status, result: result, errors: errors};
}

const addUserOrg = async (orgName:string, userId: number) => {
	let result;
	let status = 400;
	try {
		result = await pool.query(
			"UPDATE users SET orgs = array_append(orgs, $1) WHERE user_id = $2",
			[orgName, userId]
		);
		if (result && result.rowCount) status = 201;
		else status = 404;
	} catch (e) {
		status = 400;
		console.log(e);
	}
	return {status: status, result: result};
}

const addUserSurvey = async (surveyId:number, userId: number) => {
	let result;
	let status = 400;
	let errors: string[] = [];
	let {orgNickname, errors:nicknameErrors} = await getSurveyOrg(surveyId);
	if (orgNickname!=="") {
		try {
			result = await pool.query(
				"UPDATE users SET surveys = array_append(surveys, $1), orgs = array_append(orgs, $2) WHERE user_id = $3",
				[surveyId, orgNickname, userId]
			);
			if (result && result.rowCount) status = 201;
			else status = 404;
		} catch (e) {
			status = 400;
			console.log(e);
			errors.push("database error");
		}
	} else {
		errors.push(...nicknameErrors)
	}
	return {status: status, result: result, errors: errors};
}

const updateAnswersArray = async (userId:number, answerId:number) => {
	let result;
	let status = 400;
	try {
		result = await pool.query(
			"UPDATE users SET answers = array_append(answers, $1) WHERE user_id = $2",
			[answerId, userId]
		);
		if (result && result.rowCount) status = 201;
		else status = 404;
	} catch (e) {
		status = 400;
		console.log(e);
	}
	return {status: status, result: result};
}

const updateOrgVerification = async (businessNumber: string) => {
	let result;
	let status = 400;
	try {
		result = await pool.query(
			"UPDATE orgs SET verified='1' WHERE business_number = $1",
			[businessNumber]
		);
		if (result && result.rowCount) status = 201;
		else status = 404;
	} catch (e) {
		status = 400;
		console.log(e);
	}
	return {status: status, result: result};
}

export {updateOrgVerification, updateAnswersArray, addUserEvent, addUserSurvey, addUserOrg, addOrgMember};
