import {Request, Response, NextFunction} from "express"; //Typescript type
import { response, responseInterface } from "../models/response";
import { DEV } from "../settings";
import {getBodyParams, getParams, getQueryParams} from "./getParams";

const devCheck = async (req:Request, res:Response, next:NextFunction) => {
	let result:responseInterface = new response(); 
	let {success, params} = req.method==="GET"?getQueryParams(req, ['dev']):getBodyParams(req, ['dev']);
	if (success) {
		let frontendDev = params[0];
		if (DEV && frontendDev!="true") {
			result.errors.push("Frontend environment is not in development mode while backend is");
			res.status(result.status).json(result);
		} else if (!DEV && frontendDev!="false") {
			result.errors.push("Backend environment is not in development mode while frontend is");
			res.status(result.status).json(result);
		} else next();
	} else {
		result.errors.push(req.method==="GET"?"query param dev is not defined":"body param dev is not defined");
		res.status(result.status).json(result);
	}
}

export {devCheck}