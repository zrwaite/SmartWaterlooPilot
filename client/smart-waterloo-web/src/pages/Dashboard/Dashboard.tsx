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
	const dashboardPreviewData = {
		...props.accountData,
		...props.eventsData,
		...props.surveysData, 
		eventsSet:props.eventsData.set,
		surveysSet:props.surveysData.set,
		org:props.org ,
		orgId:orgId,
		verified: props.verified,
	}
    return (
		<>
			{mobile&&(
				<header className="center">
					<h4>Dashboard 📌</h4>
					<img className="avatarProfile" src={`https://avatars.dicebear.com/api/bottts/${props.accountData.account.avatarString}.svg`} alt="avatarImage"/>
					<h5>{props.accountData.account.nickname}</h5>
				</header>
			)}
			<div className={"besideAside"}> 
				<div className={mobile?"dashboardFlexContainer":"dashboardGridContainer"}> 
					{/* {props.org?null:<DashboardPreview {...prop.accountData} org={props.org} {...eventsData} {...surveysData} name="upcoming"/>} */}
					<DashboardPreview {...dashboardPreviewData} name="data"/>
					<DashboardPreview {...dashboardPreviewData} name="events"/>
					<DashboardPreview {...dashboardPreviewData} name="surveys"/>
				</div>
			</div>
		</>
    );
}

export default Dashboard;