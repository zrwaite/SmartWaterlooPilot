import { useNavigate, useParams } from "react-router-dom";
import "./DataPanel.css";
// import {MobileContext} from "../../../App";
// import { useContext } from "react";

interface DataPanelProps {
}


const OrgDataPanel = (props: DataPanelProps) => {
	const {orgId} = useParams();
	// const mobile = useContext(MobileContext);
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate(`/orgdata/${orgId}`)} className={`dataPanel`}>
			<div className="dataPanelInfo">
				<h5>Org Data</h5>
				<p>Your data from the signup process and more</p>
			</div>
			<div className="dataPanelPreview">
				<ul>
					<li>Business Number</li>
					<li>Verified Status</li>
					<li>Number of Members</li>
					<li>...</li>
				</ul>
			</div>
		</div>
	)
}	

export default OrgDataPanel;