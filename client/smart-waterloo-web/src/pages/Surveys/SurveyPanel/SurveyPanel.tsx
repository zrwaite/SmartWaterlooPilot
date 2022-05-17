import { useNavigate } from "react-router-dom";
import { defaultSurvey } from "../../../data/types/surveys";
import { AccountChildProps } from "../../AccountParent";
import "./SurveyPanel.css";
// interface SurveyPanelProps {
// 	id:string,
// 	name: string,
// 	numQuestions: number,
// 	completed: boolean,
// 	index: number,
// 	orgId: string|undefined,
// 	isOrg: boolean;
// 	orgNames: string[]
// }

interface SurveyPanelProps extends AccountChildProps{
	survey: typeof defaultSurvey
	orgId: string|undefined;
}

const SurveyPanel = (props: SurveyPanelProps) => {
	const colorDiv = {backgroundColor: "#7DE05A"};
	const greyText = {color: "#848484"};
	const navigate = useNavigate();
	const orgName = props.orgNames.set?( props.orgNames.names.find(org => org.id.toString() == props.survey.org)?.nickname ||null ):null;
	return (
		<div onClick={() => navigate(`/survey/${props.survey.id}/${props.org?`org/${props.orgId}`:"user"}`)} className={`surveyPanel ${props.survey.completed?"activeSurveyPanel":""}`}>
			<div className="surveyPanelHeader">
				<div className="horizontal">
					<p>{orgName}</p>
					{/* <p style={colorDiv} className={"surveyBubble"}>New</p> */}
				</div>
				{props.survey.completed?<div style={colorDiv} className={"surveyBubble"}>Complete</div>:<div></div>}
			</div>
			<h6>{props.survey.name}</h6>
			<p style={greyText}>{props.survey.questions.length} questions</p>
		</div>
	)
}	

export default SurveyPanel;