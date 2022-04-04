import { useNavigate } from "react-router-dom";
import "./DataPanel.css";
// import {MobileContext} from "../../../App";
// import { useContext } from "react";

interface DataPanelProps {
	orgId:string|undefined;
}


const OrgSurveysPanel = (props: DataPanelProps) => {
	// const mobile = useContext(MobileContext);
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate(`/surveys/org/${props.orgId}`)} className={`dataPanel`}>
			<div className="dataPanelInfo">
				<h5>Org Surveys</h5>
				<p>Your surveys and their responses</p>
			</div>
			<div className="dataPanelPreview">
				<ul>
					<li>Survey Data</li>
					<li>Number of responses</li>
					<li>Individual answers</li>
					<li>...</li>
				</ul>
			</div>
		</div>
	)
}	

export default OrgSurveysPanel;