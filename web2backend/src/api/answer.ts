import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postAnswers} from "../modules/postDatabaseInfo";
import {getAnswersAndQuestions, getQuestionAnswers} from "../modules/getDatabaseInfo";
import {updateAnswersArray} from "../modules/putDatabaseInfo";
import {getBodyParams, getQueryParams} from "../modules/getParams";
import {answerKeys} from "../database/surveyData";
import { getToken, verifyUser } from "../auth/tokenFunctions";

/* register controller */
export default class answerController {
	static async getAnswer(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:answerSuccess, params:answerParams, errors:answerErrors} = await getQueryParams(req, ["answer_ids"]);
		if (answerSuccess) {
			let answerIds =  []
			try {
				answerIds = JSON.parse(answerParams[0])
			} catch (e) {
				result.errors.push(e as string);
			}
			let allNums = true;
			answerIds.forEach((id:any) => {if(isNaN(id)) allNums = false});
			if (allNums && !result.errors.length) {
				const getAnswerResponse = await getAnswersAndQuestions(answerIds);
				result.status = getAnswerResponse.status;
				if (result.status == 200) {
					result.success = true;
					result.response = {
						answers: getAnswerResponse.answers,
						questions: getAnswerResponse.questions,
					}
				}
				else if (result.status == 404) result.errors.push("answer not found");
				else result.errors.push(...answerErrors);
			} else {
				result.errors.push("invalid answer_ids");
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
	static async postAnswers(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success:answerSuccess, params, errors:answerErrors} = getBodyParams(req, ["user_id", "link", "answers", "question_ids"]);
		if (answerSuccess) {
			let userId = params[0];
			let link = params[1];
			let answers = params[2];
			let questionIds = params[3];
			if (Array.isArray(answers) && Array.isArray(questionIds)){
				let {success: tokenSuccess, error: tokenError } = await verifyUser(params[0], getToken(req.headers));
				if (tokenSuccess) {
					let postResult = await postAnswers(answers, questionIds);
					if (postResult.success) {
						if (link) {
							let putResult = await updateAnswersArray(userId, postResult.ids)
							if (putResult.status === 201) {
								result.status = 201;
								result.success = true;
								result.response = {answerData: postResult.ids}
							} else result.errors.push("database put error");
						} else {
							result.status = 201;
							result.success = true;
						}
					} else result.errors.push(...postResult.errors);
				} else {
					result.errors.push(tokenError)
					result.status = 401;
				}
			} else result.errors.push("answers or questions are invalid");
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
