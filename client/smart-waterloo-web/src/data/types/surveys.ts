interface Question {
	prompt: string;
    answer_type: "short"|"long"|"mc"|"check";
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
}
const defaultSurvey:SurveyDataType = {
	id: "",
	name: "",
	org: "",
	length: "",
	description: "",
	questions: []
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












// const exampleSurveys:SurveyDataType[] = [
// 	{
// 		name: "Survey 01",
// 		org: "Kinbrdige Community Association",
// 		length: "2-3 mins",
// 		completed: true,
// 		questions: [
// 			{
// 				prompt: "How would you rate your experience?",
// 				type: "mc",
// 				choices: ["Good", "Poor"]
// 			}, {
// 				prompt: "Tell us about your favorite part of the event.",
// 				type: "short"
// 			}, {
// 				prompt: "Would you recommend this event to a friend, why or why not?",
// 				type:"long"
// 			}
// 		]
// 	},
// 	{
// 		name:"Survey 02",
// 		org: "Fiddlesticks Community Centre",
// 		length: "2-3 mins",
// 		completed: false,
// 		questions: [
// 			{
// 				prompt: "How would you rate your experience?",
// 				type: "mc",
// 				choices: ["Great", "Good", "Neutral", "Bad", "Terrible"]
// 			}, {
// 				prompt: "Tell us about your favorite part of the event and why.",
// 				type: "long"
// 			}, {
// 				prompt: "Would you recommend this event to a friend, why or why not?",
// 				type:"long"
// 			}
// 		]
// 	},
// 	{
// 		name: "Survey 03",
// 		org: "Greenway-Chaplin Community Centre",
// 		length: "2-3 mins",
// 		completed: false,
// 		questions: [
// 			{
// 				prompt: "What parts of the event did you enjoy?",
// 				type: "check",
// 				choices: ["Food", "Community", "People", "Activity"]
// 			}, {
// 				prompt: "What parts of the event did you not enjoy?",
// 				type: "check",
// 				choices: ["Food", "Community", "People", "Activity"]
// 			}, {
// 				prompt: "Would you recommend this event to a friend, why or why not?",
// 				type:"long"
// 			}
// 		]
// 	}
// ]