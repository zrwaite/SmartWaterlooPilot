// import {Link} from "react-router-dom";
import "./Dashboard.css";

//Todo change buttons to links
// import settingsIcon from "../../images/settings.svg";
import cookies from "../../modules/cookies";
import DashboardPreview from "./DashboardPreview";
import {useContext} from "react";
import {MobileContext} from "../../App";
import { useParams } from "react-router-dom";
// import NotFound from "../NotFound";
import {AccountChildProps} from "../AccountParent"
const Dashboard = (props: AccountChildProps) => {
	let {mobile} = useContext(MobileContext);
	const { orgId } = useParams();
	cookies.set("back", `/dashboard/${props.org?`org/${orgId}`:"user"}`);
    return (
		<>
			{mobile&&(
				<header className="center">
					<h4>Dashboard 📌</h4>
					<img className="avatarProfile" src={`https://avatars.dicebear.com/api/bottts/${props.accountData.account.avatar_string}.svg`} alt="avatarImage"/>
					<h5>{props.accountData.account.nickname}</h5>
				</header>
			)}
			<div className={"besideAside"}> 
				<div className={mobile?"dashboardFlexContainer":"dashboardGridContainer"}> 
					{/* {props.org?null:<DashboardPreview {...prop.accountData} org={props.org} {...programsData} {...surveysData} name="upcoming"/>} */}
					<DashboardPreview {...props} name="data"/>
					<DashboardPreview {...props} name="programs"/>
					<DashboardPreview {...props} name="surveys"/>
				</div>
			</div>
		</>
    );
}

export default Dashboard;