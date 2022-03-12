import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postUser} from "../modules/postDatabaseInfo";
import {getUser, getUsers} from "../modules/getDatabaseInfo";
import {getBodyParams, getQueryParams} from "../modules/getParams";


/* register controller */
export default class userController {
	static async getUser(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success, params, errors} = await getQueryParams(req, ["userid"]);
		if (success) {
			const userid = params[0];
			const getUserResponse = await getUser(userid);
			result.status = getUserResponse.status;
			if (result.status == 200) {
				result.success = true;
				result.response = getUserResponse.user;
			}
			else if (result.status == 404) result.errors.push("user not found");
			else result.errors.push(...errors);
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
		let {success, params, errors} = await getBodyParams(req, ["userid", "password", "nickname"]);
		const userid = params[0];
		const password = params[1];
		const nickname = params[2];
		if (success){
			let postResult = await postUser(userid, password, nickname);
			if (postResult.success) {
				result.status = 201;
				result.success = true;
				result.response = {
					userData: postResult.newUser,
				}
			} else postResult.errors.forEach((error) => {result.errors.push(error)});
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
