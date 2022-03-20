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
import {getEventsData, getUserData} from "../../data/getData"



const Dashboard = (props: {org: boolean}) => {
	let {mobile} = useContext(MobileContext);
	let {address} = useContext(AddressContext);
	let {id} = useContext(IdContext);
	const cookies = new Cookies();
	cookies.set("back", "/dashboard");
	const [userData, setUserData] = useState(defaultUserData);
	const getSetUserData = async () => {
		let users = await getUserData();
		if (!users) return;
		setUserData(users)
	}
	const [eventsData, setEventData] = useState(defaultEventsData);
	const getSetEventsData = async () => {
		let events = await getEventsData();
		if (!events) return;
		setEventData({events: events, eventsDataSet: true })
	}
	const [dataCalled, setDataCalled] = useState(false);
	if (!dataCalled) {
		getSetEventsData();
		getSetUserData();
		setDataCalled(true);
	}
    return (
		<>
			<Navbar root={true}/>
			<div className={mobile?"dashboardContainerMobile":"asideContainer"}>
				{mobile?(
					<header className="center">
						<h4>Dashboard 📌</h4>
						<img className="avatarProfile" src={`https://avatars.dicebear.com/api/bottts/${userData.avatarString}.svg`} alt="avatarImage"/>
						<h5>{userData.nickname}</h5>
					</header>	
				):<Sidebar {...userData} page="dashboard"/>}
				<div className={"besideAside"}>
					<div className={mobile?"dashboardFlexContainer":"dashboardGridContainer"}> 
						{props.org?null:<DashboardPreview {...userData} org={props.org} {...eventsData} name="upcoming"/>}
						<DashboardPreview {...userData} org={props.org} {...eventsData} name="data"/>
						<DashboardPreview {...userData} org={props.org} {...eventsData} name="events"/>
						<DashboardPreview {...userData} org={props.org} {...eventsData} name="surveys"/>
					</div>
				</div>
			</div>
		</>
    );
}

export default Dashboard;