import { USE_WEB3 } from "./dataConstants";
import { successErrorsReturn } from "./types/generics";
import { web2AddSurveytoUser, web2AddUserToOrg } from "./web2/web2AddData";

const addUserToOrg = async (userId: number, orgId: number):Promise<successErrorsReturn> => {
	return USE_WEB3?(await web3AddUserToOrg(userId, orgId)):(await web2AddUserToOrg(userId, orgId));
}
const addSurveytoUser = async (userId: string, surveyId: string):Promise<successErrorsReturn> => {
	return USE_WEB3?(await web3AddSurveytoUser(userId, surveyId)):(await web2AddSurveytoUser(userId, surveyId));
}


const web3AddSurveytoUser = async (userId: string, surveyId: string):Promise<successErrorsReturn> => {
	return {success: false, errors: ["not implemented"]}
}
const web3AddUserToOrg = async (userId: number, orgId: number):Promise<successErrorsReturn> => {
	return {success: false, errors: ["not implemented"]}
}

export {addUserToOrg, addSurveytoUser}