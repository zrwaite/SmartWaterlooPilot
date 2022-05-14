import { looseIncludes } from "../../modules/other";
import { defaultProgramType } from "../types/programs";
import { SurveyDataType } from "../types/surveys";

const parseCompletedSurveys = (surveys:SurveyDataType[], userSurveyIds: number[]) => {
	surveys.forEach(survey => {
		if (looseIncludes(userSurveyIds, survey.id)) survey.completed = true;
		else survey.completed = false;
	})
}
const parseSignedUpPrograms = (programs:defaultProgramType[], userProgramIds: number[]) => {
	programs.forEach(program => {
		if (looseIncludes(userProgramIds, program.id)) program.signedUp = true;
		else program.signedUp = false;
	})
}

export {parseCompletedSurveys, parseSignedUpPrograms}