import { useNavigate } from "react-router-dom";
import "./SurveyPanel.css";
interface SurveyPanelProps {
	title: string,
	organization: string,
	length: string,
	completed: boolean,
	index: number,
}

const SurveyPanel = (props: SurveyPanelProps) => {
	const colorDiv = {backgroundColor: "#7DE05A"};
	const greyText = {color: "#848484"};
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate(`/survey/${props.index}`)} className={`surveyPanel ${props.completed?"activeSurveyPanel":""}`}>
			<div className="surveyPanelHeader">
				<div>
					<p style={colorDiv} className={"surveyBubble"}>New</p>
				</div>
				{props.completed?<div style={colorDiv} className={"surveyBubble"}>Complete</div>:<div></div>}
			</div>
			<h6>{props.title}</h6>
			<p>{props.organization}</p>
			<p style={greyText}>{props.length} to fill</p>
		</div>
	)
}	

export default SurveyPanel;