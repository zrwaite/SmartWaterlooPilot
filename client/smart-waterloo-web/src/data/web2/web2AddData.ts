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

export {web2AddUserToOrg, web2AddSurveytoUser}