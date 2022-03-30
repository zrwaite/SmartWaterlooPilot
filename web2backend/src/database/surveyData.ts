const postSurvey = {
	org: "",
	name: "",
	description: "",
}
const defaultSurvey = {
	...postSurvey,
}

const surveyData = {
	postSurveyKeys: Object.keys(postSurvey) as (keyof typeof postSurvey)[],
	allSurveyKeys: Object.keys(defaultSurvey) as (keyof typeof defaultSurvey)[],
}
export {surveyData, defaultSurvey}