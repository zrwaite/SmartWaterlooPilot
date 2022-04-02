// import {Link} from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../../components/Navbar";

//Todo change buttons to links
// import settingsIcon from "../../images/settings.svg";
import Cookies from "universal-cookie";
import DashboardPreview from "./DashboardPreview";
import Sidebar from "../../components/Sidebar";
import {useContext, useState} from "react";
import {MobileContext, AddressContext, IdContext} from "../../App";
import { defaultEventsData } from "../../data/Events";
import {getEventsData, getBasicUserData, getSurveysData} from "../../data/getData"
import Settings from "../../components/Settings";
import { defaultSurveysData, defaultSurveysState } from "../../data/Surveys";
import { useNavigate, useParams } from "react-router-dom";
import { isSignedIn, defaultAccountData } from "../../data/account";
import NotFound from "../NotFound";



const Dashboard = (props: {org: boolean}) => {
	const [eventsData, setEventData] = useState(defaultEventsData);
	const [surveysData, setSurveyData] = useState(defaultSurveysState);
	const [dataCalled, setDataCalled] = useState(false);
	const [accountData, setAccountData] = useState(defaultAccountData);
	const [settingsOpen, setSettingsOpen] = useState(false);
	let {mobile} = useContext(MobileContext);
	let {address} = useContext(AddressContext);
	let {id} = useContext(IdContext);
	const { orgId } = useParams();
	const navigate = useNavigate();
	if (!isSignedIn()) {
		window.location.href= "/";
		navigate("/"); //navigate wasn't working, so i did it the old fashioned way
		return <></>;
	}
	
	const cookies = new Cookies();
	cookies.set("back", "/dashboard/user");
	const getSetUserData = async () => {
		let {success, response} = await getBasicUserData();
		if (!success) alert(JSON.stringify(response));	
		else setAccountData(response);
	}
	const getSetEventsData = async () => {
		let {success, events, errors} = await getEventsData();
		if (!success) alert(JSON.stringify(errors));
		else setEventData({events: events, eventsDataSet: true })
	}
	const getSetSurveysData = async () => {
		let {success, surveys, errors} = await getSurveysData();
		if (!success) alert(JSON.stringify(errors));
		else setSurveyData({surveys: surveys, surveysDataSet: true })
	}
	if (!dataCalled) {
		getSetEventsData();
		getSetUserData();
		getSetSurveysData();
		setDataCalled(true);
	}
    return (
		<>
			<Navbar root={true}/>
			<Settings open={settingsOpen} closeModal={() => setSettingsOpen(false)}/>
			<div className={mobile?"dashboardContainerMobile":"asideContainer"}>
				{mobile?(
					<header className="center">
						<h4>Dashboard 📌</h4>
						<img className="avatarProfile" src={`https://avatars.dicebear.com/api/bottts/${accountData.avatarString}.svg`} alt="avatarImage"/>
						<h5>{accountData.nickname}</h5>
					</header>
				):<Sidebar {...accountData} openSettings={() => setSettingsOpen(true)} page="dashboard"/>}
				<div className={"besideAside"}> 
					<div className={mobile?"dashboardFlexContainer":"dashboardGridContainer"}> 
						{/* {props.org?null:<DashboardPreview {...accountData} org={props.org} {...eventsData} {...surveysData} name="upcoming"/>} */}
						<DashboardPreview {...accountData} org={props.org} {...eventsData} {...surveysData} name="data"/>
						<DashboardPreview {...accountData} org={props.org} {...eventsData} {...surveysData} name="events"/>
						<DashboardPreview {...accountData} org={props.org} {...eventsData} {...surveysData} name="surveys"/>
					</div>
				</div>
			</div>
		</>
    );
}

export default Dashboard;