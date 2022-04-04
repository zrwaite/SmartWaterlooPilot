import "./SurveyLanding.css";
type SurveyLandingProps = {
	setParentProgress: (arg0: boolean) => void;
	description: string;
}
const SurveyLanding = (props: SurveyLandingProps) => {
	return (
		<>
			<p>{props.description}</p>
			<button onClick={() => props.setParentProgress(true)} className={"blackButton beginSurveyButton"}>Begin Survey</button>
		</>
	)
}
export default SurveyLanding