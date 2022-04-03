import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postAnswer} from "../modules/postDatabaseInfo";
import {getAnswer, getQuestionAnswers} from "../modules/getDatabaseInfo";
import {updateAnswersArray} from "../modules/putDatabaseInfo";
import {getBodyParams, getQueryParams} from "../modules/getParams";
import {answerKeys} from "../database/surveyData";

/* register controller */
export default class answerController {
	static async getAnswer(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:answerSuccess, params:answerParams, errors:answerErrors} = await getQueryParams(req, ["answer_id"]);
		if (answerSuccess) {
			const answerId = answerParams[0];
			if (!isNaN(answerId)) {
				const getAnswerResponse = await getAnswer(answerId);
				result.status = getAnswerResponse.status;
				if (result.status == 200) {
					result.success = true;
					result.response = getAnswerResponse.answer;
				}
				else if (result.status == 404) result.errors.push("answer not found");
				else result.errors.push(...answerErrors);
			} else {
				result.errors.push("invalid answer_id");
				result.status = 404;
			}
		} else {
			let {success:questionAnswersSuccess, params:questionAnswersParams, errors:questionAnswersErrors} = await getQueryParams(req, ["question_id"]);
			if (questionAnswersSuccess) {
				const questionId = questionAnswersParams[0];
				if (!isNaN(questionId)) {
					const getAnswersResponse = await getQuestionAnswers(questionId);
					result.status = getAnswersResponse.status;
					if (result.status == 200) {
						result.success = true;
						result.response = getAnswersResponse.answers;
					}
					else if (result.status == 404) result.errors.push("answers not found");
					else result.errors.push(...questionAnswersErrors);
				} else {
					result.errors.push("invalid question_id");
					result.status = 404;
				}
			} else result.errors.push(...questionAnswersErrors);
		}
		// errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postAnswer(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:answerSuccess, params, errors:answerErrors} = getBodyParams(req, ["user_id", "link", ...answerKeys]);
		if (answerSuccess) {
			let userId = params[0];
			let link = params[1];
			let answer = params[2];
			let questionId = params[3];
			let postResult = await postAnswer(answer, questionId);
			if (postResult.success) {
				if (link) {
					let putResult = await updateAnswersArray(userId, postResult.newAnswer)
					if (putResult.status === 201) {
						result.status = 201;
						result.success = true;
						result.response = {answerData: postResult.newAnswer}
					} else result.errors.push("database put error");
				} else {
					result.status = 201;
					result.success = true;
				}
			} else result.errors.push(...postResult.errors);
			// let answerParams = params as answerValues;
			// let answers:answerValues[] = [];
			// if (isAnswerArray(params)){
			// 	answerParams[3].forEach((question, i) => {
			// 		let {success:questionSuccess, params: questionParams, errors:questionErrors} = getParams(question, questionKeys);
			// 		if (questionSuccess)
			// 		 	if (isQuestionArray(questionParams)) 
			// 				questions.push(questionParams as questionValues)
			// 			else result.errors.push(`invalid question at index ${i}`);
			// 		else questionErrors.forEach(error => result.errors.push(`missing ${error} in question at index ${i}`));
			// 	});
			// 	answerParams[3] = questions;
			// } else result.errors.push(`invalid answer type`);
		} else answerErrors.forEach((param)=>{result.errors.push("missing "+param)});
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async putAnswer(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Put request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async deleteAnswer(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		//Delete request code
		res.status(result.status).json(result); //Return whatever result remains
	}
}
