import { looseIncludes } from "../../modules/other";
import { SurveyDataType } from "../types/surveys";

const getMySurveys = (allSurveys: SurveyDataType[], orgsIds: (string|number)[], signedUpProgramIds: (string|number)[]) : SurveyDataType[] => {
	let newSurveys:SurveyDataType[] = [];
	allSurveys.forEach(survey => {
		if (looseIncludes(orgsIds, survey.org)) {
			if (survey.feedback){
				if (looseIncludes(signedUpProgramIds, survey.program_id)) newSurveys.push(survey);
			} else newSurveys.push(survey);
		}
	})
	return newSurveys;
}


export {getMySurveys}