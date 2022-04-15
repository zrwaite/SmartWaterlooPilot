import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {updateOrgVerification} from "../modules/putDatabaseInfo";
import {getBodyParams} from "../modules/getParams";
import env from "dotenv";
env.config();


const verifyOrg = async(req: Request, res: Response) => {
	let result:responseInterface = new response(); //Create new standardized response
	let {success, params, errors} = await getBodyParams(req, ["password", "business_number"]); //todo Should be more than a business number 
	if (success) {
		const password = params[0];
		const businessNumber = params[1];
		if (password === process.env.VERIFY_PASSWORD) {
			let putResult = await updateOrgVerification(businessNumber);
			result.status = putResult.status;
			if (result.status === 201) {
				result.success = true;
				result.response = {...putResult.result};
			} else if (result.status === 404) result.errors.push("org not found");
			else if (result.status === 400) result.errors.push("database error");
		} else result.errors.push("invalid password");
	} else errors.forEach((param)=>{result.errors.push("missing "+param)});
	res.status(result.status).json(result); //Return whatever result remains
}

export {verifyOrg} 