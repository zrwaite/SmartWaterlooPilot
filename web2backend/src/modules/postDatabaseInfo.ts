import bcrypt from "bcrypt";
import pool from "../database/db";
import {userData, postUserInfo as postUserInfoObj, userInfoData} from "../database/userData";
import {orgData, postOrg as postOrgObj} from "../database/orgData";
import {programData, postProgram as postProgramObj} from "../database/programData";
import {surveyKeys, questionKeys, questionValues, surveyValues, postSurveyValues, postQuestionValues, answerKeys, answerValues} from "../database/surveyData";
import {verifyOrgVerification} from "./getDatabaseInfo";
interface PostDataReturn {
	success: boolean,
	errors: string[],
	id: number
}

const postEntry = async (entry: object, tableName:string ):Promise<PostDataReturn> => {
	let errors: string[] = [];
	let success = false;
	let newId:number = 0;
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
		newId = newEntryId.rows[0].id;
		success = true;
	} catch (e: any) {
		const knownErrorCodes = ["22P02", "23505", "23503"];
		if (knownErrorCodes.includes(e.code)) errors.push(e.detail);
		else errors.push("database error");
		console.log(e);
	}
	return {success: success, errors: errors, id: newId};
}
type postEntryTypeArrayType = {
	keys: typeof surveyKeys , values: postSurveyValues
}|{
	keys: typeof questionKeys , values: postQuestionValues
}|{
	keys: typeof answerKeys, values: answerValues	
}
const postEntryArrays = async (entry: postEntryTypeArrayType, tableName:string ):Promise<PostDataReturn>  => {
	let errors: string[] = [];
	let success = false;
	let newId:number = 0;
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
		newId = newEntryId.rows[0].id;
		success = true;
	} catch (e: any) {
		const knownErrorCodes = ["23505", "23503"];
		if (knownErrorCodes.includes(e.code)) errors.push(e.detail);
		else errors.push("database error");
		console.log(e);
	}
	return {success: success, errors: errors, id: newId};
}

const postUser = async (password:string, userInfoId: number, userParams: string[]) => {
	let errors:string[] = [];
	let success = false;
	let newUser:any = {};
	let userValuesString = "";
	for (let i=0; i<userParams.length+2; i++) {
		if (i) userValuesString += ", ";
		userValuesString += `$${i+1}`;
	}
	const userQueryKeysString = ["password_hash", "user_info_id", ...userData.postKeys].join(", ");
	const password_hash = bcrypt.hashSync(password, 10);
	if (password_hash=="0") errors.push("invalid hashing");
	else {
		const userQueryValues = [password_hash, userInfoId, ...userParams];
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




const postProgram = async (programParams:string[]) => {
	if (!(await verifyOrgVerification(programParams[0]))) return {success: false, errors: ["org not verified"], id: 0};
	let newPostProgramObj = {...postProgramObj};
	for (let i = 0; i<programParams.length; i++) newPostProgramObj[programData.postProgramKeys[i]] = programParams[i];
	return await postEntry(newPostProgramObj, "programs");
}

const postSurvey = async (surveyParams:(surveyValues)) => {
	let errors: string[] = [];
	let success = true;
	let questionIds = [];
	if (!(await verifyOrgVerification(surveyParams[0]))) return {success: false, errors: ["org not verified"], id:0};
	for (let i=0; i<surveyParams[3].length; i++) {
		let {success: questionSuccess, errors: questionErrors, id: questionId} = await postQuestion(surveyParams[3][i])
		if (questionSuccess) {
			questionIds.push(questionId.toString());
		} else {
			errors.push(...questionErrors);
			success = false;
			break;
		}
	}
	let postSurveyArray:postSurveyValues = [surveyParams[0], surveyParams[1], surveyParams[2], `{}`];
	if (questionIds.length) postSurveyArray[3] = `{"${questionIds.join("\", \"")}"}`;
	let {errors:postEntryErrors, success:postEntrySuccess, id} = await postEntryArrays({keys:surveyKeys, values: postSurveyArray}, "surveys");
	return {success: success && postEntrySuccess, errors: [...errors, ...postEntryErrors], id: id};
}

const postQuestion = async (questionParams:(questionValues)) => {
	let postQuestionArray:postQuestionValues = [questionParams[0], questionParams[1], `{}`];
	if (questionParams[2]?.length) postQuestionArray[2] = `{"${questionParams[2]?.join("\", \"")}"}`;
	return await postEntryArrays({keys:questionKeys, values: postQuestionArray}, "questions");
}
const postAnswer = async (answer:string, question_id:number) => {
	let postAnswerArray:answerValues = [answer, question_id];
	// if (answerParams[2]?.length) postAnswerArray[2] = `{"${answerParams[2]?.join("\", \"")}"}`;
	return await postEntryArrays({keys:answerKeys, values: postAnswerArray}, "answers");
}

const postOrg = async (orgParams:string[]) => {
	let newPostOrgObj = {...postOrgObj};
	for (let i = 0; i<orgParams.length; i++) newPostOrgObj[orgData.postKeys[i]] = orgParams[i];
	return await postEntry(newPostOrgObj, "orgs");
}

const postUserInfo = async (userInfoParams:string[]) => {
	let newPostUserInfoObj = {...postUserInfoObj};
	for (let i = 0; i<userInfoParams.length; i++) newPostUserInfoObj[userInfoData.postKeys[i]] = userInfoParams[i];
	return await postEntry(newPostUserInfoObj, "user_info");
}


export {postAnswer, postUser, postOrg, postProgram, postSurvey, postUserInfo}