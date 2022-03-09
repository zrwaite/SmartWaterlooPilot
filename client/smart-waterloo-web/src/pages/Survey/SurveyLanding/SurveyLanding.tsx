import "./SurveyLanding.css";
type SurveyLandingProps = {
	setParentProgress: (arg0: boolean) => void;
}
const SurveyLanding = (props: SurveyLandingProps) => {
	return (
		<>
			<p>
				Any information that is required to describe more this particular survey. 
				Details or any information that is required to describe more this survey. 
				Details or any information that is required to describe this survey.
			</p>
			<button onClick={() => props.setParentProgress(true)} className={"blackButton beginSurveyButton"}>Begin Survey</button>
		</>
	)
}
export default SurveyLanding