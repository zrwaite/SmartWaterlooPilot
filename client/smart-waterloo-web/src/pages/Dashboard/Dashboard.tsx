// import {Link} from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../../components/Navbar";

//Todo change buttons to links
// import settingsIcon from "../../images/settings.svg";
import Cookies from "universal-cookie";
import DashboardPreview from "./DashboardPreview";
import Sidebar from "../../components/Sidebar";
import {useContext, useState} from "react";
import {MobileContext, OrgContext, AddressContext, IdContext} from "../../App";
import {exampleUsers, defaultUserData} from "../../data/Users";
import { exampleEvents, defaultEventsData } from "../../data/Events";



const Dashboard = () => {
	let {mobile} = useContext(MobileContext);
	let {org} = useContext(OrgContext);
	let {address} = useContext(AddressContext);
	let {id} = useContext(IdContext);
	const cookies = new Cookies();
	cookies.set("back", "/dashboard");
	const [userData, setUserData] = useState(defaultUserData);
	const getUserData = async () => {
		await new Promise(resolve => setTimeout(resolve, 1000)); //Just an artificial delay for mock data
		const user = exampleUsers.find(user => user.userId === id);
		if (!user) {
			alert("Invalid user!");
			return;
		}
		setUserData({
			userDataSet: true,
			nickname: user.nickname,
			avatarString: user.avatarString
		})
	}
	const [eventData, setEventData] = useState(defaultEventsData);
	const getEventData = async () => {
		await new Promise(resolve => setTimeout(resolve, 1000)); //Just an artificial delay for mock data
		const events = exampleEvents;
		if (!events) {
			alert("Events not found");
			return;
		}
		setEventData({events: events, eventsDataSet: true })
	}
	const [dataCalled, setDataCalled] = useState(false);
	if (!dataCalled) {
		getUserData();
		getEventData();
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
						{org?null:<DashboardPreview {...userData} {...eventData} name="upcoming"/>}
						<DashboardPreview {...userData} {...eventData} name="data"/>
						<DashboardPreview {...userData} {...eventData} name="events"/>
						<DashboardPreview {...userData} {...eventData} name="surveys"/>
					</div>
				</div>
			</div>
		</>
    );
}

export default Dashboard;