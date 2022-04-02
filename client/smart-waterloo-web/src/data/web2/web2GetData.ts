import {httpReq} from "./httpRequest";
import Cookies from "universal-cookie";
import {defaultAccountData} from "../account";
import {defaultEventsData} from "../Events";
import {defaultSurveysData} from "../Surveys"
const cookies = new Cookies();

const web2GetBasicUserData = async () => {
	let json = await httpReq("/api/user/?user_id=" + cookies.get("userId"))
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			let basicUserData = {...defaultAccountData};
			basicUserData.avatarString = response.response.avatar_string;
			basicUserData.nickname = response.response.nickname;
			return {success: true, response:basicUserData};
		} else {
			return {success: false, response:response.errors}
		}
	} else return {success: false, response:["request failed"]};
};

const web2GetSurveysData = async ():Promise<{success:boolean, surveys:typeof defaultSurveysData[], errors: string[]}> => {
	let json = await httpReq("/api/survey/")
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			return {success: true, surveys:response.response, errors: []};
		} else {
			return {success: false, surveys:[], errors: response.errors}
		}
	} else return {success: false, surveys: [], errors:["request failed"]};
}

const getWeb2SurveyData = async (id:string):Promise<{success:boolean, survey:typeof defaultSurveysData|{}, errors: string[]}> => {
	let json = await httpReq("/api/survey/?survey_id="+id);
	if (json) {
		let response = JSON.parse(json);
		if (response.success) return {success: true, survey:response.response, errors: []};
		else return {success: false, survey:{}, errors: response.errors}
	} else return {success: false, survey: {}, errors:["request failed"]};
};


const getWeb2EventsData = async ():Promise<{success:boolean, events:typeof defaultEventsData.events, errors: string[]}> => {
	let json = await httpReq("/api/event/")
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			return {success: true, events:response.response, errors: []};
		} else {
			return {success: false, events:[], errors: response.errors}
		}
	} else return {success: false, events: [], errors:["request failed"]};
};

const getWeb2EventData = async (id:string):Promise<{success:boolean, event:typeof defaultEventsData.events[number]|{}, errors: string[]}> => {
	let json = await httpReq("/api/event/?event_id="+id)
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			return {success: true, event:response.response, errors: []};
		} else {
			return {success: false, event:{}, errors: response.errors}
		}
	} else return {success: false, event: {}, errors:["request failed"]};
};

export {web2GetBasicUserData, web2GetSurveysData, getWeb2EventsData, getWeb2EventData, getWeb2SurveyData};