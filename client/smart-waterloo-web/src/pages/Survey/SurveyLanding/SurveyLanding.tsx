import "./SurveyLanding.css";
type SurveyLandingProps = {
	setParentProgress: (arg0: boolean) => void;
	description: string;
	org: boolean;
	owner: boolean;
}
const SurveyLanding = (props: SurveyLandingProps) => {
	return (
		<>
			<p>{props.description}</p>
			{((props.org&&props.owner)||(!props.org))
				&&<button onClick={() => props.setParentProgress(true)} 
				className={"blackButton beginSurveyButton"}>
					{props.owner?"View Results":"Begin Survey"}
				</button>}
		</>
	)
}
export default SurveyLanding