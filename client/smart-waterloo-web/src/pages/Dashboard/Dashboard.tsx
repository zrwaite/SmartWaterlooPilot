// import {Link} from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../../components/Navbar";

//Todo change buttons to links
import avatarImg from "../../images/avatar.png";
// import settingsIcon from "../../images/settings.svg";
import Cookies from "universal-cookie";
import DashboardPreview from "./DashboardPreview";
import Sidebar from "../../components/Sidebar";
import {useContext} from "react";
import {MobileContext} from "../../App";

const Dashboard = () => {
	let {mobile} = useContext(MobileContext);
	const cookies = new Cookies();
	cookies.set("back", "/dashboard");
    return (
		<>
			<Navbar root={true}/>
			<div className={mobile?"dashboardContainerMobile":"asideContainer"}>
				{mobile?(
					<header className="center">
						<h4>Dashboard 📌</h4>
						<img className="avatarProfile" src={avatarImg} alt="avatarImage"/>
						<h5>Tyragreenex</h5>
					</header>	
				):<Sidebar page="dashboard"/>}
				<div className={"besideAside"}>
					<div className={mobile?"dashboardFlexContainer":"dashboardGridContainer"}> 
						<DashboardPreview name="upcoming"/>
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