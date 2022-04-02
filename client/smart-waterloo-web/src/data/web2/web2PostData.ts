import Cookies from "universal-cookie";
import {httpReq} from "./httpRequest";
import {postUserType, postEventType, postOrgType, postOrgReturn} from "../postData";

const cookies = new Cookies();

const postEventWeb2 = async (inputData:postEventType):Promise<string[]> => {
	return [];
}
const postOrgWeb2 = async (inputData:postOrgType):Promise<postOrgReturn> => {
	let json = await httpReq("/api/org/", "POST", {
		owner_id: cookies.get("userId"),
		business_number: inputData.businessNumber,
		nickname: inputData.nickname,
		avatar_string: inputData.avatarString,
	})
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			return {success: true, errors: [], orgId: response.response.orgData}
		} else {
			return {success: false, errors: response.errors, orgId: ""}
		}
	} else return {success: false, errors: ["request failed"], orgId: ""};;
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
		avatar_string: inputData.avatarString,
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

export {postEventWeb2, postOrgWeb2, postUserWeb2};