import {USE_WEB3} from "./dataConstants";
import Web3 from "web3";
import userABI from "./utils/SmartUser.json";
import { AbiItem } from 'web3-utils';
import programABI from "./utils/OrganisationEvents.json";
import {postProgramWeb2, postOrgWeb2, postUserWeb2, web2PostSurvey, web2PostAnswers} from "./web2/web2PostData";
import { postSurveyReturn, postSurveyType, Question, submitSurveyReturn} from "./types/surveys";
import { postOrgReturn, postOrgType } from "./types/orgs";
import { postProgramReturn, postProgramType } from "./types/programs";
import { postUserType } from "./types/account";
import { addSurveytoUser } from "./addData";
import cookies from "../modules/cookies";

const postOrg = async (inputData:postOrgType):Promise<postOrgReturn> => {
	return USE_WEB3?(await postOrgWeb3(inputData)):(await postOrgWeb2(inputData));
}
const postUser = async (inputData:postUserType):Promise<string[]> => {
	return USE_WEB3?(await postUserWeb3(inputData)):(await postUserWeb2(inputData));
}
const postProgram = async (id:string, inputData:postProgramType):Promise<postProgramReturn> => {
	return USE_WEB3?(await postProgramWeb3(id, inputData)):(await postProgramWeb2(id, inputData));
}
const postSurvey = async (id:string, inputData:postSurveyType):Promise<postSurveyReturn> => {
	return USE_WEB3?(await web3PostSurvey(id, inputData)):(await web2PostSurvey(id, inputData));
}
const submitSurvey = async (surveyId: string, questions: Question[], answers: string[]):Promise<submitSurveyReturn> => {
	if (questions.length !== answers.length) return {success: false, errors: ["invalid answers"]};
	questions.forEach((question, i) => {
		if (question.choices?.length && !question.choices.includes(answers[i])) return {success: false, errors: ["invalid answer "+answers[i]]};
	});
	let questionIds = questions.map((question) => question.id)
	let postAnswersErrors = await postAnswers(questionIds, answers)
	if (postAnswersErrors.length) return {success: false, errors: postAnswersErrors}; 
	let {success, errors} = await addSurveytoUser(cookies.get("userId"), surveyId)
	return {success: success, errors: errors};
}
const postAnswers = async (questionIds: string[], answers: string[]):Promise<string[]> => {
	return USE_WEB3?(await web3PostAnswers(questionIds, answers)):(await web2PostAnswers(questionIds, answers)); 
}
const web3PostAnswers = async (questionIds: string[], answers: string[]):Promise<string[]> => {
	return ["function not implemented"]; 
}


const web3PostSurvey = async (id:string, inputData:postSurveyType):Promise<postSurveyReturn> => {
	return {success: false, errors: ["not implemented"], surveyId: ""};
}
const postOrgWeb3 = async (inputData:postOrgType):Promise<postOrgReturn> => {
	return {success: false, errors: ["not implemented"], orgId: ""};
}
const postProgramWeb3 = async (id:string, inputData:postProgramType):Promise<postProgramReturn> => {
	let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
	web3.eth.defaultAccount = accounts[0];
	const contractABI = programABI;
	const contractAddress = "0xd242a3Fa65b82Aa9C87D3a19C82EA6b5Db78e8EB";

	// const programContract = await new web3.eth.Contract(contractABI as AbiItem[], contractAddress);
	const programContract = await new web3.eth.Contract(contractABI as any, contractAddress);

	await programContract.methods.createOrgProgram(
		web3.eth.defaultAccount,
		inputData.name,
		inputData.min_age,
		(inputData.start_day + inputData.start_month + inputData.start_year),
		(inputData.end_day + inputData.end_month + inputData.end_year),
		inputData.category,
		inputData.description
	).send({ from: web3.eth.defaultAccount })
		.then(() => {
			console.log(`${inputData.name} created successfully`);
		})
		.catch((err: any) => console.log(err));
	return {success: false, errors: ["function not yet implemented"], programId: "-1"}
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

	const userContract = await new web3.eth.Contract(contractABI as any, contractAddress);
	// const userContract = await new web3.eth.Contract(contractABI as AbiItem[], contractAddress);

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
		(inputData.nickname + inputData.avatar_string)).send({ from: web3.eth.defaultAccount })
		.then(() => console.log("Information added successfully"))
		.catch((err: any) => console.log(err));
// }
// else {
// 	contractAddress = "0x2656D9bB68FCB5F56Ebe8CC50C5a2D61c86cB6b0";
// 	contractABI = orgABI;
// 	const orgContract = await new web3.eth.Contract(contractABI as AbiItem[], contractAddress);
// 	console.log(orgContract);
// 	await orgContract.methods.createOrg(web3.eth.defaultAccount,qrId, state.formInputs.businessNumber, (state.formInputs.nickname + state.formInputs.avatar_string), [""]).send({from: web3.eth.defaultAccount})
// 	.then(() => console.log(`Organisation ${state.formInputs.businessNumber} created succesfully`))
// 	.catch((err:any) => console.log(err));
// }
	return ["not implemented"]
}

export {submitSurvey, postSurvey, postUser, postProgram, postOrg}