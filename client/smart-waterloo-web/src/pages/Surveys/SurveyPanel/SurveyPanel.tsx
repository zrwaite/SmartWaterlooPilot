import { useNavigate } from "react-router-dom";
import "./SurveyPanel.css";
interface SurveyPanelProps {
	id:string,
	name: string,
	numQuestions: number,
	completed: boolean,
	index: number,
	orgId: string|undefined,
	isOrg: boolean;
}

const SurveyPanel = (props: SurveyPanelProps) => {
	const colorDiv = {backgroundColor: "#7DE05A"};
	const greyText = {color: "#848484"};
	const navigate = useNavigate();
	console.log(props.completed);
	return (
		<div onClick={() => navigate(`/survey/${props.id}/${props.isOrg?`org/${props.orgId}`:"user"}`)} className={`surveyPanel ${props.completed?"activeSurveyPanel":""}`}>
			<div className="surveyPanelHeader">
				<div>
					<p style={colorDiv} className={"surveyBubble"}>New</p>
				</div>
				{props.completed?<div style={colorDiv} className={"surveyBubble"}>Complete</div>:<div></div>}
			</div>
			<h6>{props.name}</h6>
			<p style={greyText}>{props.numQuestions} questions</p>
		</div>
	)
}	

export default SurveyPanel;