// import {Link} from "react-router-dom";
import "./Dashboard.css";

//Todo change buttons to links
// import settingsIcon from "../../images/settings.svg";
import Cookies from "universal-cookie";
import DashboardPreview from "./DashboardPreview";
import {useContext} from "react";
import {MobileContext} from "../../App";
import { useParams } from "react-router-dom";
// import NotFound from "../NotFound";
import {AccountChildProps} from "../AccountParent"
const Dashboard = (props: AccountChildProps) => {
	let {mobile} = useContext(MobileContext);
	const { orgId } = useParams();
	const cookies = new Cookies();
	cookies.set("back", `/dashboard/${props.org?`org/${orgId}`:"user"}`);
    return (
		<>
			{mobile&&(
				<header className="center">
					<h4>Dashboard 📌</h4>
					<img className="avatarProfile" src={`https://avatars.dicebear.com/api/bottts/${props.accountData.avatarString}.svg`} alt="avatarImage"/>
					<h5>{props.accountData.nickname}</h5>
				</header>
			)}
			<div className={"besideAside"}> 
				<div className={mobile?"dashboardFlexContainer":"dashboardGridContainer"}> 
					{/* {props.org?null:<DashboardPreview {...prop.accountData} org={props.org} {...eventsData} {...surveysData} name="upcoming"/>} */}
					<DashboardPreview orgId={orgId} {...props.accountData} org={props.org} {...props.eventsData} {...props.surveysData} name="data"/>
					<DashboardPreview orgId={orgId} {...props.accountData} org={props.org} {...props.eventsData} {...props.surveysData} name="events"/>
					<DashboardPreview orgId={orgId} {...props.accountData} org={props.org} {...props.eventsData} {...props.surveysData} name="surveys"/>
				</div>
			</div>
		</>
    );
}

export default Dashboard;