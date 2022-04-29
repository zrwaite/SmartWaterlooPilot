import { useNavigate } from "react-router-dom";
import "./DataPanel.css";

const UserAnswersPanel = () => {
	// const mobile = useContext(MobileContext);
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate("/useranswers")} className={`dataPanel`}>
			<div className="dataPanelInfo">
				<h5>Your Surveys</h5>
			</div>
			<div className="dataPanelPreview">
				<ul>
					<li>Your Answers</li>
				</ul>
			</div>
		</div>
	)
}	

export default UserAnswersPanel;