import pool from "../database/db";

const addUserEvent = async (eventId:number, userId: number) => {
	let result;
	let status = 400;
	try {
		result = await pool.query(
			"UPDATE users SET events = array_append(events, $1) WHERE user_id = $2",
			[eventId, userId]
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
	try {
		result = await pool.query(
			"UPDATE users SET surveys = array_append(surveys, $1) WHERE user_id = $2",
			[surveyId, userId]
		);
		if (result && result.rowCount) status = 201;
		else status = 404;
	} catch (e) {
		status = 400;
		console.log(e);
	}
	return {status: status, result: result};
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

export {updateOrgVerification, updateAnswersArray, addUserEvent, addUserSurvey};
