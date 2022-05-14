import { looseIncludes } from "../../modules/other";
import { SurveyDataType } from "../types/surveys";

const getMySurveys = (allSurveys: SurveyDataType[], orgsIds: (string|number)[]) : SurveyDataType[] => {
	let newSurveys:SurveyDataType[] = [];
	allSurveys.forEach(survey => {
		if (looseIncludes(orgsIds, survey.org)) newSurveys.push(survey);
	})
	return newSurveys;
}


export {getMySurveys}