import { useNavigate } from "react-router-dom";
import { AccountChildProps } from "../../AccountParent";
import "./DataPanel.css";
// import {MobileContext} from "../../../App";
// import { useContext } from "react";



const UserAccessPanel = (props:AccountChildProps) => {
	// const mobile = useContext(MobileContext);
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate("/useraccess")} className={`dataPanel`}>
			<div className="dataPanelInfo">
				<h5>Who has Access to Your Data</h5>
				<p>What orgs have you given your data to?</p>
			</div>
			<div className="dataPanelPreview">
				<ul>
					{props.accountData.account.orgs.map((org, i) => {
						return (i<4)?<li key={i}>{org}</li>:null;
					})}
				</ul>
			</div>
		</div>
	)
}	

export default UserAccessPanel;