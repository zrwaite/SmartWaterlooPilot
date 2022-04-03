import bcrypt from "bcrypt";
import pool from "../database/db";
import {userData} from "../database/userData";
import {orgData, postOrg as postOrgObj} from "../database/orgData";
import {eventData, postEvent as postEventObj} from "../database/eventData";
import {surveyKeys, questionKeys, questionValues, surveyValues, postSurveyValues, postQuestionValues, answerKeys, answerValues} from "../database/surveyData";
import {verifyOrgVerification} from "./getDatabaseInfo";

const postEntry = async (entry: object, tableName:string ) => {
	let errors: string[] = [];
	let success = false;
	let newEntry:object = {};
	let entryDataValuesString = "";
	const entryKeys = Object.keys(entry);
	const entryValues = Object.values(entry);
	for (let i=0; i<entryKeys.length; i++) {
		if (i) entryDataValuesString += ", ";
		entryDataValuesString += `$${i+1}`;
	}
	const entryDataQueryString = entryKeys.join(", ");
	try {
		let newEntryId = await pool.query(
			`INSERT INTO ${tableName} (${entryDataQueryString}) VALUES(${entryDataValuesString}) RETURNING id`,
			entryValues
		);
		newEntry = newEntryId.rows[0].id;
		success = true;
	} catch (e: any) {
		const knownErrorCodes = ["22P02", "23505", "23503"];
		if (knownErrorCodes.includes(e.code)) errors.push(e.detail);
		else errors.push("database error");
		console.log(e);
	}
	return {success: success, errors: errors, newEntry: newEntry};
}
type postEntryTypeArrayType = {
	keys: typeof surveyKeys , values: postSurveyValues
}|{
	keys: typeof questionKeys , values: postQuestionValues
}|{
	keys: typeof answerKeys, values: answerValues	
}
const postEntryArrays = async (entry: postEntryTypeArrayType, tableName:string ) => {
	let errors: string[] = [];
	let success = false;
	let newEntry:number = -1;
	let entryDataValuesString = "";
	for (let i=0; i<entry.keys.length; i++) {
		if (i) entryDataValuesString += ", ";
		entryDataValuesString += `$${i+1}`;
	}
	const entryDataQueryString = entry.keys.join(", ");
	try {
		let newEntryId = await pool.query(
			`INSERT INTO ${tableName} (${entryDataQueryString}) VALUES(${entryDataValuesString}) RETURNING id`,
			entry.values
		);
		newEntry = newEntryId.rows[0].id;
		success = true;
	} catch (e: any) {
		const knownErrorCodes = ["23505", "23503"];
		if (knownErrorCodes.includes(e.code)) errors.push(e.detail);
		else errors.push("database error");
		console.log(e);
	}
	return {success: success, errors: errors, newEntry: newEntry};
}

const postUser = async (password:string, userParams: string[]) => {
	let errors:string[] = [];
	let success = false;
	let newUser:any = {};
	let userValuesString = "";
	for (let i=0; i<userParams.length+1; i++) {
		if (i) userValuesString += ", ";
		userValuesString += `$${i+1}`;
	}
	const userQueryKeysString = ["password_hash", ...userData.postKeys].join(", ");
	const password_hash = bcrypt.hashSync(password, 10);
	if (password_hash=="0") errors.push("invalid hashing");
	else {
		const userQueryValues = [password_hash, ...userParams];
		try {
			let newUserId = await pool.query(
				"INSERT INTO users ("+ userQueryKeysString +") VALUES("+userValuesString+") RETURNING id",
				[...userQueryValues]
			);
			newUser = newUserId.rows[0].id;
			success = true;
		} catch (e: any) {
			if (e.code == 23505) {
				errors.push(e.detail);
			} else {
				errors.push("database error");
			}
			console.log(e);
		}
	}
	return {success: success, errors: errors, newUser: newUser};
}




const postEvent = async (eventParams:string[]) => {
	if (!(await verifyOrgVerification(eventParams[0]))) return {success: false, errors: ["org not verified"], newEvent: {}};
	let newPostEventObj = {...postEventObj};
	for (let i = 0; i<eventParams.length; i++) newPostEventObj[eventData.postEventKeys[i]] = eventParams[i];
	let {errors, success, newEntry:newEvent} = await postEntry(newPostEventObj, "events");
	return {success: success, errors: errors, newEvent: newEvent};
}

const postSurvey = async (surveyParams:(surveyValues)) => {
	let errors: string[] = [];
	let success = true;
	let questionIds = [];
	if (!(await verifyOrgVerification(surveyParams[0]))) return {success: false, errors: ["org not verified"], newSurvey: {}};
	for (let i=0; i<surveyParams[3].length; i++) {
		let {success: questionSuccess, errors: questionErrors, newQuestion: newQuestion} = await postQuestion(surveyParams[3][i])
		if (questionSuccess) {
			questionIds.push(newQuestion.toString());
		} else {
			errors.push(...questionErrors);
			success = false;
			break;
		}
	}
	let postSurveyArray:postSurveyValues = [surveyParams[0], surveyParams[1], surveyParams[2], `{}`];
	if (questionIds.length) postSurveyArray[3] = `{"${questionIds.join("\", \"")}"}`;
	let {errors:postEntryErrors, success:postEntrySuccess, newEntry:newSurvey} = await postEntryArrays({keys:surveyKeys, values: postSurveyArray}, "surveys");
	return {success: success && postEntrySuccess, errors: [...errors, ...postEntryErrors], newSurvey: newSurvey};
}

const postQuestion = async (questionParams:(questionValues)) => {
	let postQuestionArray:postQuestionValues = [questionParams[0], questionParams[1], `{}`];
	if (questionParams[2]?.length) postQuestionArray[2] = `{"${questionParams[2]?.join("\", \"")}"}`;
	let {errors, success, newEntry:newQuestion} = await postEntryArrays({keys:questionKeys, values: postQuestionArray}, "questions");
	return {success: success, errors: errors, newQuestion: newQuestion};
}
const postAnswer = async (answer:string, question_id:number) => {
	let postAnswerArray:answerValues = [answer, question_id];
	// if (answerParams[2]?.length) postAnswerArray[2] = `{"${answerParams[2]?.join("\", \"")}"}`;
	let {errors, success, newEntry:newAnswer} = await postEntryArrays({keys:answerKeys, values: postAnswerArray}, "answers");
	return {success: success, errors: errors, newAnswer: newAnswer};
}

const postOrg = async (orgParams:string[]) => {
	let newPostOrgObj = {...postOrgObj};
	for (let i = 0; i<orgParams.length; i++) newPostOrgObj[orgData.postKeys[i]] = orgParams[i];
	let {errors, success, newEntry:newOrg} = await postEntry(newPostOrgObj, "orgs");
	return {success: success, errors: errors, newOrg: newOrg};
}


export {postAnswer, postUser, postOrg, postEvent, postSurvey}