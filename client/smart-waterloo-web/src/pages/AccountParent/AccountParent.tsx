import "./AccountParent.css";
import cookies from "../../modules/cookies";
import { useState} from "react";
import { defaultProgramsState } from "../../data/types/programs";
import {getUserOrgs, getProgramsData, getUserData, getSurveysData, getBasicOrgData, getOrgProgramsData, getOrgSurveysData, getOrgsNames} from "../../data/getData"
import Settings from "../../components/Settings";
import { defaultSurveysState } from "../../data/types/surveys";
import { useNavigate, useParams } from "react-router-dom";
import { isSignedIn } from "../../data/account";
import {defaultAccount, defaultAccountState} from "../../data/types/account";
import { defaultOrgNamesState, defaultOrgsState } from "../../data/types/orgs";
import OrgsModal from "../../components/OrgsModal";
import PrimaryPage from "../PrimaryPage";
import AddOrgMember from "../AddOrgMember";
import ProgramDetails from "../ProgramDetails";
import Survey from "../Survey";
import OrgData from "../OrgData";
import UserData from "../UserData";
import UserAnswers from "../UserAnswers";
import UserAccess from "../UserAccess";
import CreateProgram from "../CreateProgram";
import CreateSurvey from "../CreateSurvey";
import { USE_WEB3 } from "../../data/dataConstants";
import { getMySurveys } from "../../data/parse/parseMySurveys";
import { parseCompletedSurveys, parseSignedUpPrograms } from "../../data/parse/parseDone";
import { sortProgramsByDate } from "../../data/parse/sorting";
import { parseAge, parseUserInfo } from "../../data/parse/parseUser";

interface AccountParentProps {
	feedback?: boolean;
	org: boolean;
	page: "createprogram"|"createsurvey"|"dashboard"|"programs"|"data"|"surveys"|"addorgmember"|"programdetails"|"survey"|"orgdata"|"userdata"|"useranswers"|"useraccess"
}

const AccountParent = (props:AccountParentProps) => {
	const [prevOrgId, setPrevOrgId] = useState<string|undefined>("");
	const [orgsData, setOrgsData] = useState(defaultOrgsState);
	const [programsData, setProgramData] = useState(defaultProgramsState);
	const [surveysData, setSurveyData] = useState(defaultSurveysState);
	const [mySurveysData, setMySurveysData] = useState(defaultSurveysState);
	const [accountData, setAccountData] = useState(defaultAccountState);
	const [orgNames, setOrgNames] = useState(defaultOrgNamesState);
	const [verified, setVerified] = useState(false);
	const [doneParsing, setDoneParsing] = useState(false);

	const [dataCalled, setDataCalled] = useState(false);
	const [dataCalled2, setDataCalled2] = useState(false);
	const [dataParsed, setDataParsed] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [orgsModalOpen, setOrgsModalOpen] = useState(false);
	const { orgId } = useParams();
	const navigate = useNavigate();

	if (!USE_WEB3 && !isSignedIn()) {
		window.location.href= "/";
		navigate("/"); //navigate wasn't working, so i did it the old fashioned way
		return <></>;
	}


	const getSetOrgsData = async () => {
		let {success, orgs, errors} = await getUserOrgs(cookies.get("userId"));
		if (!success) {
			if (errors.length) alert(JSON.stringify(errors));
		}
		else setOrgsData({orgs: orgs, set: true })
	}

	/* USER FUNCTIONS */
	const getSetUserData = async () => {
		let {success, userData, errors} = await getUserData();
		if (!success && errors.length) alert(JSON.stringify(errors));	
		else if ('nickname' in userData) setAccountData({account: userData, set: true});
		else console.error("invalid userData response");
	}
	const getSetProgramsData = async () => {
		let {success, programs, errors} = await getProgramsData();
		if (!success && errors.length) alert(JSON.stringify(errors));
		else setProgramData({programs: programs, set: true })
	}
	const getSetSurveysData = async () => {
		let {success, surveys, errors} = await getSurveysData();
		if (!success && errors.length) alert(JSON.stringify(errors));
		else setSurveyData({surveys: surveys, set: true })
	}
	/* ORG FUNCTIONS */
	const getSetOrgData = async () => {
		let {success, org, errors} = await getBasicOrgData(orgId);
		if (!success) {
			alert(JSON.stringify(errors));
			console.error("GersetOrgData failure");
		}
		else if ('nickname' in org) {
			setAccountData({
				account: {
					...defaultAccount,
					avatar_string: org.avatar_string, 
					nickname: org.nickname,
				}, 
				set: true
			});
			setVerified(Boolean(org.verified));
		}
		else console.error("invalid userData response");
	}
	const getSetOrgProgramsData = async () => {
		let {success, programs, errors} = await getOrgProgramsData(orgId);
		if (!success) alert(JSON.stringify(errors));
		else setProgramData({programs: programs, set: true })
	}
	const getSetOrgSurveysData = async () => {
		let {success, surveys, errors} = await getOrgSurveysData(orgId);
		if (!success) alert(JSON.stringify(errors));
		else setSurveyData({surveys: surveys, set: true })
	}

	const getSetOrgNames = async (orgIds:string[]) => {
		let {success, names, errors} = await getOrgsNames(orgIds);
		if (!success) {
			alert(JSON.stringify(errors));
			console.log("Not successful getting org names");
		}
		else setOrgNames({names: names, set: true })
	}

	const parseData = async () => {
		parseCompletedSurveys(surveysData.surveys, accountData.account.surveys);
		parseSignedUpPrograms(programsData.programs, accountData.account.programs);
	}


	if (!dataCalled || prevOrgId!==orgId) {
		getSetOrgsData();
		if (props.org){
			getSetOrgData();
			getSetOrgProgramsData();
			getSetOrgSurveysData();
		} else {
			getSetProgramsData();
			getSetUserData();
			getSetSurveysData();
		}
		setDataCalled(true);
		setPrevOrgId(orgId);
	}

	if (programsData.set && !dataCalled2) {
		let orgIds:string[] = [];
		programsData.programs.forEach(program => orgIds.push(program.org));
		getSetOrgNames(orgIds);
		setDataCalled2(true);
	}

	if (accountData.set && surveysData.set && programsData.set && !dataParsed) {
		sortProgramsByDate(programsData.programs);
		parseAge(accountData.account);
		if (props.org) {
			[...programsData.programs, ...surveysData.surveys].forEach((infoParent) => {
				console.log(infoParent.user_info);
				parseUserInfo(infoParent.user_info);
			})
		}
		parseData();
		setDataParsed(true);
		let programOrgIds:string[] = [];
		programsData.programs.forEach(program => {
			if (program.signedUp) programOrgIds.push(program.org)
		});
		let signedUpProgramIds =  programsData.programs.filter(program => program.signedUp).map(program => program.id);
		setMySurveysData({set: true, surveys: getMySurveys(surveysData.surveys, programOrgIds, signedUpProgramIds)});
		setDoneParsing(true);
	}

	const allDataObj = {
		programsData,
		accountData,
		surveysData,
		mySurveysData,
		orgsData,
		org: props.org,
		orgId,
		verified,
		openSettings: () => setSettingsOpen(true),
		openOrgsModal: () => setOrgsModalOpen(true),
		orgNames,
		page: props.page,
		doneParsing
	}

	return (
		<>
			<Settings org={props.org} orgId={orgId} open={settingsOpen} closeModal={() => setSettingsOpen(false)}/>
			<OrgsModal org={props.org&&orgId?orgId:false} orgs={orgsData.orgs} open={orgsModalOpen} closeModal={() => setOrgsModalOpen(false)}/>
			{props.page==="dashboard"&&<PrimaryPage {...allDataObj} page={"dashboard"}/>}
			{props.page==="programs"&&<PrimaryPage {...allDataObj} page={"programs"}/>}
			{props.page==="data"&&<PrimaryPage {...allDataObj} page={"data"}/>}
			{props.page==="surveys"&&<PrimaryPage {...allDataObj} page={"surveys"}/>}
			{props.page==="addorgmember"&&<AddOrgMember {...allDataObj}/>}
			{props.page==="programdetails"&&<ProgramDetails {...allDataObj}/>}
			{props.page==="survey"&&<Survey {...allDataObj}/>}
			{props.page==="orgdata"&&<OrgData {...allDataObj}/>}
			{props.page==="userdata"&&<UserData {...allDataObj}/>}
			{props.page==="useranswers"&&<UserAnswers {...allDataObj}/>}
			{props.page==="useraccess"&&<UserAccess {...allDataObj}/>}
			{props.page==="createprogram"&&<CreateProgram {...allDataObj}/>}
			{props.page==="createsurvey"&&<CreateSurvey feedback={props.feedback?true:false} {...allDataObj}/>}
		</>
    );
}
export default AccountParent;

interface AccountChildProps {
	openSettings: () => void;
	openOrgsModal: () => void;
	programsData: typeof defaultProgramsState,
	mySurveysData: typeof defaultSurveysState,
	surveysData: typeof defaultSurveysState,
	orgsData: typeof defaultOrgsState,
	accountData: typeof defaultAccountState,
	orgNames: typeof defaultOrgNamesState,
	org: boolean,
	orgId: string|undefined,
	verified: boolean,
	doneParsing: boolean
}
export type {AccountChildProps}

