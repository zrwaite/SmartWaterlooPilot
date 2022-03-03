// import {Link} from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../../components/Navbar";

//Todo change buttons to links
import avatarImg from "../../images/avatar.png";
// import settingsIcon from "../../images/settings.svg";
// import Cookies from "universal-cookie";
import EventsPreview from "./EventsPreview";
import MyDataPreview from "./MyDataPreview";
import SurveysPreview from "./SurveysPreview";
import UpcomingPreview from "./UpcomingPreview";
import {useContext} from "react";
import {MobileContext} from "../../App";
const Account = () => {
	let {mobile} = useContext(MobileContext);
	// const cookies = new Cookies();
	// cookies.set("back", "/about");
	// const [cookies, setCookie, removeCookie] = useCookies(['back']);
    return (
		<>
			<Navbar root={true}/>
			<header className="centre">
				<h4>Dashboard 📌</h4>
				<img className="avatarProfile" src={avatarImg} alt="avatarImage"/>
				<h5>Tyragreenex</h5>
			</header>
			{/* //todo base this on mobile */}
			<div className={mobile?"mobileDashboardContainer":"dashboardContainer"}> 
				<UpcomingPreview/>
				<MyDataPreview/>
				<EventsPreview/>
				<SurveysPreview/>
			</div>
		</>
    );
}

export default Account;