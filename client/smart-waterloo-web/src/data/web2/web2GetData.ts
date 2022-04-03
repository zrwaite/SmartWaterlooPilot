import {httpReq} from "./httpRequest";
import Cookies from "universal-cookie";
import {defaultAccount} from "../types/account";
import {defaultEvent} from "../types/events";
import {defaultSurvey} from "../types/surveys"
import {defaultOrg} from "../types/orgs";
const cookies = new Cookies();

const web2GetBasicUserData = async ():Promise<{success:boolean, userData:typeof defaultAccount|{}, errors:string[]}> => {
	let json = await httpReq("/api/user/?user_id=" + cookies.get("userId"))
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			let basicUserData = {...defaultAccount};
			basicUserData.avatarString = response.response.avatar_string;
			basicUserData.nickname = response.response.nickname;
			return {success: true, userData:basicUserData, errors: []};
		} else {
			return {success: false, userData:{}, errors: response.errors}
		}
	} else return {success: false, userData:{}, errors:["request failed"]};
};

const web2GetSurveysData = async ():Promise<{success:boolean, surveys:typeof defaultSurvey[], errors: string[]}> => {
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

const getWeb2SurveyData = async (id:string):Promise<{success:boolean, survey:typeof defaultSurvey|{}, errors: string[]}> => {
	let json = await httpReq("/api/survey/?survey_id="+id);
	if (json) {
		let response = JSON.parse(json);
		if (response.success) return {success: true, survey:response.response, errors: []};
		else return {success: false, survey:{}, errors: response.errors}
	} else return {success: false, survey: {}, errors:["request failed"]};
};


const getWeb2EventsData = async ():Promise<{success:boolean, events:typeof defaultEvent[], errors: string[]}> => {
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

const getWeb2EventData = async (id:string):Promise<{success:boolean, event:typeof defaultEvent|{}, errors: string[]}> => {
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

const web2GetUserOrgs = async (id:string):Promise<{success:boolean, orgs: typeof defaultOrg[], errors:string[]}> => {
	let json = await httpReq("/api/org/?owner_id="+id)
	if (json) {
		let response = JSON.parse(json);
		if (response.success) return {success: true, orgs:response.response, errors: []};
		else if (response.status === 404) return {success: true, orgs:[], errors: []};
		else return {success: false, orgs:[], errors: response.errors}
	} else return {success: false, orgs: [], errors:["request failed"]};
}

const web2GetBasicOrgData = async (id:string|undefined):Promise<{success:boolean, org: typeof defaultOrg|{}, errors:string[]}> => {
	let json = await httpReq("/api/org/?id="+id)
	if (json) {
		let response = JSON.parse(json);
		if (response.success) return {success: true, org:response.response, errors: []};
		else return {success: false, org:{}, errors: response.errors}
	} else return {success: false, org: {}, errors:["request failed"]};
}



export {web2GetBasicOrgData, web2GetBasicUserData, web2GetUserOrgs, web2GetSurveysData, getWeb2EventsData, getWeb2EventData, getWeb2SurveyData};