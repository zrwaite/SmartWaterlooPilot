import { defaultProgram } from "./types/programs";
import { defaultAnswer, defaultSurvey } from "./types/surveys";
import Web3 from "web3";
import {
  USE_WEB3,
  userContract,
  orgContract,
  responseContract,
  eventContract,
  surveyContract,
} from "./dataConstants";

import { defaultAccount, userInfo } from "./types/account";
import {
  web2GetAnswersData,
  web2GetUserOrgs,
  web2GetOrgSurveysData,
  web2GetOrgProgramsData,
  web2GetUserData,
  web2GetBasicOrgData,
  web2GetProgramsData,
  web2GetSurveysData,
  web2GetQuestionsAndAnswers,
  web2GetOrgsNames
} from "./web2/web2GetData";
import { defaultOrg } from "./types/orgs";
import survey from "../pages/Survey";

const getOrgsNames = async (orgIds: string[]):Promise<{
  success: boolean,
  names: {id: number, nickname: string}[],
  errors: string[],
}> => {
  if (orgIds.length) return USE_WEB3?web3GetOrgsNames(orgIds):web2GetOrgsNames(orgIds);
  else return {success: true, names: [], errors: []};
}

const web3GetOrgsNames = async (orgIds: string[]):Promise<{
  success: boolean,
  names: {id: number, nickname: string}[],
  errors: string[],
}> => {
  return {success: false, names: [], errors: ["function not implemented"]};
}

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

let web3 = new Web3(Web3.givenProvider);
declare var window: any;

//All user questions and responses
const getQuestionsAndAnswers = async (
  answerIds: number[]
): Promise<{
  success: boolean;
  answers: string[];
  questions: string[];
  errors: string[];
}> => {
  return USE_WEB3
    ? await web3GetQuestionsAndAnswers()
    : await web2GetQuestionsAndAnswers(answerIds);
};
const web3GetQuestionsAndAnswers = async (): Promise<{
  success: boolean;
  answers: string[];
  questions: string[];
  errors: string[];
}> => {
  if (!USE_WEB3 || !responseContract || !surveyContract) return {success: false, answers: [], questions: [], errors: ["method called in web2 mode"]}
  const loggedAddress = await getUserAddress();
  const surveyResponses = await responseContract.methods
    .getSurveyResponsesByUser(loggedAddress)
    .call();
  let surveyIDs = surveyResponses[1];
  let answers = surveyResponses[0];
  let questions = [];
  for (let i = 0; i < surveyIDs.length; i++) {
    let survey = await surveyContract.methods
      .getSurveyInfoById(surveyIDs[i].toString())
      .call();
    questions.push(survey[2]);
  }
  console.log(questions + " " + answers);
  return {
    success: true,
    questions: questions,
    answers: answers,
    errors: [],
  };
};

//Basic Initial sign up User Data
const getUserData = async (): Promise<{
  success: boolean;
  userData: typeof defaultAccount | {};
  errors: string[];
}> => {
  return USE_WEB3 ? await web3GetUserData() : await web2GetUserData();
};
const web3GetUserData = async (): Promise<{
  success: boolean;
  userData: typeof defaultAccount | {};
  errors: string[];
}> => {
  if (!USE_WEB3 || !userContract || !eventContract) return {success: false, userData: {}, errors: ["web3 method called in web2 mode"]}
  const loggedAddress = await getUserAddress();
  console.log(loggedAddress);
  let userData = await userContract.methods
    .getInfo(web3.eth.defaultAccount)
    .call();
  console.log(userData);
  if (userData != null) {
    const events = await eventContract.methods
      .getUserEventIDs(web3.eth.defaultAccount)
      .call();
    console.log(events);
    return {
      success: true,
      userData: {
        nickname: userData[9].substring(0, userData[9].length - 8),
        avatar_string: userData[9].substring(userData[9].length - 8),
        birth_day: userData[1].substring(0, 2),
        birth_month: userData[1].substring(2, 4),
        birth_year: userData[1].substring(4),
        gender: userData[2],
        grade: userData[4],
        postal_code: userData[5],
        religion: userData[7],
        sexuality: userData[8],
        race: userData[6],
        household_income: userData[11],
        num_family_members: userData[12],
        primary_language: userData[13],
        secondary_language: userData[14],
        city: userData[17],
        heard: userData[15],
        contact: userData[16],
        height: userData[3],
        weight: userData[18],
        answers: [],
        surveys: [],
        programs: [],
        orgs: [],
      },
      errors: [],
    };
  } else {
    return { success: false, userData: {}, errors: ["Account not found"] };
  }
};

//All surveys
const getSurveysData = async (): Promise<{
  success: boolean;
  surveys: typeof defaultSurvey[];
  errors: string[];
}> => {
  return USE_WEB3 ? await web3GetSurveysData() : await web2GetSurveysData();
};

const web3GetSurveysData = async (): Promise<{
  success: boolean;
  surveys: typeof defaultSurvey[];
  errors: string[];
}> => {
  if (!USE_WEB3 || !userContract || !surveyContract || !orgContract) return {success: false, surveys: [], errors: ["web3 method called in web2 mode"]}

  let surveys: typeof defaultSurvey[] = [];
  let survey: typeof defaultSurvey;
  let numberSurveys = await surveyContract.methods.getNumberofSurveys().call();
  for (let i = 0; i < numberSurveys; i++) {
    let surveyInfo = await surveyContract.methods
      .getSurveyInfoByID(i.toString())
      .call();
    let orgName = await orgContract.methods.getOrgInfo(surveyInfo[0]).call();
    let questions: any[] = surveyInfo[2];
    let surveyResponders = await surveyContract.methods
      .getSurveyResponders(i.toString())
      .call();
    let _userInfo: userInfo;
    let userInfos = [];
    for (let j = 0; j < surveyResponders.length; j++) {
      let member = await userContract.methods
        .getInfo(surveyResponders[j])
        .call();
      _userInfo = {
        birth_day: member[1],
        gender: member[2],
        religion: member[7],
        sexuality: member[8],
        race: member[6],
        grade: member[4],
        postal_code: member[5],
        household_income: member[11],
        household_composition: member[12],
        height: member[3],
        weight: member[18],
        primary_language: member[13],
        secondary_language: member[14],
        city: member[17],
        heard: member[15],
        contact: member[16],
        age: ""
      };
      userInfos.push(_userInfo);
    }
    survey = {
      id: surveyInfo.toString(),
      name: surveyInfo[1],
      org: orgName[2].substring(0, orgName[2].length - 8),
      length: questions.length.toString(),
      description: surveyInfo[3],
      questions: questions,
      user_info: userInfos,
      completed: false,
      feedback: false,
      program_id: null
    };
    surveys.push(survey);
  }
  return { success: true, surveys: surveys, errors: [] };
};

//All events
const getProgramsData = async (): Promise<
  { success: boolean; events: typeof defaultProgram[]; errors: string[] } | any
> => {
  return USE_WEB3 ? await web3GetProgramsData() : await web2GetProgramsData();
};
const web3GetProgramsData = async (): Promise<{
  success: boolean;
  events: typeof defaultProgram[];
  errors: string[];
}> => {
  if (!USE_WEB3 || !eventContract || !orgContract) return {success: false, events: [], errors: ["web3 method called in web2 mode"]}

  const allEvents = await eventContract.methods.getNumberOfEvents().call();
  console.log(allEvents);
  if (allEvents.length === 0) {
    return {
      success: false,
      events: [],
      errors: ["not implemented"],
    };
  } else {
    const events: any[] = [];
    for (let i = 0; i < allEvents.length; i++) {
      let event = await eventContract.methods
        .getEventInfoById(allEvents[i].toString())
        .call();
      let organiser = await eventContract.methods
        .getEventOrganiserByEventId(allEvents[i].toString())
        .call();
      let orgName = await orgContract.methods.getOrgInfo(organiser).call();
      console.log(event);
      let eventFormat = {
        id: allEvents[i].toString(),
        name: event[0],
        org: orgName[2],
        age_range: event[1],
        start_date: event[2],
        end_date: event[3],
        category: event[4],
        signedUp: false,
      };
      events.push(eventFormat);
    }
    return {
      success: true,
      events: events,
      errors: [],
    };
  }
};

//Get all surveys for a specific org
const getOrgSurveysData = async (
  id: string | undefined
): Promise<{
  success: boolean;
  surveys: typeof defaultSurvey[];
  errors: string[];
}> => {
  return USE_WEB3
    ? await web3GetOrgSurveysData(id)
    : await web2GetOrgSurveysData(id);
};

const web3GetOrgSurveysData = async (
  id: string | undefined
): Promise<{
  success: boolean;
  surveys: typeof defaultSurvey[];
  errors: string[];
}> => {
  if (!USE_WEB3 || !userContract || !surveyContract || !orgContract) return {success: false, surveys: [], errors: ["web3 method called in web2 mode"]};
  let surveys: typeof defaultSurvey[] = [];
  let survey: typeof defaultSurvey;
  let numberSurveys = await surveyContract.methods
    .getSurveyIDs(web3.eth.defaultAccount)
    .call();
  for (let i = 0; i < numberSurveys; i++) {
    let surveyInfo = await surveyContract.methods
      .getSurveyInfoByID(i.toString())
      .call();
    let orgName = await orgContract.methods.getOrgInfo(surveyInfo[0]).call();
    let questions: any[] = surveyInfo[2];
    let surveyResponders = await surveyContract.methods
      .getSurveyResponders(i.toString())
      .call();
    let _userInfo: userInfo;
    let userInfos = [];
    for (let j = 0; j < surveyResponders.length; j++) {
      let member = await userContract.methods
        .getInfo(surveyResponders[j])
        .call();
      _userInfo = {
        //update sign up info
        birth_day: member[1],
        gender: member[2],
        religion: member[7],
        sexuality: member[8],
        race: member[6],
        grade: member[4],
        postal_code: member[5],
        household_income: member[11],
        household_composition: member[12],
        height: member[3],
        weight: member[18],
        primary_language: member[13],
        secondary_language: member[14],
        city: member[17],
        heard: member[15],
        contact: member[16],
        age: ""
      };
      userInfos.push(_userInfo);
    }
    survey = {
      id: surveyInfo.toString(),
      name: surveyInfo[1],
      org: orgName[2].substring(0, orgName[2].length - 8),
      length: questions.length.toString(),
      description: surveyInfo[3],
      questions: questions,
      user_info: userInfos,
      completed: false,
      feedback: false,
      program_id: null
    };
    surveys.push(survey);
  }
  return { success: true, surveys: surveys, errors: [] };
};

//All events for a specific org
const getOrgProgramsData = async (
  id: string | undefined
): Promise<
  { success: boolean; events: typeof defaultProgram[]; errors: string[] } | any
> => {
  return USE_WEB3
    ? await web3GetOrgProgramsData(id)
    : await web2GetOrgProgramsData(id);
};

const web3GetOrgProgramsData = async (
  id: string | undefined
): Promise<{
  success: boolean;
  events: typeof defaultProgram[];
  errors: string[];
}> => {
  if (!USE_WEB3 || !eventContract || !orgContract) return {success: false, events: [], errors: ["web3 method called in web2 mode"]};
  const loggedAddress = await getUserAddress();
  web3.eth.defaultAccount = loggedAddress;
  const orgDetails = await orgContract.methods
    .getOrgInfo(web3.eth.defaultAccount)
    .call();
  const allEvents = await eventContract.methods
    .getOrgEventIDs(web3.eth.defaultAccount)
    .call();
  if (allEvents.length == 0) {
    return {
      success: true,
      events: [],
      errors: ["no events yet"],
    };
  } else {
    const events: any[] = [];
    for (let i = 0; i < allEvents.length; i++) {
      let event = await eventContract.methods
        .getEventInfoById(allEvents[i].toString())
        .call();
      console.log(event);
      let eventFormat = {
        id: allEvents[i].toString(),
        name: event[0],
        org: orgDetails[2],
        age_range: event[1],
        start_date: event[2],
        end_date: event[3],
        category: event[4],
        signedUp: false,
      };
      events.push(eventFormat);
    }
    return {
      success: true,
      events: events,
      errors: [],
    };
  }
};

// Orgs a user's involved with
const getUserOrgs = async (
  id: string
): Promise<{
  success: boolean;
  orgs: typeof defaultOrg[];
  errors: string[];
}> => {
  return USE_WEB3 ? await web3GetUserOrgs(id) : await web2GetUserOrgs(id);
};

const web3GetUserOrgs = async (
  id: string
): Promise<{
  success: boolean;
  orgs: typeof defaultOrg[];
  errors: string[];
}> => {
  if (!USE_WEB3 || !userContract || !orgContract) return {success: false, orgs: [], errors: ["web3 method called in web2 mode"]};

  const loggedAddress = await getUserAddress();
  web3.eth.defaultAccount = loggedAddress;
  const userOrg = await orgContract.methods
    .getOrgInfo(web3.eth.defaultAccount)
    .call();
  console.log(userOrg);
  const userData = await userContract.methods
    .getInfo(web3.eth.defaultAccount)
    .call();
  if (userOrg == "" || userOrg == null) {
    return { success: false, orgs: [], errors: ["not implemented"] };
  } else {
    const verify = await orgContract.methods
      .getOrgVerification(web3.eth.defaultAccount)
      .call();
    let member = await userContract.methods
      .getInfo(web3.eth.defaultAccount)
      .call();
    let _userInfo = [
      member[1],
      member[2],
      member[7],
      member[8],
      member[6],
      member[4],
      member[5],
    ];
    const org = {
      nickname: userOrg[2].substring(0, userOrg[2].length - 8),
      business_number: userOrg[1],
      avatar_string: userOrg[2].substring(userOrg[2].length - 8),
      owner_id: parseInt(userData[0]),
      verified: verify,
      id: userOrg[0],
      members: userOrg[3],
      user_info: _userInfo,
    };
    return { success: true, orgs: [org], errors: [] };
  }
};

//All member user info and basic initial data for an org
const getBasicOrgData = async (
  id: string | undefined
): Promise<{
  success: boolean;
  org: typeof defaultOrg | {};
  errors: string[];
}> => {
  return USE_WEB3
    ? await web3GetBasicOrgData(id)
    : await web2GetBasicOrgData(id);
};

const web3GetBasicOrgData = async (
  id: string | undefined
): Promise<{
  success: boolean;
  org: typeof defaultOrg | {};
  errors: string[];
}> => {
  if (!USE_WEB3 || !userContract || !orgContract) return {success: false, org: {}, errors: ["web3 method called in web2 mode"]};
  const loggedAddress = await getUserAddress();
  web3.eth.defaultAccount = loggedAddress;
  const org = await orgContract.methods
    .getOrgInfo(web3.eth.defaultAccount)
    .call();
  let ownerqr = await userContract.methods
    .getInfo(web3.eth.defaultAccount)
    .call();
  let orgId = await orgContract.methods.getTotalOrganisations().call();
  ownerqr = ownerqr[0];
  console.log(org);
  if (org === "" || org === null) {
    return { success: false, org: {}, errors: ["org not found"] };
  }
  const verify = await orgContract.methods
    .getOrgVerification(web3.eth.defaultAccount)
    .call();
  let _userInfo;
  let userInfos: userInfo[] = [];
  for (let i = 0; i < org[3].length; i++) {
    console.log(org[3][i]);
    let member = await userContract.methods.getInfo(org[3][i]).call();
    _userInfo = {
      birth_day: member[1],
      gender: member[2],
      religion: member[7],
      sexuality: member[8],
      race: member[6],
      grade: member[4],
      postal_code: member[5],
      household_income: member[11],
      household_composition: member[12],
      height: member[3],
      weight: member[18],
      primary_language: member[13],
      secondary_language: member[14],
      city: member[17],
      heard: member[15],
      contact: member[16],
      age: ""
    };
    console.log(_userInfo);
    userInfos.push(_userInfo);
  }
  console.log(orgId);
  console.log(userInfos);
  return {
    success: true,
    org: {
      nickname: org[2].substring(0, org[2].length - 8),
      avatar_string: org[2].substring(org[2].length - 8),
      business_number: org[1],
      owner_id: ownerqr,
      verified: verify,
      id: orgId,
      members: org[3],
      user_info: userInfos,
    },
    errors: [],
  };
};
//get survey answers
const getAnswersData = async (
  id: string | undefined
): Promise<{
  success: boolean;
  answers: typeof defaultAnswer[];
  errors: string[];
}> => {
  return USE_WEB3 ? await web3GetAnswersData(id) : await web2GetAnswersData(id);
};

const web3GetAnswersData = async (
  id: string | undefined
): Promise<{
  success: boolean;
  answers: typeof defaultAnswer[];
  errors: string[];
}> => {
  return { success: false, answers: [], errors: ["not implemented"] };
};

export {
  getQuestionsAndAnswers,
  getAnswersData,
  getOrgProgramsData,
  getOrgSurveysData,
  getBasicOrgData,
  getUserOrgs,
  getUserData,
  getProgramsData,
  getSurveysData,
  getOrgsNames
};
