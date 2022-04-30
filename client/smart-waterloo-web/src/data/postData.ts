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
  postProgramWeb2,
  postOrgWeb2,
  postUserWeb2,
  web2PostSurvey,
  web2PostAnswers,
} from "./web2/web2PostData";
import {
  postSurveyReturn,
  postSurveyType,
  Question,
  submitSurveyReturn,
} from "./types/surveys";
import { postOrgReturn, postOrgType } from "./types/orgs";
import { postProgramReturn, postProgramType } from "./types/programs";
import { postUserType } from "./types/account";
import { addSurveytoUser } from "./addData";
import cookies from "../modules/cookies";

declare var window: any;
let web3 = USE_WEB3?(new Web3(Web3.givenProvider)):null;
if (USE_WEB3) window.ethereum.enable();

const getUserAddress = async (): Promise<string> => {
  if (!web3) return "";
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
const postOrgWeb3 = async (inputData: postOrgType): Promise<postOrgReturn> => {
  if (!USE_WEB3 || !web3 || !userContract || !orgContract) return {success: false, orgId:"", errors: ["web3 method called in web2 mode"]};
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
  if (!USE_WEB3 || !web3 || !userContract) return ["web3 method called in web2 mode"];
  try {
    web3.eth.defaultAccount = await getUserAddress();
    console.log(web3.eth.defaultAccount);
    console.log(web3.eth.defaultAccount);
    await userContract.methods
      .addInfo(web3.eth.defaultAccount, [
        inputData.qrId,
        inputData.birth_day,
        inputData.gender,
        inputData.height,
        inputData.grade,
        inputData.postalCode,
        inputData.race,
        inputData.religion,
        inputData.sexuality,
        inputData.nickname + inputData.avatar_string,
        "",
        inputData.household_income,
        inputData.household_composition,
        inputData.primary_language,
        inputData.secondary_language,
        inputData.heard,
        inputData.contact,
        inputData.city,
        inputData.weight
      ])
      .send({ from: web3.eth.defaultAccount })
      .then((receipt: any) => console.log(receipt));
    return [];
  } catch (e) {
    console.log(e);
    return ["not working"];
  }
};

const postProgram = async (
  id: string,
  inputData: postProgramType,
  questions: Question[]
): Promise<postProgramReturn> => {
  return USE_WEB3
    ? await postEventWeb3(id, inputData, questions)
    : await postProgramWeb2(id, inputData, questions);
};

const postEventWeb3 = async (id: string, inputData: postProgramType, questions: Question[]): Promise<postProgramReturn> => {
  if (!USE_WEB3 || !web3 || !userContract || !eventContract) return {success: false, errors: ["web3 method called in web2 mode"], programId: ""};
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
        [inputData.name,inputData.min_age,inputData.max_age,inputData.start_date,inputData.end_date,inputData.start_time,inputData.end_time,inputData.location,inputData.category,inputData.description],
        // linkedSurvey,
        eventID.toString(),
      )
      .send({ from: web3.eth.defaultAccount });
    console.log(eventCreated);
    return {
      success: true,
      errors: [],
      programId: eventID.toString(),
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      errors: ["Error creating an event"],
      programId:""
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
const web3PostSurvey = async (id: string, inputData: postSurveyType): Promise<postSurveyReturn> => {
  if (!USE_WEB3 || !web3 || !userContract || !surveyContract) return {success: false, errors: ["web3 method called in web2 mode"], surveyId: ""};
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

// const postAnswer = async (
//   questionId: string,
//   answer: string
// ): Promise<string[]> => {
//   return await web2PostAnswer(questionId, answer);
// };

//web3 implementation of posting a survey response
const web3submitSurvey = async (
  surveyID: string,
  answer: string[]
): Promise<string[]> => {
  return ["function not implemented"];
};

export { submitSurvey, postSurvey, postUser, postProgram, postOrg };