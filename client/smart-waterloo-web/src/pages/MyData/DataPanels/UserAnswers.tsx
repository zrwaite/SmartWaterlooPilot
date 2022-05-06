import { useNavigate } from "react-router-dom";
import { looseIncludes } from "../../../modules/other";
import { AccountChildProps } from "../../AccountParent";
import "./DataPanel.css";

const UserAnswersPanel = (props: AccountChildProps) => {
	// const mobile = useContext(MobileContext);
	const navigate = useNavigate();
	let userSurveys = props.surveysData.surveys.filter((survey) => looseIncludes(props.accountData.account.surveys, survey.id))
	console.log(userSurveys);
	return (
		<div onClick={() => navigate("/useranswers")} className={`dataPanel`}>
			<div className="dataPanelInfo">
				<h5>Your Surveys</h5>
			</div>
			<div className="dataPanelPreview">
				<ul>
					{userSurveys.length?
						userSurveys.map((survey, i) => {
							return (i<4)?<li key={i}>{survey.name}</li>:null;
						}):(<>
							<li>Questions</li>
							<li>Answers</li>
						</>)
					}
				</ul>
			</div>
		</div>
	)
}	

export default UserAnswersPanel;