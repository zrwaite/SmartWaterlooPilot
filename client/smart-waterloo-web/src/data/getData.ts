
import { defaultEvent} from "./types/events";
import {defaultAnswer, defaultSurvey} from "./types/surveys"
import userABI from "./utils/SmartUser.json";
import {AbiItem} from "web3-utils";
import Web3 from "web3";
import userABI from "./utils/SmartUser.json";
import orgABI from "./utils/SmartOrganisation.json";
import responseABI from "./utils/SurveyResponse.json";
import eventABI from "./utils/OrganisationEvents.json";
import surveyABI from "./utils/OrgSurvey.json";
import {USE_WEB3} from "./dataConstants";

import {defaultAccount} from "./types/account";
import {web2GetAnswersData, web2GetUserOrgs, web2GetOrgSurveysData, web2GetOrgEventsData, web2GetUserData, web2GetSurveysData, web2GetBasicOrgData, web2GetEventsData, getWeb2EventData, getWeb2SurveyData, web2GetQuestionsAndAnswers} from "./web2/web2GetData";
import {defaultOrg} from "./types/orgs";

let web3 = new Web3(Web3.givenProvider);
declare var window: any;

const userContractAddress = "0x8DAE635c852546ffF9fEa2Ce6f0f685F2b346f8E";
const userContractABI = userABI.abi;
const userContract = new web3.eth.Contract(userContractABI as AbiItem[], userContractAddress);
const orgContractAddress = "0x6254f39399fb129d57c66Ee90a16e82d169FCaA7";
const orgContractABI = orgABI.abi;
const orgContract = new web3.eth.Contract(orgContractABI as AbiItem[], orgContractAddress);
const responseContractAddress = "0x28Eae2e0E2d71116ab30e368079810CB7C98dBaf";
const responseContractABI = responseABI.abi;
const responseContract = new web3.eth.Contract(responseContractABI as AbiItem[], responseContractAddress);
const eventContractAddress = "0x10532EB0f1064b52841133b5aFF3A6b536492f92";
const eventContractABI = eventABI.abi;
const eventContract = new web3.eth.Contract(eventContractABI as AbiItem[], eventContractAddress);
const surveyContractAddresss = "0x109DaBC18160c4fc589112Ad76DFBCdC666b1615";
const surveyContractABI = surveyABI.abi;
const surveyContract = new web3.eth.Contract(surveyContractABI as AbiItem[], surveyContractAddresss);

console.log(userContract.methods);
console.log(orgContract.methods);
console.log(responseContract.methods);
console.log(eventContract.methods);
console.log(surveyContract.methods);


const getQuestionsAndAnswers = async (answerIds: number[]):Promise<{success:boolean, answers: string[], questions:string[], errors: string[]}> =>{
	return USE_WEB3 ? (await web3GetQuestionsAndAnswers()) : (await web2GetQuestionsAndAnswers(answerIds));
}
const web3GetQuestionsAndAnswers = async ():Promise<{success:boolean, answers: string[], questions:string[], errors: string[]}> =>{
	return {success: false, questions: [], answers: [], errors: ["not implemented"]};
}

const getUserData = async ():Promise<{success:boolean, userData:typeof defaultAccount|{}, errors:string[]}> => {
	return USE_WEB3 ? (await web3GetUserData()) : (await web2GetUserData());
};
const web3GetUserData = async ():Promise<{success:boolean, answers: string[], questions:string[], errors: string[]}> =>{
	return {success: false, questions: [], answers: [], errors: ["not implemented"]};
}

const getSurveysData = async ():Promise<{success:boolean, surveys:typeof defaultSurvey[], errors: string[]}> => {
	return USE_WEB3 ? (await web3GetSurveysData()) : (await web2GetSurveysData());
}
const getEventsData = async ():Promise<{success:boolean, events:typeof defaultEvent[], errors: string[]}|any> => {
	return USE_WEB3 ? (await web3GetEventsData()) : (await web2GetEventsData());
};
const web3GetEventsData = async ():Promise<{success:boolean, answers: string[], questions:string[], errors: string[]}> =>{
	return {success: false, questions: [], answers: [], errors: ["not implemented"]};
}

const getOrgSurveysData = async (id:string|undefined):Promise<{success:boolean, surveys:typeof defaultSurvey[], errors: string[]}> => {
	return USE_WEB3 ? (await web3GetOrgSurveysData(id)) : (await web2GetOrgSurveysData(id));
}
const getOrgEventsData = async (id:string|undefined):Promise<{success:boolean, events:typeof defaultEvent[], errors: string[]}|any> => {
	return USE_WEB3 ? (await web3GetOrgEventsData(id)) : (await web2GetOrgEventsData(id));
};
const getEventData = async (id:string):Promise<{success:boolean, event:typeof defaultEvent|{}, errors: string[]}|any> => {
	return USE_WEB3 ? (await getWeb3EventData(id)) : (await getWeb2EventData(id));
};
const getWeb3EventData = async (id:string):Promise<{success:boolean, answers: string[], questions:string[], errors: string[]}> =>{
	return {success: false, questions: [], answers: [], errors: ["not implemented"]};
}

const getSurveyData = async (id:string):Promise<{success:boolean, survey:typeof defaultSurvey|{}, errors: string[]}|any> => {
	return USE_WEB3 ? (await getWeb3SurveyData(id)) : (await getWeb2SurveyData(id));
};
const getUserOrgs = async (id:string):Promise<{success:boolean, orgs: (typeof defaultOrg)[], errors:string[]}> => {
	return USE_WEB3 ? (await web3GetUserOrgs(id)) : (await web2GetUserOrgs(id));
}
const getBasicOrgData = async (id:string|undefined):Promise<{success:boolean, org: typeof defaultOrg|{}, errors:string[]}> => {
	return USE_WEB3 ? (await web3GetBasicOrgData(id)) : (await web2GetBasicOrgData(id));
}

const getAnswersData = async (id:string|undefined):Promise<{success:boolean, answers: typeof defaultAnswer[], errors:string[]}> => {
	return USE_WEB3 ? (await web3GetAnswersData(id)) : (await web2GetAnswersData(id));
}


const web3GetAnswersData = async (id:string|undefined):Promise<{success:boolean, answers: typeof defaultAnswer[], errors:string[]}> => {
	return {success: false, answers: [], errors: ["not implemented"]};
}
const web3GetBasicOrgData = async (id:string|undefined):Promise<{success:boolean, org: typeof defaultOrg|{}, errors:string[]}> => {
	return {success: false, org: {}, errors: ["not implemented"]};
}

const web3GetUserOrgs = async (id:string):Promise<{success:boolean, orgs: typeof defaultOrg[], errors:string[]}> => {
	return {success: false, orgs: [], errors: ["not implemented"]};
}

const getWeb3SurveyData = async (id:string):Promise<{success:boolean, survey:typeof defaultSurvey|{}, errors: string[]}> => {
	return {success: false, survey: {}, errors: []}
}

const web3GetSurveysData = async ():Promise<{success:boolean, surveys:typeof defaultSurvey[], errors: string[]}> => {
	return {success: false, surveys: [], errors: []}
}
const web3GetOrgSurveysData = async (id:string|undefined):Promise<{success:boolean, surveys:typeof defaultSurvey[], errors: string[]}> => {
	return {success: false, surveys: [], errors: []}
}
const web3GetOrgEventsData = async (id:string|undefined):Promise<{success:boolean, surveys:typeof defaultSurvey[], errors: string[]}> => {
	return {success: false, surveys: [], errors: []}
}

const getUserAddress = async ():Promise<string> => {
	try
	{
		const accounts = await web3.eth.getAccounts();
		return accounts[0];
	}
	catch(e)
	{
		console.log(e);
		return "";
	}
}

// const web3GetUserData = async () => {
// 	const address = await getUserAddress();
// 	console.log(address);
// 	const userContractAddress = "0x28Eae2e0E2d71116ab30e368079810CB7C98dBaf";
// 	const userContractAbi = userABI;
// 	const userContract = new web3.eth.Contract(userContractAbi as AbiItem[], userContractAddress);
// 	const userData = await userContract.methods.getInfo(address).call();
// 	return userData;
// }
// const getWeb3EventData = async (eventName:string) => {
// 	const eventContractAddress  = "0x10532EB0f1064b52841133b5aFF3A6b536492f92";
// 	const eventContractAbi = eventABI;
// 	const eventContract = new web3.eth.Contract(eventContractAbi as AbiItem[], eventContractAddress);
// 	const event = await eventContract.methods.getEvent(eventName).call();
// 	console.log(event);

// }
// const web3GetEventsData = async () => {
// 	const address = await getUserAddress();
// 	const eventContractAddress  = "0x10532EB0f1064b52841133b5aFF3A6b536492f92";
// 	const eventContractAbi = eventABI;
// 	const eventContract = new web3.eth.Contract(eventContractAbi as AbiItem[], eventContractAddress);
// 	const allEvents = await eventContract.methods.getOrgEvents(address).call();
// 	console.log(allEvents);
// };


export {getQuestionsAndAnswers, getAnswersData, getOrgEventsData, getOrgSurveysData, getBasicOrgData, getUserOrgs, getUserData, getEventsData, getEventData, getSurveysData, getSurveyData};
