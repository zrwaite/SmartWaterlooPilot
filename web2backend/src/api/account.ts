import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postUser, postOrg} from "../modules/postDatabaseInfo";
import {getAccount, getUsers} from "../modules/getDatabaseInfo";
import {getBodyParams, getQueryParams} from "../modules/getParams";
import {userData} from "../database/userData";
import {orgData} from "../database/orgData";


/* register controller */
export default class accountController {
	static async getAccount(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success, params, errors} = await getQueryParams(req, ["account_id"]);
		if (success) {
			const accountId = params[0];
			const getAccountResponse = await getAccount(accountId);
			result.status = getAccountResponse.status;
			if (result.status == 200) {
				result.success = true;
				result.response = getAccountResponse.account;
			}
			else if (result.status == 404) result.errors.push("account not found");
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
	static async postAccount(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:accountSuccess, params:accountParams, errors:accountErrors} = await getBodyParams(req, ['account_id', 'password', 'account_type']);
		if (accountSuccess) {
			const accountId = accountParams[0];
			const password = accountParams[1];
			const accountType = accountParams[2];
			if (accountType==="user") {
				let {success:userDataSuccess, params:userDataParams, errors:userDataErrors} = await getBodyParams(req, [...userData.dataKeys]);
				if (userDataSuccess){
					let postResult = await postUser(accountId, password, userDataParams);
					if (postResult.success) {
						result.status = 201;
						result.success = true;
						result.response = {
							userData: postResult.newUser,
						}
					} else postResult.errors.forEach((error) => {result.errors.push(error)});
				} else userDataErrors.forEach((param)=>{result.errors.push("missing "+param)});
			} else if (accountType==="org") {
				let {success:orgDataSuccess, params:orgDataParams, errors:orgDataErrors} = await getBodyParams(req, [...orgData.dataKeys]);
				if (orgDataSuccess){
					let postResult = await postOrg(accountId, password, orgDataParams);
					if (postResult.success) {
						result.status = 201;
						result.success = true;
						result.response = {
							orgData: postResult.newOrg,
						}
					} else postResult.errors.forEach((error) => {result.errors.push(error)});
				} else orgDataErrors.forEach((param)=>{result.errors.push("missing "+param)});
			} else result.errors.push(`Invalid account_type ${accountType}`);
		} else accountErrors.forEach((param)=>{result.errors.push("missing "+param)});
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async putAccount(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Put request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async deleteAccount(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Delete request code
		res.status(result.status).json(result); //Return whatever result remains
	}
}
