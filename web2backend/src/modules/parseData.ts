import { getUserInfo } from "./getDatabaseInfo"

const parseOrgEvent = async (event: any) => {
	for (let i=0; i<event.user_info.length; i++) {
		const {status, userInfo, errors} = await getUserInfo(event.user_info[i]);
		if (userInfo) {
			event.user_info[i] = userInfo;
		} else return {status: status, event: {}, errors: errors};
	}
	return {status: 200, event: event, errors: []}
}
const parseOrgSurvey = async (survey: any) => {
	for (let i=0; i<survey.user_info.length; i++) {
		const {status, userInfo, errors} = await getUserInfo(survey.user_info[i]);
		if (userInfo) {
			survey.user_info[i] = userInfo;
		} else return {status: status, survey: {}, errors: errors};
	}
	return {status: 200, survey: survey, errors: []}
}
const parseOrg = async (org: any) => {
	for (let i=0; i<org.user_info.length; i++) {
		const {status, userInfo, errors} = await getUserInfo(org.user_info[i]);
		if (userInfo) org.user_info[i] = userInfo;
		else return {status: status, org: {}, errors: errors};
	}
	return {status: 200, org: org, errors: []}
}

export {parseOrg, parseOrgEvent, parseOrgSurvey}