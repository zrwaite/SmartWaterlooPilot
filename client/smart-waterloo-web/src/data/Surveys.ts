interface Question {
	prompt: string;
    answer_type: "short"|"long"|"mc"|"check";
	choices?: string[]
}
type defaultSurveysDataType = {
	surveysDataSet: boolean;
	surveys: SurveyDataType[]
}
const defaultSurveysState: defaultSurveysDataType = {surveysDataSet: false, surveys:[]};
interface SurveyDataType {
	id: string;
	name: string;
	organization: string;
	length: string;
	completed: boolean;
	questions: Question[];
}
const defaultSurveysData:SurveyDataType = {
	id: "",
	name: "",
	organization: "",
	length: "",
	completed: false,
	questions: []
}

// const exampleSurveys:SurveyDataType[] = [
// 	{
// 		name: "Survey 01",
// 		organization: "Kinbrdige Community Association",
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
// 		organization: "Fiddlesticks Community Centre",
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
// 		organization: "Greenway-Chaplin Community Centre",
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


export { defaultSurveysData, defaultSurveysState};
export type {SurveyDataType, Question}