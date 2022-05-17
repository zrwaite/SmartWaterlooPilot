const answerKeys = ["answer", "question_id"] as const;
type answerValues = [string, number];

const questionKeys = ["prompt", "answer_type", "choices", "optional"] as const;
const getQuestionKeys = [...questionKeys, "id"] as const;
type questionValues = [string, string, string[]|undefined, number];
type postQuestionValues = [string, string, string, number];
const questionValuesTypes = [["string"], ["string"], ["object","undefined"], ['number']] as const;

const surveyKeys = ["org", "name", "description", "questions", "feedback"] as const;
const getSurveyKeys = [...surveyKeys, "id", "user_info", "program_id"] as const;
type surveyValues = [string, string, string, questionValues[], boolean];
type postSurveyValues = [string, string, string, string, boolean];
const surveyValuesTypes = [["string"], ["string"], ["string"], ["object"], ["boolean"]] as const;

export {getQuestionKeys, answerKeys, surveyKeys,surveyValuesTypes, questionKeys, questionValuesTypes, getSurveyKeys}
export type {answerValues, questionValues, surveyValues, postSurveyValues, postQuestionValues}