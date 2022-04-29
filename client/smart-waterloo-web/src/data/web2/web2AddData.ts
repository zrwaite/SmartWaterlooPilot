import { successErrorsReturn } from "../types/generics";
import { httpReq } from "./httpRequest";

const web2AddUserToOrg = async (userId: number, orgId: number):Promise<successErrorsReturn> => {
	let json = await httpReq("/api/org/", "PUT", {
		org_id: orgId,
		user_id: userId
	})
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			console.log(response.response);
			return {success: true, errors: []}
		} else {
			return {success: false, errors: response.errors}
		}
	} else return {success: false, errors: ["request failed"]};
}

const web2AddSurveytoUser = async (userId: string, surveyId: string):Promise<successErrorsReturn> => {
	let json = await httpReq("/api/user/", "PUT", {
		survey_id: surveyId,
		user_id: userId
	})
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			console.log(response.response);
			return {success: true, errors: []}
		} else {
			return {success: false, errors: response.errors}
		}
	} else return {success: false, errors: ["request failed"]};
}

const web2AddProgramtoUser = async (userId: string, programId: string):Promise<successErrorsReturn> => {
	let json = await httpReq("/api/user/", "PUT", {
		program_id: programId,
		user_id: userId
	})
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			console.log(response.response);
			return {success: true, errors: []}
		} else {
			return {success: false, errors: response.errors}
		}
	} else return {success: false, errors: ["request failed"]};
}

const web2VerifyOrg = async (business_number: string, password:string):Promise<successErrorsReturn> => {
	let json = await httpReq("/function/verify/", "POST", {
		business_number: business_number,
		password: password
	})
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			return {success: true, errors: []}
		} else {
			return {success: false, errors: response.errors}
		}
	} else return {success: false, errors: ["request failed"]};
}

export {web2VerifyOrg, web2AddUserToOrg, web2AddSurveytoUser, web2AddProgramtoUser}