import { useNavigate } from "react-router-dom";
import "./DataPanel.css";
// import {MobileContext} from "../../../App";
// import { useContext } from "react";

interface DataPanelProps {
	orgId:string|undefined;
}


const OrgProgramsPanel = (props: DataPanelProps) => {
	// const mobile = useContext(MobileContext);
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate(`/programs/org/${props.orgId}`)} className={`dataPanel`}>
			<div className="dataPanelInfo">
				<h5>Org Programs</h5>
				<p>Your programs and their signups</p>
			</div>
			<div className="dataPanelPreview">
				<ul>
					<li>Program Data</li>
					<li>Number of attendees</li>
					<li>...</li>
				</ul>
			</div>
		</div>
	)
}	

export default OrgProgramsPanel;