import { useNavigate } from "react-router-dom";
import "./DataPanel.css";
// import {MobileContext} from "../../../App";
// import { useContext } from "react";

interface MyDataPanelProps {
}


const UserAnswersPanel = (props: MyDataPanelProps) => {
	// const mobile = useContext(MobileContext);
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate("/useranswers")} className={`dataPanel`}>
			<div className="dataPanelInfo">
				<h5>Your Answers</h5>
			</div>
			<div className="dataPanelPreview">
				<ul>
					<li>Surveys</li>
					<li>Long answer</li>
					<li>Multiple Choice</li>
					<li>...</li>
				</ul>
			</div>
		</div>
	)
}	

export default UserAnswersPanel;