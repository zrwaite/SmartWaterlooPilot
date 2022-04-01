import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {getQuestion, getQuestions} from "../modules/getDatabaseInfo";
import {getBodyParams, getParams, getQueryParams} from "../modules/getParams";
import {questionValues, questionKeys} from "../database/surveyData";
import { isQuestionArray } from "../modules/typeAssertions";

/* register controller */
export default class questionController {
	static async getQuestion(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:questionSuccess, params:questionParams, errors:questionErrors} = await getQueryParams(req, ["question_id"]);
		if (questionSuccess) {
			const questionId = questionParams[0];
			const getQuestionResponse = await getQuestion(questionId);
			result.status = getQuestionResponse.status;
			if (result.status == 200) {
				result.success = true;
				result.response = getQuestionResponse.question;
			}
			else if (result.status == 404) result.errors.push("question not found");
			else result.errors.push(...questionErrors);
		} else {
			const allQuestions = await getQuestions();
			result.response = allQuestions.questions;
			result.status = allQuestions.status;
			result.success = true;
		}
		// errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postQuestion(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		// Post request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async putQuestion(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Put request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async deleteQuestion(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Delete request code
		res.status(result.status).json(result); //Return whatever result remains
	}
}
