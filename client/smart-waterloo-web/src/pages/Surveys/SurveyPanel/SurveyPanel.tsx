import "./SurveyPanel.css";
interface SurveyPanelProps {
	title: string,
	organization: string,
	length: string,
	completed: boolean
}

const SurveyPanel = (props: SurveyPanelProps) => {
	return (
		<div className={`surveyPanel ${props.completed?"activeSurveyPanel":""}`}>
			<div className="surveyPanelHeader">
				<div>
					<p>New</p>
				</div>
				{props.completed?<div>Complete</div>:<div></div>}
			</div>
			<h6>{props.title}</h6>
			<p>{props.organization}</p>
			<p>{props.length} to fill</p>
		</div>
	)
}	

export default SurveyPanel;