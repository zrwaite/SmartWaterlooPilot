import { userInfo } from "./account";

interface Question {
	prompt: string;
    answer_type: "text"|"mc";
	choices?: string[];
	id: string;
}
interface postSurveyType {
	name: string;
	description: string;
	questions: Question[];
}
interface SurveyDataType extends postSurveyType {
	id: string;
	length: string;
	org: string;
	user_info: userInfo[];
}
const defaultSurvey:SurveyDataType = {
	id: "",
	name: "",
	org: "",
	length: "",
	description: "",
	questions: [],
	user_info: []
}
const defaultAnswer = {
	answer: "",
	question_id: 0
}

const defaultSurveysState: {
	set: boolean;
	surveys: SurveyDataType[]
} = {set: false, surveys:[]};

type postSurveyReturn = {success:boolean, errors: string[], surveyId:string}
type submitSurveyReturn = {success: boolean, errors: string[]}
type addSurveyReturn = submitSurveyReturn;

export { defaultAnswer, defaultSurvey, defaultSurveysState};
export type {addSurveyReturn, Question, SurveyDataType, postSurveyType, postSurveyReturn, submitSurveyReturn};