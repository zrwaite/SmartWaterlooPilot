import pool from "../database/db";
import {userData} from "../database/userData";
import {orgData} from "../database/orgData";
import {eventData} from "../database/eventData";
import {answerKeys, getQuestionKeys, getSurveyKeys} from "../database/surveyData";

const getEntries = async (multi: boolean, idKey:string, idValue:string|number, tableName: string, columns: readonly string[]) => {
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
		if (entries.rows && entries.rows.length) {
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


const getUserOrgs = async (userId: number) => {
	let status = 400;
	let orgs:any;
	let errors = [];
	try {
		orgs = await pool.query(
			`SELECT ${orgData.orgKeys} FROM "orgs" WHERE "owner_id" = $1 OR $1=ANY(members)`,
			[userId]
		)
		if (orgs.rows && orgs.rows.length) {
			orgs = orgs.rows;
			status = 200;
		} else status = 404;
	} catch (e) {
		console.log(e)
		errors.push("database error");
		status = 400;
	}
	// const {status, entries, errors} = await getEntries(true, "owner_id", ownerId, "orgs", orgData.orgKeys);
	return {status: status, orgs: orgs, errors: errors};
}

const getUser = async (userid:string) => {
	const {status, entries, errors} = await getEntries(false, "user_id", userid, "users", userData.getKeys);;
	return {status: status, user: entries.length?entries[0]:{}, errors: errors}
}
const getUserHash = async (userId:string) => {
	const {status, entries, errors} = await getEntries(false, "user_id", userId, "users", ["password_hash"]);
	return {status: status, user: entries.length?entries[0]:{}, errors: errors};
}
const getUsers = async () => {
	const {status, entries, errors} = await getEntries(true, "", "", "users", userData.getKeys);
	return {status: status, users: entries, errors: errors}
}
const getEvent = async (eventId:number) => {
	const {status, entries, errors} = await getEntries(false, "id", eventId, "events", eventData.allEventKeys);
	return {status: status, event: entries.length?entries[0]:{}, errors: errors};
}
const getEvents = async () => {
	const {status, entries, errors} = await getEntries(true, "", "", "events", eventData.allEventKeys);
	return {status: status, events: entries, errors: errors};
}
const getOrgEvents = async (org_id:string) => {
	const {status, entries, errors} = await getEntries(true, "org", org_id, "events", eventData.allEventKeys);
	return {status: status, events: entries, errors: errors};
}
const getOrg = async (id:string) => {
	const {status, entries, errors} = await getEntries(false, "id", id, "orgs", orgData.orgKeys);
	return {status: status, org: entries.length?entries[0]:{}, errors: errors};
}
const getOwnerOrgs = async (ownerId: string) => {
	const {status, entries, errors} = await getEntries(true, "owner_id", ownerId, "orgs", orgData.orgKeys);
	return {status: status, orgs: entries, errors: errors};
}
const getOrgs = async () => {
	const {status, entries, errors} = await getEntries(true, "", "", "orgs", orgData.orgKeys);
	return {status: status, orgs: entries, errors: errors};
}
const getEventOrg = async (eventId:number) => {
	let errors: string[] = [];
	let orgNickname = "";
	const {status, entries:event, errors:eventErrors} = await getEntries(false, "id", eventId, "events", ["org"]);
	if (event.length) {
		const {entries:org, errors:orgErrors} = await getEntries(false, "id", event[0].org, "orgs", ["nickname"]);
		if (org.length) {
			orgNickname = org[0].nickname
		} else errors.push(...orgErrors);
	} else errors.push(...eventErrors);
	return {status: status, orgNickname: orgNickname, errors: errors};
}
const getSurveyOrg = async (surveyId:number) => {
	let errors: string[] = [];
	let orgNickname = "";
	const {status, entries:survey, errors:surveysErrors} = await getEntries(false, "id", surveyId, "surveys", ["org"]);
	if (survey.length) {
		const {status, entries:org, errors:orgErrors} = await getEntries(false, "id", survey[0].org, "orgs", ["nickname"]);
		if (org.length) {
			orgNickname = org[0].nickname
		} else errors.push(...orgErrors);
	} else errors.push(...surveysErrors);
	return {status: status, orgNickname: orgNickname, errors: errors};
}
const verifyOrgVerification = async (id:string):Promise<boolean> => {
	const {entries} = await getEntries(false, "id", id, "orgs", ["verified"]);
	return (entries && entries.length>0 && entries[0].verified === '1');
}
const getSurvey = async (surveyId:string) => {
	let {status, entries, errors} = await getEntries(false, "id", surveyId, "surveys", getSurveyKeys);
	let survey = entries.length?entries[0]:{};
	if (status == 200) {
		let {questions, success} = await parseSurvey(survey.questions);
		if (success) survey.questions = questions;
		else status = 400;
	}
	return {status: status, survey: survey, errors: errors};
}
const getSurveys = async () => {
	let {status, entries, errors} = await getEntries(true, "", "", "surveys", getSurveyKeys);
	if (status == 200) {
		for (let i=0; i<entries.length; i++) {
			let survey = entries[i];
			let {questions, success} = await parseSurvey(survey.questions);
			if (success) survey.questions = questions;
			else status = 400;
		}
	}
	return {status: status, surveys: entries, errors: errors};
}
const getOrgSurveys = async (org_id:string) => {
	let {status, entries, errors} = await getEntries(true, "org", org_id, "surveys", getSurveyKeys);
	if (status == 200) {
		for (let i=0; i<entries.length; i++) {
			let survey = entries[i];
			let {questions, success} = await parseSurvey(survey.questions);
			if (success) survey.questions = questions;
			else status = 400;
		}
	}
	return {status: status, surveys: entries, errors: errors};
}
const getQuestion = async (questionId:number) => {
	const {status, entries, errors} = await getEntries(false, "id", questionId.toString(), "questions", getQuestionKeys);
	return {status: status, question: entries.length?entries[0]:{}, errors: errors};
}
const getQuestions = async () => {
	const {status, entries, errors} = await getEntries(true, "", "", "questions", getQuestionKeys);
	return {status: status, questions: entries, errors: errors};
}
const parseSurvey = async (questionIds: number[]) => {
	let success = true;
	let questions = [];
	let errors: string[] = [];
	for (let i=0; i<questionIds.length; i++) {
		const getQuestionResponse = await getQuestion(questionIds[i]);
		if (getQuestionResponse.status != 200) {
			success = false;
			errors.push(...getQuestionResponse.errors);
		} else questions.push(getQuestionResponse.question)
	}
	return {questions: questions, success: success};
}
const getAnswer = async (id:string) => {
	const {status, entries, errors} = await getEntries(false, "id", id, "answers", answerKeys);
	return {status: status, answer: entries.length?entries[0]:{}, errors: errors};
}
const getQuestionAnswers = async (questionId: string) => {
	const {status, entries, errors} = await getEntries(true, "question_id", questionId, "answers", answerKeys);
	return {status: status, answers: entries, errors: errors};
}
export {getEventOrg, getSurveyOrg, getUserOrgs, getAnswer, getQuestionAnswers, getSurvey, getSurveys,getUserHash, getQuestions, getOrgSurveys, getUser, getUsers, getEvent, getEvents, getOrgEvents, getOrg, getOwnerOrgs, getOrgs, getQuestion,  verifyOrgVerification}