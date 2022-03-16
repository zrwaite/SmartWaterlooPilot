// import {Link} from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../../components/Navbar";

//Todo change buttons to links
import avatarImg from "../../images/avatar.png";
// import settingsIcon from "../../images/settings.svg";
import Cookies from "universal-cookie";
import DashboardPreview from "./DashboardPreview";
import Sidebar from "../../components/Sidebar";
import {useContext, useState} from "react";
import {MobileContext, OrgContext, AddressContext, IdContext} from "../../App";
import {exampleUsers, defaultUserData} from "../../data/Users";



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
			set: true,
			nickname: user.nickname,
			avatarString: user.avatarString
		})
	}
	if (!userData.set) getUserData();
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
				):<Sidebar nickname={userData.nickname} avatarString={userData.avatarString} page="dashboard"/>}
				<div className={"besideAside"}>
					<div className={mobile?"dashboardFlexContainer":"dashboardGridContainer"}> 
						{org?null:<DashboardPreview name="upcoming"/>}
						<DashboardPreview name="data"/>
						<DashboardPreview name="events"/>
						<DashboardPreview name="surveys"/>
					</div>
				</div>
			</div>
		</>
    );
}

export default Dashboard;