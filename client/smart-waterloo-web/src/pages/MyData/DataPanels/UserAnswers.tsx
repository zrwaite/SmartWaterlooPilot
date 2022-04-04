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
				<h5>User Answers</h5>
				<p>Your answers to survey questions</p>
			</div>
			<div className="dataPanelPreview">
				<ul>
					<li>Short answers</li>
					<li>Long answer</li>
					<li>Multiple Choice</li>
					<li>...</li>
				</ul>
			</div>
		</div>
	)
}	

export default UserAnswersPanel;