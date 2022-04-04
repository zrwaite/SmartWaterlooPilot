import "./SurveyLanding.css";
type SurveyLandingProps = {
	setParentProgress: (arg0: boolean) => void;
	description: string;
	org: boolean;
	owner: boolean;
	completed: boolean;
	set: boolean;
}
const SurveyLanding = (props: SurveyLandingProps) => {
	return (
		<>
			<p>{props.description}</p>
			{
				props.set&&(
					props.org?(
						props.owner&&
						<button onClick={() => props.setParentProgress(true)} className={"blackButton beginSurveyButton"}>{props.owner?"View Results":"Begin Survey"}</button>
					):(
						props.completed?(
							<div className={"completedSurveyBubble"}>
								<p>Complete</p>
							</div>
						):(
							<button onClick={() => props.setParentProgress(true)} className={"blackButton beginSurveyButton"}>{props.owner?"View Results":"Begin Survey"}</button>
						)
					)
				)
			}
		</>
	)
}
export default SurveyLanding