import { looseIncludes } from "../../modules/other";
import { SurveyDataType } from "../types/surveys";

const parseCompletedSurveys = (surveys:SurveyDataType[], userSurveyIds: number[]) => {
	console.log(userSurveyIds);
	surveys.forEach(survey => {
		if (looseIncludes(userSurveyIds, survey.id)) survey.completed = true;
		else survey.completed = false;
	})
}

export {parseCompletedSurveys}