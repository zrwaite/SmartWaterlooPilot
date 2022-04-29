import { USE_WEB3, userContract, orgContract, eventContract } from "./dataConstants";
import { successErrorsReturn } from "./types/generics";
import { web2VerifyOrg, web2AddEventtoUser, web2AddSurveytoUser, web2AddUserToOrg } from "./web2/web2AddData";
import Web3 from "web3";

let web3 = new Web3(Web3.givenProvider);
declare var window: any;

const getUserAddress = async (): Promise<string> => {
	try {
	  const accounts = await web3.eth.getAccounts();
	  web3.eth.defaultAccount = accounts[0];
	  return accounts[0];
	} catch (e) {
	  console.log(e);
	  return "";
	}
  };

const addUserToOrg = async (userId: number, orgId: number):Promise<successErrorsReturn> => {
	return USE_WEB3?(await web3AddUserToOrg(userId, orgId)):(await web2AddUserToOrg(userId, orgId));
}
const addSurveytoUser = async (userId: string, surveyId: string):Promise<successErrorsReturn> => {
	return await web2AddSurveytoUser(userId, surveyId);
}
const addEventtoUser = async (userId: string, eventId: string):Promise<successErrorsReturn> => {
	return USE_WEB3?(await web3AddEventtoUser(userId, eventId)):(await web2AddEventtoUser(userId, eventId));
}
const verifyOrg = async (business_number: string, password:string):Promise<successErrorsReturn> => {
	return USE_WEB3?(await web3VerifyOrg(business_number, password)):(await web2VerifyOrg(business_number, password));
}

const web3VerifyOrg = async (business_number: string, password:string):Promise<successErrorsReturn> => {
	const userAddress = await getUserAddress();
	if(password == "0x709bF6355a8dEE0020dBA161C1c39220a55019b1"){
		const verified = await orgContract.methods.addVerifiedBusiness(business_number).send({from: userAddress});
		return {success: verified, errors: []};
	}
	else{
		return {success: false, errors: ["Incorrect password"]};
	}
}
const web3AddEventtoUser = async (userId: string, eventId: string):Promise<successErrorsReturn> => {
	const userAddress = await getUserAddress();
	const addUser = await eventContract.methods.addNewAttendee(userAddress, eventId).send({from: userAddress});
	return {success: addUser, errors: []};
}

const web3AddUserToOrg = async (userId: number, orgId: number):Promise<successErrorsReturn> => {
	return {success: false, errors: ["not implemented"]}
}

export {verifyOrg, addUserToOrg, addSurveytoUser, addEventtoUser}