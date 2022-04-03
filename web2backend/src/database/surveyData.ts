const answerKeys = ["answer", "question_id"] as const;
type answerValues = [string, number];

const questionKeys = ["prompt", "answer_type", "choices"] as const;
const getQuestionKeys = [...questionKeys, "id"] as const;
type questionValues = [string, string, string[]|undefined];
type postQuestionValues = [string, string, string];
const questionValuesTypes = [["string"], ["string"], ["object","undefined"]] as const;

const surveyKeys = ["org", "name", "description", "questions"] as const;
const getSurveyKeys = [...surveyKeys, "id"] as const;
type surveyValues = [string, string, string, questionValues[]];
type postSurveyValues = [string, string, string, string];
const surveyValuesTypes = [["string"], ["string"], ["string"], ["object"]] as const;

export {getQuestionKeys, answerKeys, surveyKeys,surveyValuesTypes, questionKeys, questionValuesTypes, getSurveyKeys}
export type {answerValues, questionValues, surveyValues, postSurveyValues, postQuestionValues}