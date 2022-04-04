import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postUser} from "../modules/postDatabaseInfo";
import {getUser, getUsers} from "../modules/getDatabaseInfo";
import {getBodyParams, getQueryParams} from "../modules/getParams";
import {addUserEvent, addUserSurvey, addUserOrg} from "../modules/putDatabaseInfo";
import {userData} from "../database/userData";
import {orgData} from "../database/orgData";
import { createToken } from "../auth/tokenFunctions";


/* register controller */
export default class userController {
	static async getUser(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success, params, errors} = await getQueryParams(req, ["user_id"]);
		if (success) {
			const userId = params[0];
			if (!isNaN(userId)) {
				const getUserResponse = await getUser(userId);
				result.status = getUserResponse.status;
				if (result.status == 200) {
					result.success = true;
					result.response = getUserResponse.user;
				}
				else if (result.status == 404) result.errors.push("user not found");
				else result.errors.push(...errors);
			} else { 
				result.errors.push("invalid user_id");
				result.status = 404;
			}
		} else {
			//Development only
			const getUserResponse = await getUsers();
			result.response = getUserResponse.users;
			result.status = getUserResponse.status;
		}
		// errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postUser(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:baseSuccess, params:baseParams, errors:baseErrors} = await getBodyParams(req, ["password", ...userData.baseKeys]);
		if (baseSuccess) {
			const password = baseParams.shift();
			let {params:nullableParams} = await getBodyParams(req, [...userData.nullableKeys]);
			let postResult = await postUser(password, [...baseParams, ...nullableParams]);
			if (postResult.success) {
				result.status = 201;
				result.success = true;
				let token = createToken({user_id: baseParams[0], authorized: true})
				result.response = {userData: postResult.newUser, token: token}
			} else postResult.errors.forEach((error) => {result.errors.push(error)});
		} else baseErrors.forEach((param)=>{result.errors.push("missing "+param)});
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async putUser(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:eventSuccess, params:eventParams } = await getBodyParams(req, ["event_id", "user_id"]);
		let {success:surveySuccess, params:surveyParams } = await getBodyParams(req, ["survey_id", "user_id"]);
		let {success:orgSuccess, params:orgParams } = await getBodyParams(req, ["org_name", "user_id"]);
		if (eventSuccess) {
			let putResult = await addUserEvent(eventParams[0], eventParams[1]);
			result.status = putResult.status;
			if (result.status == 201) {
				result.success = true;
			} else result.errors.push("put database error");
		} else if (surveySuccess) {
			let putResult = await addUserSurvey(surveyParams[0], surveyParams[1]);
			result.status = putResult.status;
			if (result.status == 201) {
				result.success = true;
			} else result.errors.push("put database error");
		} else if (orgSuccess) {
			let putResult = await addUserOrg(orgParams[0], orgParams[1]);
			result.status = putResult.status;
			if (result.status == 201) {
				result.success = true;
			} else result.errors.push("put database error");
		} else result.errors.push("missing survey_id and event_id");
		//Put request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async deleteUser(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Delete request code
		res.status(result.status).json(result); //Return whatever result remains
	}
}
