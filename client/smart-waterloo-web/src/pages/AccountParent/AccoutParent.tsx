import "./AccountParent.css";
import cookies from "../../modules/cookies";
import { useState} from "react";
import { defaultEventsState } from "../../data/types/events";
import {getUserOrgs, getEventsData, getUserData, getSurveysData, getBasicOrgData, getOrgEventsData, getOrgSurveysData} from "../../data/getData"
import Settings from "../../components/Settings";
import { defaultSurveysState } from "../../data/types/surveys";
import { useNavigate, useParams } from "react-router-dom";
import { isSignedIn } from "../../data/account";
import {defaultAccount, defaultAccountState} from "../../data/types/account";
import { defaultOrgsState } from "../../data/types/orgs";
import OrgsModal from "../../components/OrgsModal";
import PrimaryPage from "../PrimaryPage";
import AddOrgMember from "../AddOrgMember";
import EventDetails from "../EventDetails";
import Survey from "../Survey";
import OrgData from "../OrgData";
import UserData from "../UserData";
import UserAnswers from "../UserAnswers";
import UserAccess from "../UserAccess";

interface AccountParentProps {
	org: boolean;
	page: "dashboard"|"events"|"data"|"surveys"|"addorgmember"|"eventdetails"|"survey"|"orgdata"|"userdata"|"useranswers"|"useraccess"
}

const AccountParent = (props:AccountParentProps) => {
	const [prevOrgId, setPrevOrgId] = useState<string|undefined>("");
	const [orgsData, setOrgsData] = useState(defaultOrgsState);
	const [eventsData, setEventData] = useState(defaultEventsState);
	const [surveysData, setSurveyData] = useState(defaultSurveysState);
	const [accountData, setAccountData] = useState(defaultAccountState);
	const [verified, setVerified] = useState(false);

	const [dataCalled, setDataCalled] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [orgsModalOpen, setOrgsModalOpen] = useState(false);
	const { orgId } = useParams();
	const navigate = useNavigate();

	if (!isSignedIn()) {
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
	const getSetEventsData = async () => {
		let {success, events, errors} = await getEventsData();
		if (!success && errors.length) alert(JSON.stringify(errors));
		else setEventData({events: events, set: true })
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
			console.log(Boolean(org.verified));
		}
		else console.error("invalid userData response");
	}
	const getSetOrgEventsData = async () => {
		let {success, events, errors} = await getOrgEventsData(orgId);
		if (!success) alert(JSON.stringify(errors));
		else setEventData({events: events, set: true })
	}
	const getSetOrgSurveysData = async () => {
		let {success, surveys, errors} = await getOrgSurveysData(orgId);
		if (!success) alert(JSON.stringify(errors));
		else setSurveyData({surveys: surveys, set: true })
	}


	if (!dataCalled || prevOrgId!==orgId) {
		getSetOrgsData();
		if (props.org){
			getSetOrgData();
			getSetOrgEventsData();
			getSetOrgSurveysData();
		} else {
			getSetEventsData();
			getSetUserData();
			getSetSurveysData();
		}
		setDataCalled(true);
		setPrevOrgId(orgId);
	}

	const allDataObj = {
		eventsData: eventsData,
		accountData: accountData,
		surveysData: surveysData,
		orgsData: orgsData,
		org: props.org,
		orgId: orgId,
		verified: verified,
		openSettings: () => setSettingsOpen(true),
		openOrgsModal: () => setOrgsModalOpen(true),
		page: props.page
	}

	return (
		<>
			<Settings org={props.org} orgId={orgId} open={settingsOpen} closeModal={() => setSettingsOpen(false)}/>
			<OrgsModal org={props.org&&orgId?orgId:false} orgs={orgsData.orgs} open={orgsModalOpen} closeModal={() => setOrgsModalOpen(false)}/>
			{props.page==="dashboard"&&<PrimaryPage {...allDataObj} page={"dashboard"}/>}
			{props.page==="events"&&<PrimaryPage {...allDataObj} page={"events"}/>}
			{props.page==="data"&&<PrimaryPage {...allDataObj} page={"data"}/>}
			{props.page==="surveys"&&<PrimaryPage {...allDataObj} page={"surveys"}/>}
			{props.page==="addorgmember"&&<AddOrgMember {...allDataObj}/>}
			{props.page==="eventdetails"&&<EventDetails {...allDataObj}/>}
			{props.page==="survey"&&<Survey {...allDataObj}/>}
			{props.page==="orgdata"&&<OrgData {...allDataObj}/>}
			{props.page==="userdata"&&<UserData {...allDataObj}/>}
			{props.page==="useranswers"&&<UserAnswers {...allDataObj}/>}
			{props.page==="useraccess"&&<UserAccess {...allDataObj}/>}
			
		</>
    );
}
export default AccountParent;

interface AccountChildProps {
	openSettings: () => void;
	openOrgsModal: () => void;
	eventsData: typeof defaultEventsState,
	surveysData: typeof defaultSurveysState,
	orgsData: typeof defaultOrgsState,
	accountData: typeof defaultAccountState
	org: boolean,
	orgId: string|undefined,
	verified: boolean
}
export type {AccountChildProps}

