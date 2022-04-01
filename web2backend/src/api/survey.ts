import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postSurvey} from "../modules/postDatabaseInfo";
import {getSurvey, getSurveys, getOrgSurveys, getQuestion} from "../modules/getDatabaseInfo";
import {getBodyParams, getParams, getQueryParams} from "../modules/getParams";
import {surveyKeys, surveyValues, questionValues, questionKeys} from "../database/surveyData";
import { isQuestionArray, isSurveyArray } from "../modules/typeAssertions";

/* register controller */
export default class surveyController {
	static async getSurvey(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:surveySuccess, params:surveyParams, errors:surveyErrors} = await getQueryParams(req, ["survey_id"]);
		if (surveySuccess) {
			const surveyId = surveyParams[0];
			const getSurveyResponse = await getSurvey(surveyId);
			result.status = getSurveyResponse.status;
			if (result.status == 200) {
				result.success = true;
				result.response = getSurveyResponse.survey;
			}
			else if (result.status == 404) result.errors.push("survey not found");
			else result.errors.push(...surveyErrors);
		} else {
			let {success:orgSurveySuccess, params:orgSurveyParams, errors:orgSurveyErrors} = await getQueryParams(req, ["org_id"]);
			if (orgSurveySuccess) {
				const orgId = orgSurveyParams[0];
				const getSurveyResponse = await getOrgSurveys(orgId);
				result.status = getSurveyResponse.status;
				if (result.status == 200) {
					result.success = true;
					result.response = getSurveyResponse.surveys;
				}
				else if (result.status == 404) result.errors.push("surveys not found");
				else result.errors.push(...orgSurveyErrors);
			} else {
				const allSurveys = await getSurveys();
				result.response = allSurveys.surveys;
				result.status = allSurveys.status;
				result.success = true;
			}
		}
		// errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postSurvey(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:surveySuccess, params, errors:surveyErrors} = getBodyParams(req, surveyKeys);
		if (surveySuccess) {
			let surveyParams = params as surveyValues;
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
				let postResult = await postSurvey(surveyParams);
				if (postResult.success) {
					result.status = 201;
					result.success = true;
					result.response = {
						surveyData: postResult.newSurvey,
					}
				} else postResult.errors.forEach((error) => {result.errors.push(error)});
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
