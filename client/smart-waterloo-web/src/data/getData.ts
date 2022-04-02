import {exampleEvents, defaultEventsData} from "./Events";
import {defaultSurveysData} from "./Surveys"
import userABI from "./utils/SmartUser.json";
import {AbiItem} from "web3-utils";
import Web3 from "web3";
import orgABI from "./utils/SmartOrganisation.json";
import eventABI from "./utils/OrganisationEvents.json";
import {USE_WEB3} from "./dataConstants";
import Cookies from "universal-cookie";
import {httpReq} from "./web2/httpRequest";
import {defaultUserData} from "./Users";
const cookies = new Cookies();
let web3 = new Web3(Web3.givenProvider);
declare var window: any;

// interface userDataObj {
// 	nickname: string,
// 	birth_day: string,
// 	birth_month: string,
// 	birth_year: string,
// 	gender: string,
// 	height: string,
// 	weight: string,
// 	religion: string,
// 	sexuality: string,
// 	race: string,
// 	grade: string,
// 	postal_code: string,
// 	avatar_string: string,
// }

const getBasicUserData = async ():Promise<{success:true, response:typeof defaultUserData}|{success:false, response: string[]}|any> => {
	return USE_WEB3 ? (await web3GetBasicUserData()) : (await web2GetBasicUserData());
};

const web2GetBasicUserData = async () => {
	let json = await httpReq("/api/user/?user_id=" + cookies.get("userId"))
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			let basicUserData = {...defaultUserData};
			basicUserData.avatarString = response.response.avatar_string;
			basicUserData.nickname = response.response.nickname;
			return {success: true, response:basicUserData};
		} else {
			return {success: false, response:response.errors}
		}
	} else return {success: false, response:["request failed"]};
};

const web3GetBasicUserData = async () => {
	// let {org} = useContext(OrgContext);
	// await new Promise(resolve => setTimeout(resolve, 1000)); //Just an artificial delay for mock data
	try {
		let accounts = await window.ethereum.request({
			method: "eth_requestAccounts",
		});
		web3.eth.defaultAccount = accounts[0];
	} catch (err: any) {
		console.log(err);
	}
	const userAddress = web3.eth.defaultAccount;
	let contractAddress;
	let contractABI;
	contractAddress = "0x584Bfa8354673eF5f9Ab17a3d041D8E2537b4dD8";
	contractABI = userABI;
	let org: boolean = false;
	const userContract = await new web3.eth.Contract(contractABI as AbiItem[], contractAddress);
	await userContract.methods
		.getInfo(userAddress)
		.call()
		.then(() => (org = false))
		.catch(() => (org = true));
	console.log(org);
	if (org === false) {
		const userData = await userContract.methods.getInfo(userAddress).call();

		if (userAddress === "") {
			alert("Invalid user!");
			return undefined;
		}
		return {
			userDataSet: true,
			// nickname: userData.avatarName,
			// avatarString: user.avatarString
			nickname: userData[9].substring(0, userData[9].length - 8),
			avatarString: userData[9].substring(-8),
		};
	} else {
		const orgAddress = userAddress;
		contractAddress = "0x2656D9bB68FCB5F56Ebe8CC50C5a2D61c86cB6b0";
		contractABI = orgABI;
		console.log(orgAddress);
		const orgContract = await new web3.eth.Contract(contractABI as AbiItem[], contractAddress);
		console.log(orgContract);

		const userData = await orgContract.methods.getOrgInfo(orgAddress).call();
		if (orgAddress === "") {
			alert("Invalid user!");
			return undefined;
		}
		return {
			userDataSet: true,
			// nickname: userData.avatarName,
			// avatarString: user.avatarString
			nickname: userData[2],
			avatarString: userData.avatarName,
		};
	}
};
const getSurveysData = async ():Promise<{success:boolean, surveys:typeof defaultSurveysData[], errors: string[]}> => {
	return USE_WEB3 ? (await web3GetSurveysData()) : (await web2GetSurveysData());
}
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
const web3GetSurveysData = async ():Promise<{success:boolean, surveys:typeof defaultSurveysData[], errors: string[]}> => {
	return {success: false, surveys: [], errors: []}
}

const getEventsData = async ():Promise<{success:boolean, events:typeof defaultEventsData.events, errors: string[]}|any> => {
	return USE_WEB3 ? (await getWeb3EventsData()) : (await getWeb2EventsData());
};

const getWeb2EventsData = async () => {
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
const getEventData = async (id:string):Promise<{success:boolean, event:typeof defaultEventsData.events[number]|{}, errors: string[]}|any> => {
	return USE_WEB3 ? (await getWeb3EventData(id)) : (await getWeb2EventData(id));
};
const getWeb2EventData = async (id:string) => {
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
const getWeb3EventData = async (id:string) => {

}
const getWeb3EventsData = async () => {
	await new Promise((resolve) => setTimeout(resolve, 1000)); //Just an artificial delay for mock data
	let newEvents: typeof defaultEventsData.events = [];
	let accounts = await window.ethereum.request({
		method: "eth_requestAccounts",
	});
	web3.eth.defaultAccount = accounts[0];
	const contractABI = eventABI;
	const contractAddress = "0xdc8b9aE001e2730862F3F16d16Ed4cC1fec82996";

	const eventContract = await new web3.eth.Contract(contractABI as AbiItem[], contractAddress);
	console.log(eventContract);
	const eve = await eventContract.methods
		.getAllEvents()
		.call()
		.then(() => console.log("Things work"))
		.catch((err: any) => console.log(err));

	// console.log(eve);
	//EDIT TO NOT BE EXAMPLE EVENTS
	exampleEvents.forEach((event) => {
		newEvents.push({
			id: event.id,
			name: event.name,
			organization: event.organization,
			age_range: event.age_range,
			start_date: event.start_date,
			end_date: event.end_date,
			category: event.category,
			signed_up: event.signed_up,
			description: event.description,
			image: event.image,
		});
	});
	if (!newEvents) {
		alert("Events not found");
		return undefined;
	}
	return newEvents;
};

export {getBasicUserData, getEventsData, getEventData, getSurveysData};
