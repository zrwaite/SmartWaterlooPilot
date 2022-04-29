import pool from "../database/database";
import {userData, userInfoData} from "../database/userData";
import {orgData} from "../database/orgData";
import {programData} from "../database/programData";
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
	}
	// const {status, entries, errors} = await getEntries(true, "owner_id", ownerId, "orgs", orgData.orgKeys);
	return {status: status, orgs: orgs, errors: errors};
}
const getUserInfo = async (userInfoId:string) => {
	const {status, entries, errors} = await getEntries(false, "id", userInfoId, "user_info", userInfoData.getKeys);
	return {status: status, userInfo: entries.length?entries[0]:null, errors: errors};
}

const getUser = async (userid:string) => {
	const {status:userStatus, entries:userEntries, errors:userErrors} = await getEntries(false, "user_id", userid, "users", userData.getKeys);
	if (userStatus === 200) {
		let userInfoId = userEntries[0].user_info_id;
		const {status: userInfoStatus, userInfo, errors: userInfoErrors} = await getUserInfo(userInfoId);
		if (userInfo) return {status: userInfoStatus, user: {...userInfo, ...userEntries[0]}, errors: [...userInfoErrors, ...userErrors]}
		else return {status: userInfoStatus, user: {}, errors: [...userInfoErrors, ...userErrors]};
	} else return {status: userStatus, user: {}, errors: userErrors};
}
const getUserHash = async (userId:string) => {
	const {status, entries, errors} = await getEntries(false, "user_id", userId, "users", ["password_hash"]);
	return {status: status, user: entries.length?entries[0]:{}, errors: errors};
}
// const getUsers = async () => {
// 	const {status, entries, errors} = await getEntries(true, "", "", "users", userData.getKeys);
// 	return {status: status, users: entries, errors: errors}
// }
const getUserInfoByUserId = async (userId:number) => {
	const {status, entries, errors} = await getEntries(false, "user_id", userId, "users", ["user_info_id"]);
	return {status: status, user_info: entries.length?entries[0]:{}, errors: errors};
}
const getProgram = async (programId:number) => {
	const {status, entries, errors} = await getEntries(false, "id", programId, "programs", programData.allProgramKeys);
	return {status: status, program: entries.length?entries[0]:{}, errors: errors};
}
const getPrograms = async () => {
	const {status, entries, errors} = await getEntries(true, "", "", "programs", programData.allProgramKeys);
	return {status: status, programs: entries, errors: errors};
}
const getOrgPrograms = async (org_id:string) => {
	const {status, entries, errors} = await getEntries(true, "org", org_id, "programs", programData.allProgramKeys);
	return {status: status, programs: entries, errors: errors};
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
const getProgramOrg = async (programId:number) => {
	let errors: string[] = [];
	let orgNickname = "";
	const {status, entries:program, errors:programErrors} = await getEntries(false, "id", programId, "programs", ["org"]);
	if (program.length) {
		const {entries:org, errors:orgErrors} = await getEntries(false, "id", program[0].org, "orgs", ["nickname"]);
		if (org.length) {
			orgNickname = org[0].nickname
		} else errors.push(...orgErrors);
	} else errors.push(...programErrors);
	return {status: status, orgNickname: orgNickname, errors: errors};
}
const getSurveyOrg = async (surveyId:number) => {
	let errors: string[] = [];
	let orgNickname = "";
	let {status, entries:survey, errors:surveysErrors} = await getEntries(false, "id", surveyId, "surveys", ["org"]);
	if (survey.length) {
		const {status:orgStatus, entries:org, errors:orgErrors} = await getEntries(false, "id", survey[0].org, "orgs", ["nickname"]);
		status = orgStatus;
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
	return {questions: questions, success: success, errors: errors};
}
const getAnswer = async (id:string) => {
	const {status, entries, errors} = await getEntries(false, "id", id, "answers", answerKeys);
	return {status: status, answer: entries.length?entries[0]:{}, errors: errors};
}
const getAnswersAndQuestions = async (answerIds: string[]) => {
	let answers: string[] = [];
	let questions: string[] = [];
	let errors: string[] = [];
	for (let i=0; i<answerIds.length; i++) {
		let {status: answerStatus, answer, errors: answerErrors} = await getAnswer(answerIds[i]);
		if (answerStatus === 200) {
			answers.push(answer.answer);
			let {status: questionStatus, question, errors: questionErrors} = await getQuestion(answer.question_id);
			if (questionStatus === 200) questions.push(question.prompt);
			else {
				errors.push(...questionErrors);
				break;
			}
		} else {
			errors.push(...answerErrors);
			break;
		}
	}
	return {status: errors.length?400:200, answers: answers, questions:questions, errors: errors};
}
const getQuestionAnswers = async (questionId: string) => {
	const {status, entries, errors} = await getEntries(true, "question_id", questionId, "answers", answerKeys);
	return {status: status, answers: entries, errors: errors};
}
export {getUserInfoByUserId, getUserInfo, getProgramOrg, getSurveyOrg, getUserOrgs, getAnswersAndQuestions, getQuestionAnswers, getSurvey, getSurveys,getUserHash, getQuestions, getOrgSurveys, getUser, getProgram, getPrograms, getOrgPrograms, getOrg, getOwnerOrgs, getOrgs, getQuestion,  verifyOrgVerification}