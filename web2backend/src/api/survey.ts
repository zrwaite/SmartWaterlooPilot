import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postSurvey} from "../modules/postDatabaseInfo";
import {getSurvey, getSurveys, getOrgSurveys, getQuestion} from "../modules/getDatabaseInfo";
import {getBodyParams, getParams, getQueryParams} from "../modules/getParams";
import {surveyKeys, surveyValues, questionValues, questionKeys} from "../database/surveyData";
import { isQuestionArray, isSurveyArray } from "../modules/typeAssertions";
import { getToken, verifyOrgMember } from "../auth/tokenFunctions";
import { parseOrgSurvey } from "../modules/parseData";

/* register controller */
export default class surveyController {
	static async getSurvey(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:surveySuccess, params:surveyParams, errors:surveyErrors} = await getQueryParams(req, ["survey_id"]);
		if (surveySuccess) {
			const surveyId = surveyParams[0];
			if (!isNaN(surveyId)) {
				const getSurveyResponse = await getSurvey(surveyId);
				result.status = getSurveyResponse.status;
				if (result.status == 200) {
					const orgId = getSurveyResponse.survey.org;
					let {success: tokenSuccess, error} = await verifyOrgMember(orgId, getToken(req.headers));
					if (tokenSuccess) {
						let {status: parseStatus, survey: parseSurvey, errors: parseErrors} = await parseOrgSurvey(getSurveyResponse.survey);
						if (parseErrors.length) {
							result.status = parseStatus;
							result.errors.push(...parseErrors);
						} else {
							result.response = parseSurvey;
							result.success = true;
						}
					} else result.response = getSurveyResponse.survey;
				} else if (result.status == 404) result.errors.push("survey not found");
				else result.errors.push(...surveyErrors);
			} else {
				result.errors.push("invalid survey_id");
				result.status = 404;
			}
		} else {
			let {success:orgSurveySuccess, params:orgSurveyParams, errors:orgSurveyErrors} = await getQueryParams(req, ["org_id"]);
			if (orgSurveySuccess) {
				const orgId = orgSurveyParams[0];
				if (!isNaN(orgId)) {
					const getSurveyResponse = await getOrgSurveys(orgId);
					result.status = getSurveyResponse.status;
					if (result.status == 200) {
						let {success: tokenSuccess} = await verifyOrgMember(orgId, getToken(req.headers));
						if (tokenSuccess){
							let parsedSurveys = [];
							for (let i=0; i<getSurveyResponse.surveys.length; i++) {
								let {status: parseStatus, survey: parseSurvey, errors: parseErrors} = await parseOrgSurvey(getSurveyResponse.surveys[i]);
								if (parseErrors.length) {
									result.status = parseStatus;
									result.errors.push(...parseErrors);
								} else parsedSurveys.push(parseSurvey);
							} result.response = parsedSurveys;
						} else result.response = getSurveyResponse.surveys;
						result.success = true;
					} else if (result.status == 404) result.errors.push("surveys not found");
					else result.errors.push(...orgSurveyErrors);
				} else {
					result.errors.push("invalid survey_id");
					result.status = 404;
				}
				
			} else {
				const allSurveys = await getSurveys();
				result.status = allSurveys.status;
				if (result.status === 200) {
					result.response = allSurveys.surveys;
					result.success = true;
				}
			}
		}
		// errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postSurvey(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:surveySuccess, params, errors:surveyErrors} = getBodyParams(req, surveyKeys);
		let programId = 0;
		if (surveySuccess) {
			let orgId = params[0];
			let {success: tokenSuccess, error: tokenError} = await verifyOrgMember(orgId, getToken(req.headers));
			if (tokenSuccess ){
				let surveyParams = params as surveyValues;
				let feedback = surveyParams[4]?true:false;
				if (feedback) {
					let {success:programIdSuccess, params:programIdParams, errors:programIdErrors} = getBodyParams(req, ["program_id"]);
					if (programIdSuccess) {
						try {
							programId = parseInt(programIdParams[0]);
						} catch (e) {
							result.errors.push("Invalid program_id");
						}
					} else result.errors.push("Missing program_id");
				}
				let questions:questionValues[] = [];
				if (isSurveyArray(params)){
					surveyParams[3].forEach((question, i) => {
						let {success:questionSuccess, params: questionParams, errors:questionErrors} = getParams(question, questionKeys);
						if (questionSuccess)
							 if (isQuestionArray(questionParams)) 
								questions.push(questionParams as questionValues)
							else result.errors.push(`invalid question at index ${i}`);
						else questionErrors.forEach(error => result.errors.push(`missing ${error} in question at index ${i}`));
					});
					surveyParams[3] = questions;
				} else result.errors.push(`invalid survey type`);
				if (result.errors.length === 0){
					let postResult = await postSurvey(surveyParams, programId);
					if (postResult.success) {
						result.status = 201;
						result.success = true;
						result.response = {
							surveyData: postResult.id,
						}
					} else postResult.errors.forEach((error) => {result.errors.push(error)});
				}
			} else {
				result.errors.push(tokenError)
				result.status = 401;
			}
		} else surveyErrors.forEach((param)=>{result.errors.push("missing "+param)});
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async putSurvey(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Put request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async deleteSurvey(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Delete request code
		res.status(result.status).json(result); //Return whatever result remains
	}
}
