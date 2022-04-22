import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postProgram} from "../modules/postDatabaseInfo";
import {getProgram, getPrograms, getOrgPrograms} from "../modules/getDatabaseInfo";
import {getBodyParams, getQueryParams} from "../modules/getParams";
import {programData} from "../database/programData";
import {verifyOrgMember, getToken} from "../auth/tokenFunctions";
import { parseOrgProgram } from "../modules/parseData";

/* register controller */
export default class programController {
	static async getProgram(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:programSuccess, params:programParams, errors:programErrors} = await getQueryParams(req, ["program_id"]);
		if (programSuccess) {
			const programId = programParams[0];
			if (!isNaN(programId)){				
				const getProgramResponse = await getProgram(programId);
				result.status = getProgramResponse.status;
				if (result.status == 200) {
					const orgId = getProgramResponse.program.org;
					let {success: tokenSuccess} = await verifyOrgMember(orgId, getToken(req.headers));
					if (tokenSuccess ){
						let {status: parseStatus, program: parseProgram, errors: parseErrors} = await parseOrgProgram(getProgramResponse.program);
						if (parseErrors.length) {
							result.status = parseStatus;
							result.errors.push(...parseErrors);
						} else {
							result.response = parseProgram;
							result.success = true;
						}
					} else result.response = getProgramResponse.program;
				} else if (result.status == 404) result.errors.push("program not found");
				else result.errors.push(...programErrors);
			} else {
				result.errors.push("invalid program_id");
				result.status = 404;
			}
		} else {
			let {success:orgProgramSuccess, params:orgProgramParams, errors:orgProgramErrors} = await getQueryParams(req, ["org_id"]);
			if (orgProgramSuccess) {
				const orgId = orgProgramParams[0];
				const getProgramResponse = await getOrgPrograms(orgId);
				result.status = getProgramResponse.status;
				if (result.status == 200) {
					let {success: tokenSuccess} = await verifyOrgMember(orgId, getToken(req.headers));
					if (tokenSuccess){
						let parsedPrograms = [];
						for (let i=0; i<getProgramResponse.programs.length; i++) {
							let {status: parseStatus, program: parseProgram, errors: parseErrors} = await parseOrgProgram(getProgramResponse.programs[i]);
							if (parseErrors.length) {
								result.status = parseStatus;
								result.errors.push(...parseErrors);
							} else parsedPrograms.push(parseProgram);
						} result.response = parsedPrograms;
					} else result.response = getProgramResponse.programs;
					result.success = true;
				}
				else if (result.status == 404) result.errors.push("programs not found");
				else result.errors.push(...orgProgramErrors);
			} else {
				const allPrograms = await getPrograms();
				result.status = allPrograms.status;
				if (allPrograms.status === 200) {
					result.response = allPrograms.programs;
					result.success = true;
				}
			}
		}
		// errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postProgram(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:programSuccess, params:programParams, errors:programErrors} = await getBodyParams(req, programData.baseProgramKeys);
		if (programSuccess) {
			let orgId = programParams[0];
			let {success: tokenSuccess, error: tokenError} = await verifyOrgMember(orgId, getToken(req.headers));
			if (tokenSuccess ){
				let {params: additionalParams} = await getBodyParams(req, programData.nullableProgramKeys);
				let postResult = await postProgram([...programParams, ...additionalParams]);
				if (postResult.success) {
					result.status = 201;
					result.success = true;
					result.response = {
						programData: postResult.id,
					}
				} else postResult.errors.forEach((error) => {result.errors.push(error)});
			} else {
				result.errors.push(tokenError)
				result.status = 401;
			}
		} else programErrors.forEach((param)=>{result.errors.push("missing "+param)});
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async putProgram(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Put request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async deleteProgram(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Delete request code
		res.status(result.status).json(result); //Return whatever result remains
	}
}
