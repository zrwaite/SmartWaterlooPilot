import { useNavigate } from "react-router-dom";
import "./DataPanel.css";
// import {MobileContext} from "../../../App";
// import { useContext } from "react";

interface DataPanelProps {
	orgId:string|undefined;
}


const OrgEventsPanel = (props: DataPanelProps) => {
	// const mobile = useContext(MobileContext);
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate(`/events/org/${props.orgId}`)} className={`dataPanel`}>
			<div className="dataPanelInfo">
				<h5>Org Events</h5>
				<p>Your events and their signups</p>
			</div>
			<div className="dataPanelPreview">
				<ul>
					<li>Event Data</li>
					<li>Number of attendees</li>
					<li>...</li>
				</ul>
			</div>
		</div>
	)
}	

export default OrgEventsPanel;