import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postOrg} from "../modules/postDatabaseInfo";
import {getOrg, getOrgs, getUserOrgs} from "../modules/getDatabaseInfo";
import {getBodyParams, getQueryParams} from "../modules/getParams";
import {addOrgMember} from "../modules/putDatabaseInfo";
import {orgData} from "../database/orgData";


/* register controller */
export default class orgController {
	static async getOrg(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success, params, errors} = await getQueryParams(req, ["id"]);
		if (success) {
			const orgId = params[0];
			if (!isNaN(orgId)){
				const getOrgResponse = await getOrg(orgId);
				result.status = getOrgResponse.status;
				if (result.status == 200) {
					result.success = true;
					result.response = getOrgResponse.org;
				}
				else if (result.status == 404) result.errors.push("org not found");
				else result.errors.push(...errors);
			} else {
				result.errors.push("invalid id");
				result.status = 404;
			}
		} else {
			let {success, params, errors} = await getQueryParams(req, ["user_id"]);
			if (success) {
				const userId = params[0];
				if (!isNaN(userId)){
					const getOrgResponse = await getUserOrgs(userId);
					result.status = getOrgResponse.status;
					if (result.status == 200) {
						result.success = true;
						result.response = getOrgResponse.orgs;
					}
					else if (result.status == 404) result.errors.push("orgs not found");
					else result.errors.push(...errors);
				} else {
					result.errors.push("invalid user_id");
					result.status = 404;
				}
			} else {
				//Development only
				const getOrgResponse = await getOrgs();
				result.response = getOrgResponse.orgs;
				result.status = getOrgResponse.status;
			}
		}
		// errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postOrg(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success, params, errors} = await getBodyParams(req, [...orgData.baseKeys]);
		if (success) {
			let {params: nullableParams} = await getBodyParams(req, [...orgData.nullablePostKeys]);
			let postResult = await postOrg([...params, ...nullableParams]);
			if (postResult.success) {
				result.status = 201;
				result.success = true;
				result.response = {
					orgData: postResult.newOrg,
				}
			} else postResult.errors.forEach((error) => {result.errors.push(error)});
		} else errors.forEach((param)=>{result.errors.push("missing "+param)});
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async putOrg(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:userSuccess, params:userParams, errors:userErrors} = await getBodyParams(req, ["org_id", "user_id"]);
		if (userSuccess) {
			let putResult = await addOrgMember(userParams[0], userParams[1]);
			result.status = putResult.status;
			if (result.status == 201) {
				result.success = true;
			} else result.errors.push("put database error");
		} else userErrors.forEach((error) => result.errors.push("missing "+error));
		//Put request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async deleteOrg(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Delete request code
		res.status(result.status).json(result); //Return whatever result remains
	}
}
