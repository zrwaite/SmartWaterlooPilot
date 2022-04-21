import * as userABI from "./utils/SmartUser.json";
import * as orgABI from "./utils/SmartOrganisation.json";
import * as responseABI from "./utils/SurveyResponse.json";
import * as eventABI from "./utils/OrganisationEvents.json";
import * as surveyABI from "./utils/OrgSurvey.json";
import {AbiItem} from "web3-utils";
import Web3 from "web3";

const USE_WEB3 = true;
const DEV = true;


let web3 = new Web3(Web3.givenProvider);
declare var window: any;
const userContractAddress = "0xaD0cFDF3326Fd5c85519F2AF55c9a716D6B0E371";
const userContractABI = userABI.abi;
const userContract = new web3.eth.Contract(userContractABI as AbiItem[], userContractAddress);
const orgContractAddress = "0xb33fbDBc7e5fC3cdAE37CA36c7cCd7A8aE123Ff3";
const orgContractABI = orgABI.abi;
const orgContract = new web3.eth.Contract(orgContractABI as AbiItem[], orgContractAddress);
const responseContractAddress = "0xd8d883436158A19Bf20e98B4929f87d86Fafd82E";
const responseContractABI = responseABI.abi;
const responseContract = new web3.eth.Contract(responseContractABI as AbiItem[], responseContractAddress);
const eventContractAddress = "0x22bf3cc1904dB4fBb06E22818E0e6843233543c9";
const eventContractABI = eventABI.abi;
const eventContract = new web3.eth.Contract(eventContractABI as AbiItem[], eventContractAddress);
const surveyContractAddresss = "0x0eE9F24c144f06acc950Ecd6D55Ce5e791a68b52";
const surveyContractABI = surveyABI.abi;
const surveyContract = new web3.eth.Contract(surveyContractABI as AbiItem[], surveyContractAddresss);

export {USE_WEB3, DEV, userContract, orgContract, responseContract, eventContract, surveyContract};