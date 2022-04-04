import cookies from "../../modules/cookies";
import {httpReq} from "./httpRequest";
import {postUserType} from "../types/account";
import {postEventType, postEventReturn} from "../types/events"
import { postSurveyReturn} from "../types/surveys"
import { postOrgType, postOrgReturn} from "../types/orgs"
import { postSurveyType } from "../types/surveys";

const web2PostAnswer = async (questionId: string, answer: string):Promise<string[]> => {
	let json = await httpReq("/api/answer/", "POST", {
		user_id: cookies.get("userId"),
		answer: answer,
		question_id: questionId,
		link: true
	})
	if (json) {
		let response = JSON.parse(json);
		if (response.success) return []
		else return ["server failure"]
	} else return ["request failure"];
}

const web2PostSurvey = async (id:string, inputData:postSurveyType):Promise<postSurveyReturn> => {
	let json = await httpReq("/api/survey/", "POST", {
		org: id,
		name: inputData.name,
		description: inputData.description,
		questions: inputData.questions
	})
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			return {success: true, errors: [], surveyId: response.response.surveyData}
		} else {
			return {success: false, errors: response.errors, surveyId: ""}
		}
	} else return {success: false, errors: ["request failed"], surveyId: ""};
}

const postEventWeb2 = async (id:string, inputData:postEventType):Promise<postEventReturn> => {
	let json = await httpReq("/api/event/", "POST", {
		org: id,
		name: inputData.name,
		age_group: inputData.age,
		start_date: inputData.start_day+"/"+inputData.start_month+"/"+inputData.start_year,
		end_date: inputData.end_day+"/"+inputData.end_month+"/"+inputData.end_year,
		category: inputData.category,
		description: inputData.description,
		image: "1",
	})
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			return {success: true, errors: [], eventId: response.response.eventData}
		} else {
			return {success: false, errors: response.errors, eventId: ""}
		}
	} else return {success: false, errors: ["request failed"], eventId: ""};
}
const postOrgWeb2 = async (inputData:postOrgType):Promise<postOrgReturn> => {
	let json = await httpReq("/api/org/", "POST", {
		owner_id: cookies.get("userId"),
		business_number: inputData.businessNumber,
		nickname: inputData.nickname,
		avatar_string: inputData.avatar_string,
	})
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			return {success: true, errors: [], orgId: response.response.orgData};
		} else {
			return {success: false, errors: response.errors, orgId: ""};
		}
	} else return {success: false, errors: ["request failed"], orgId: ""};
}
const postUserWeb2 = async (inputData:postUserType):Promise<string[]> => {
	let json = await httpReq("/api/user/", "POST", {
		user_id: inputData.qrId,
		password: inputData.password,
		nickname: inputData.nickname,
		birth_day: inputData.day,
		birth_month: inputData.month,
		birth_year: inputData.year,
		gender: inputData.gender,
		height: inputData.height,
		weight: inputData.weight,
		religion: inputData.religion,
		sexuality: inputData.sexuality,
		race: inputData.race,
		grade: inputData.grade,
		postal_code: inputData.postalCode,
		avatar_string: inputData.avatar_string,
	})
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			cookies.set("token", response.response.token);
			cookies.set("userId", inputData.qrId,);
		} else {
			return response.errors;
		}
		//else if (response.errors.length > 0)
		return [];
	} else return ["request failed"];
}

export {web2PostAnswer, web2PostSurvey, postEventWeb2, postOrgWeb2, postUserWeb2};