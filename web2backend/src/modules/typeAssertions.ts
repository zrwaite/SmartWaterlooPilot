import  {surveyValuesTypes, questionValuesTypes, surveyValues, questionValues} from "../database/surveyData";

const valueInArray = (value:any, array: readonly any[]) => {
	array.forEach(arrayValue => {if (value === arrayValue) return true})
	return false;
}

const isArrayType = (maybeArray: any, types: readonly (readonly string[])[]) => {
	if (!Array.isArray(maybeArray)) return false;
	maybeArray = maybeArray as any[];
	if (maybeArray.length !== types.length) return false;
	maybeArray.forEach((value:any, i:number) => {
		if (!valueInArray(typeof value, types[i])) return false;
	})
	return true;
}

const isSurveyArray = (maybeSurvey:any) => {
	if (!isArrayType(maybeSurvey, surveyValuesTypes)) return false;
	return true;
}
const isQuestionArray = (maybeQuestion:any) => {
	if (!isArrayType(maybeQuestion, questionValuesTypes)) return false;
	maybeQuestion[2].forEach((choice: string) => {
		if (typeof choice !== "string") return false;
	})	
	return true;
}

export {isSurveyArray, isQuestionArray};