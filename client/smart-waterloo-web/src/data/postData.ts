import {USE_WEB3} from "./dataConstants";
import Web3 from "web3";
import userABI from "./utils/SmartUser.json";
import { AbiItem } from 'web3-utils';
import eventABI from "./utils/OrganisationEvents.json";
import {postEventWeb2, postOrgWeb2, postUserWeb2} from "./web2/web2PostData";

interface postUserType {
	day:string, month:string, year:string,
	gender:string, height:string, weight:string,
	qrId:string, grade:string, postalCode:string,
	race:string, religion:string, sexuality:string,
	nickname:string, avatarString:string, password:string
}
interface postEventType {
	name:string, age:string, 
	start_day:string, start_month:string, start_year:string,
	end_day:string, end_month:string, end_year:string,
	category:string, description: string
}
interface postOrgType {
	avatarString:string, 
	nickname: string, 
	businessNumber: string
}
type postOrgReturn = {success:boolean, errors: string[], orgId:string}

const postOrg = async (inputData:postOrgType):Promise<postOrgReturn> => {
	return USE_WEB3?(await postOrgWeb3(inputData)):(await postOrgWeb2(inputData));
}
const postUser = async (inputData:postUserType) => {
	return USE_WEB3?(await postUserWeb3(inputData)):(await postUserWeb2(inputData));
}
const postEvent = async (inputData:postEventType) => {
	return USE_WEB3?(await postEventWeb2(inputData)):(await postEventWeb3(inputData));
}


const postOrgWeb3 = async (inputData:postOrgType):Promise<postOrgReturn> => {
	return {success: false, errors: ["not implemented"], orgId: ""};
}
const postEventWeb3 = async (inputData:postEventType) => {
	let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
	web3.eth.defaultAccount = accounts[0];
	const contractABI = eventABI;
	const contractAddress = "0xd242a3Fa65b82Aa9C87D3a19C82EA6b5Db78e8EB";

	const eventContract = await new web3.eth.Contract(contractABI as AbiItem[], contractAddress);

	await eventContract.methods.createOrgEvent(
		web3.eth.defaultAccount,
		inputData.name,
		inputData.age,
		(inputData.start_day + inputData.start_month + inputData.start_year),
		(inputData.end_day + inputData.end_month + inputData.end_year),
		inputData.category,
		inputData.description
	).send({ from: web3.eth.defaultAccount })
		.then(() => {
			console.log(`${inputData.name} created successfully`);
		})
		.catch((err: any) => console.log(err));

}

declare var window: any;
let web3 = new Web3(Web3.givenProvider);


const setAccounts = async () => {
	try {
		let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		web3.eth.defaultAccount = accounts[0];
		return web3.eth.defaultAccount;
	} catch (err: any) {
		console.log(err);
	}
	return "";
}

const postUserWeb3 = async (inputData:postUserType) => {
//Setting account wallet with context
let returnedAddress = await setAccounts();
// setAddress(returnedAddress);
// console.log(address);
console.log(web3.eth.defaultAccount);
let contractAddress;
let contractABI;
	//User Information Smart Contract
	
	contractAddress = "0x584Bfa8354673eF5f9Ab17a3d041D8E2537b4dD8";
	contractABI = userABI;

	const userContract = await new web3.eth.Contract(contractABI as AbiItem[], contractAddress);

	await userContract.methods.addInfo(
		web3.eth.defaultAccount,
		inputData.qrId,
		(inputData.day + inputData.month + inputData.year),
		inputData.gender,
		(inputData.height + inputData.weight),
		inputData.grade,
		inputData.postalCode,
		inputData.race,
		inputData.religion,
		inputData.sexuality,
		(inputData.nickname + inputData.avatarString)).send({ from: web3.eth.defaultAccount })
		.then(() => console.log("Information added successfully"))
		.catch((err: any) => console.log(err));
// }
// else {
// 	contractAddress = "0x2656D9bB68FCB5F56Ebe8CC50C5a2D61c86cB6b0";
// 	contractABI = orgABI;
// 	const orgContract = await new web3.eth.Contract(contractABI as AbiItem[], contractAddress);
// 	console.log(orgContract);
// 	await orgContract.methods.createOrg(web3.eth.defaultAccount,qrId, state.formInputs.businessNumber, (state.formInputs.nickname + state.formInputs.avatarString), [""]).send({from: web3.eth.defaultAccount})
// 	.then(() => console.log(`Organisation ${state.formInputs.businessNumber} created succesfully`))
// 	.catch((err:any) => console.log(err));
// }

}

export {postUser, postEvent, postOrg}

export type {postUserType, postEventType, postOrgType, postOrgReturn}