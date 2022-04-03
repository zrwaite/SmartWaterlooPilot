import "./AccountParent.css";
import Navbar from "../../components/Navbar";
import Cookies from "universal-cookie";
import Sidebar from "../../components/Sidebar";
import {useContext, useState} from "react";
import {MobileContext} from "../../App";
import { defaultEventsState } from "../../data/types/events";
import {getUserOrgs, getEventsData, getBasicUserData, getSurveysData, getBasicOrgData} from "../../data/getData"
import Settings from "../../components/Settings";
import { defaultSurveysState } from "../../data/types/surveys";
import { useNavigate, useParams } from "react-router-dom";
import { isSignedIn } from "../../data/account";
import {defaultAccountState} from "../../data/types/account";
import { defaultOrgsState } from "../../data/types/orgs";
import OrgsModal from "../../components/OrgsModal";
import Dashboard from "../Dashboard";
import Events from "../Events";
import MyData from "../MyData";
import Surveys from "../Surveys";

interface AccountParentProps {
	org: boolean;
	page: "dashboard"|"events"|"data"|"surveys"
}

const AccountParent = (props:AccountParentProps) => {
	/* USER STATES */
	const [eventsData, setEventData] = useState(defaultEventsState);
	const [surveysData, setSurveyData] = useState(defaultSurveysState);
	const [orgsData, setOrgsData] = useState(defaultOrgsState);
	const [accountData, setAccountData] = useState(defaultAccountState);

	/* ORG STATES */
	const [orgEventsData, setOrgEventData] = useState(defaultEventsState);
	const [orgSurveysData, setOrgSurveyData] = useState(defaultSurveysState);
	const [verified, setVerified] = useState(false);

	const [dataCalled, setDataCalled] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [orgsModalOpen, setOrgsModalOpen] = useState(false);

	let {mobile} = useContext(MobileContext);
	const { orgId } = useParams();
	const navigate = useNavigate();

	const cookies = new Cookies();

	if (!isSignedIn()) {
		window.location.href= "/";
		navigate("/"); //navigate wasn't working, so i did it the old fashioned way
		return <></>;
	}

	/* USER FUNCTIONS */
	const getSetUserData = async () => {
		let {success, userData, errors} = await getBasicUserData();
		if (!success) alert(JSON.stringify(errors));	
		else if ('nickname' in userData) setAccountData({account: userData, set: true});
		else console.error("invalid userData response");
	}
	const getSetEventsData = async () => {
		let {success, events, errors} = await getEventsData();
		if (!success) alert(JSON.stringify(errors));
		else setEventData({events: events, set: true })
	}
	const getSetSurveysData = async () => {
		let {success, surveys, errors} = await getSurveysData();
		if (!success) alert(JSON.stringify(errors));
		else setSurveyData({surveys: surveys, set: true })
	}
	const getSetOrgsData = async () => {
		let {success, orgs, errors} = await getUserOrgs(cookies.get("userId"));
		if (!success) alert(JSON.stringify(errors));
		else setOrgsData({orgs: orgs, set: true })
	}
	/* ORG FUNCTIONS */
	// const getSetOrgData = async () => {
	// 	let {success, org, errors} = await getBasicOrgData(orgId);
	// 	if (!success) alert(JSON.stringify(errors));
	// 	else accountData({org: org, set: true })
	// }
	if (!dataCalled) {
		if (props.org){

		} else {
			getSetEventsData();
			getSetUserData();
			getSetSurveysData();
			getSetOrgsData();
		}
		setDataCalled(true);
	}

	const allDataObj = {
		eventsData: eventsData,
		accountData: accountData,
		surveysData: surveysData,
		orgsData: orgsData,
		org: props.org
	}

	return (
		<>
			<Navbar root={true} org={props.org} orgId={orgId} orgs={orgsData.orgs} signedIn={true}/>
			<Settings open={settingsOpen} closeModal={() => setSettingsOpen(false)}/>
			<OrgsModal orgs={orgsData.orgs} open={orgsModalOpen} closeModal={() => setOrgsModalOpen(false)}/>
			<div className={mobile?"dashboardContainerMobile":"asideContainer"}>
				{mobile ? null : 
				<Sidebar 
					org={props.org} 
					orgId={orgId} 
					orgs={orgsData.orgs} 
					nickname={accountData.account.nickname}
					avatarString={accountData.account.avatarString}
					accountSet={accountData.set} 
					openOrgsModal={() => setOrgsModalOpen(true)} 
					openSettings={() => setSettingsOpen(true)} 
					page={props.page} 
				/>}
				{props.page==="dashboard"&&<Dashboard {...allDataObj}/>}
				{props.page==="events"&&<Events {...allDataObj}/>}
				{props.page==="data"&&<MyData {...allDataObj}/>}
				{props.page==="surveys"&&<Surveys {...allDataObj}/>}
			</div>
		</>
    );
}
export default AccountParent;

interface AccountChildProps {
	eventsData: typeof defaultEventsState,
	surveysData: typeof defaultSurveysState,
	orgsData: typeof defaultOrgsState,
	accountData: typeof defaultAccountState
	org: boolean
}
export type {AccountChildProps}
