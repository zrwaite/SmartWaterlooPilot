const questionKeys = ["prompt", "answer_type", "choices"] as const;
type questionValues = [string, string, string[]|undefined];
type postQuestionValues = [string, string, string];
const questionValuesTypes = [["string"], ["string"], ["object","undefined"]] as const;

const surveyKeys = ["org", "name", "description", "questions"] as const;
const getSurveyKeys = [...surveyKeys, "id"] as const;
type surveyValues = [string, string, string, questionValues[]];
type postSurveyValues = [string, string, string, string];
const surveyValuesTypes = [["string"], ["string"], ["string"], ["object"]] as const;

export {surveyKeys,surveyValuesTypes, questionKeys, questionValuesTypes, getSurveyKeys}
export type {questionValues, surveyValues, postSurveyValues, postQuestionValues}