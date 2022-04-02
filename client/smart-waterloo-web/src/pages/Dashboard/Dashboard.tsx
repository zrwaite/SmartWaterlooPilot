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
import { defaultUserData} from "../../data/Users";
import { defaultEventsData } from "../../data/Events";
import {getEventsData, getBasicUserData, getSurveysData} from "../../data/getData"
import Settings from "../../components/Settings";
import { defaultSurveysData, defaultSurveysState } from "../../data/Surveys";



const Dashboard = (props: {org: boolean}) => {
	let {mobile} = useContext(MobileContext);
	let {address} = useContext(AddressContext);
	let {id} = useContext(IdContext);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const cookies = new Cookies();
	cookies.set("back", "/dashboard/user");
	const [userData, setUserData] = useState(defaultUserData);
	const getSetUserData = async () => {
		let {success, response} = await getBasicUserData();
		if (!success) alert(JSON.stringify(response));	
		else setUserData(response);
	}
	const [eventsData, setEventData] = useState(defaultEventsData);
	const getSetEventsData = async () => {
		let {success, events, errors} = await getEventsData();
		if (!success) alert(JSON.stringify(errors));
		else setEventData({events: events, eventsDataSet: true })
	}
	const [surveysData, setSurveyData] = useState(defaultSurveysState);
	const getSetSurveysData = async () => {
		let {success, surveys, errors} = await getSurveysData();
		if (!success) alert(JSON.stringify(errors));
		else setSurveyData({surveys: surveys, surveysDataSet: true })
	}
	const [dataCalled, setDataCalled] = useState(false);
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
						<img className="avatarProfile" src={`https://avatars.dicebear.com/api/bottts/${userData.avatarString}.svg`} alt="avatarImage"/>
						<h5>{userData.nickname}</h5>
					</header>	
				):<Sidebar {...userData} openSettings={() => setSettingsOpen(true)} page="dashboard"/>}
				<div className={"besideAside"}> 
					<div className={mobile?"dashboardFlexContainer":"dashboardGridContainer"}> 
						{props.org?null:<DashboardPreview {...userData} org={props.org} {...eventsData} {...surveysData} name="upcoming"/>}
						<DashboardPreview {...userData} org={props.org} {...eventsData} {...surveysData} name="data"/>
						<DashboardPreview {...userData} org={props.org} {...eventsData} {...surveysData} name="events"/>
						<DashboardPreview {...userData} org={props.org} {...eventsData} {...surveysData} name="surveys"/>
					</div>
				</div>
			</div>
		</>
    );
}

export default Dashboard;