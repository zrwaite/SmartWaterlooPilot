import {
  USE_WEB3,
  userContract,
  orgContract,
  eventContract,
  surveyContract,
  responseContract,
} from "./dataConstants";
import Web3 from "web3";
import {
  postEventWeb2,
  postOrgWeb2,
  postUserWeb2,
  web2PostSurvey,
  web2PostAnswer,
} from "./web2/web2PostData";
import {
  postSurveyReturn,
  postSurveyType,
  Question,
  submitSurveyReturn,
} from "./types/surveys";
import { postOrgReturn, postOrgType } from "./types/orgs";
import { postEventReturn, postEventType } from "./types/events";
import { postUserType } from "./types/account";
import { addSurveytoUser } from "./addData";
import cookies from "../modules/cookies";

declare var window: any;
const web3 = new Web3(Web3.givenProvider);
window.ethereum.enable();

const getUserAddress = async (): Promise<string> => {
  try {
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
    console.log(web3.eth.defaultAccount);
    const account = web3.utils.toChecksumAddress(accounts[0]);
    return account;
  } catch (e) {
    console.log(e);
    return "";
  }
};

const postOrg = async (inputData: postOrgType): Promise<postOrgReturn> => {
  return USE_WEB3 ? await postOrgWeb3(inputData) : await postOrgWeb2(inputData);
};

//Web3 Implementation of Organisation Creation
const postOrgWeb3 = async (inputData: postOrgType) => {
  web3.eth.defaultAccount = await getUserAddress();
  try {
    console.log(web3.eth.defaultAccount);
    const userData = await userContract.methods
      .getInfo(web3.eth.defaultAccount)
      .call();
    const orgData = await orgContract.methods
      .createOrg(
        web3.eth.defaultAccount,
        userData[0],
        inputData.businessNumber,
        inputData.nickname + inputData.avatar_string,
        [web3.eth.defaultAccount]
      )
      .send({ from: web3.eth.defaultAccount });
    let orgNumber = await orgContract.methods.getTotalOrganisations().call();
    orgNumber = orgNumber.toString();
    console.log(orgData);
    return {
      success: true,
      errors: [],
      orgId: orgNumber,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      errors: ["Error creating an organisation"],
      orgId: ""
    };
  }
};

const postUser = async (inputData: postUserType): Promise<string[]> => {
  return USE_WEB3
    ? await postUserWeb3(inputData)
    : await postUserWeb2(inputData);
};

//Web3 SmartUser initial data post
const postUserWeb3 = async (inputData: postUserType): Promise<string[]> => {
  try {
    web3.eth.defaultAccount = await getUserAddress();
    console.log(web3.eth.defaultAccount);
    console.log(web3.eth.defaultAccount);
    await userContract.methods
      .addInfo(web3.eth.defaultAccount, [
        inputData.qrId,
        inputData.day + inputData.month + inputData.year,
        inputData.gender,
        inputData.height + inputData.weight,
        inputData.grade,
        inputData.postalCode,
        inputData.race,
        inputData.religion,
        inputData.sexuality,
        inputData.nickname + inputData.avatar_string,
      ])
      .send({ from: web3.eth.defaultAccount })
      .then((receipt: any) => console.log(receipt));
    return [];
  } catch (e) {
    console.log(e);
    return ["not working"];
  }
};

const postEvent = async (
  id: string,
  inputData: postEventType
): Promise<postEventReturn> => {
  return USE_WEB3
    ? await postEventWeb3(id, inputData)
    : await postEventWeb2(id, inputData);
};

const postEventWeb3 = async (id: string, inputData: postEventType) => {
  web3.eth.defaultAccount = await getUserAddress();
  try {
    console.log(web3.eth.defaultAccount);
    const userData = await userContract.methods
      .getInfo(web3.eth.defaultAccount)
      .call();
    let eventID = await eventContract.methods.getNumberOfEvents().call();
    const eventCreated = await eventContract.methods
      .createOrgEvent(
        web3.eth.defaultAccount,
        inputData.name,
        inputData.age,
        (inputData.start_day + inputData.start_month + inputData.start_year),
        (inputData.end_day + inputData.end_month + inputData.end_year),
        inputData.category,
        inputData.description,
        eventID.toString()
      )
      .send({ from: web3.eth.defaultAccount });
    console.log(eventCreated);
    return {
      success: true,
      errors: [],
      eventId: eventID.toString(),
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      errors: ["Error creating an event"],
      eventId: ""
    };
  }
};  

const postSurvey = async (
  id: string,
  inputData: postSurveyType
): Promise<postSurveyReturn> => {
  return USE_WEB3
    ? await web3PostSurvey(id, inputData)
    : await web2PostSurvey(id, inputData);
};

//web3 implementation of creating a survey
const web3PostSurvey = async (id: string, inputData: postSurveyType) => {
  web3.eth.defaultAccount = await getUserAddress();
  try {
    console.log(web3.eth.defaultAccount);
    let surveyID = await surveyContract.methods.getNumberofSurveys().call();
    surveyID = surveyID.toString();
    const surveyCreated = await surveyContract.methods
      .createSurvey(
        web3.eth.defaultAccount,
        inputData.name,
        inputData.description,
        inputData.questions,
        surveyID
      )
      .send({ from: web3.eth.defaultAccount });
    console.log(surveyCreated);
    return {
      success: true,
      errors: [],
      surveyId: surveyID,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      errors: ["Error creating a survey"],
      surveyId: ""
    };
  }
};


const submitSurvey = async (
  surveyId: string,
  questions: Question[],
  answers: string[]
): Promise<submitSurveyReturn> => {
  if(USE_WEB3)
  {
    web3submitSurvey(surveyId, answers);
    return { success: true, errors: [] };
  }
  else
  {
  if (questions.length !== answers.length)
    return { success: false, errors: ["invalid answers"] };
  questions.forEach((question, i) => {
    if (question.choices?.length && !question.choices.includes(answers[i]))
      return { success: false, errors: ["invalid answer " + answers[i]] };
  });
  for (let i = 0; i < questions.length; i++) {
    let postAnswerErrors = await postAnswer(questions[i].id, answers[i]);
    if (postAnswerErrors.length)
      return { success: false, errors: postAnswerErrors };
  }
  let { success, errors } = await addSurveytoUser(
    cookies.get("userId"),
    surveyId
  );
  return { success: success, errors: errors };
  }
};
const postAnswer = async (
  questionId: string,
  answer: string
): Promise<string[]> => {
  return await web2PostAnswer(questionId, answer);
};

//web3 implementation of posting a survey response
const web3submitSurvey = async (
  surveyID: string,
  answer: string[]
): Promise<string[]> => {
  return ["function not implemented"];
};

export { submitSurvey, postSurvey, postUser, postEvent, postOrg };
