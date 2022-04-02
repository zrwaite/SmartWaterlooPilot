import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postUser} from "../modules/postDatabaseInfo";
import {getUser, getUsers} from "../modules/getDatabaseInfo";
import {getBodyParams, getQueryParams} from "../modules/getParams";
import {userData} from "../database/userData";
import {orgData} from "../database/orgData";


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
		let {success, params, errors} = await getBodyParams(req, ['user_id', 'password']);
		if (success) {
			const userId = params[0];
			const password = params[1];
			let {success:userDataSuccess, params:userDataParams, errors:userDataErrors} = await getBodyParams(req, [...userData.dataKeys]);
			if (userDataSuccess){
				let postResult = await postUser(userId, password, userDataParams);
				if (postResult.success) {
					result.status = 201;
					result.success = true;
					result.response = {
						userData: postResult.newUser,
					}
				} else postResult.errors.forEach((error) => {result.errors.push(error)});
			} else userDataErrors.forEach((param)=>{result.errors.push("missing "+param)});
		} else errors.forEach((param)=>{result.errors.push("missing "+param)});
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async putUser(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Put request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async deleteUser(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Delete request code
		res.status(result.status).json(result); //Return whatever result remains
	}
}
