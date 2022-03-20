// import {Link} from "react-router-dom";
import "./StepBubbles.css";

//Todo change buttons to links
type StepBubblesProps = {
	step:number;
	steps: string[]
}
function StepBubbles(props:StepBubblesProps) {
    return (
		<>
			<section className="progressBubbles">
				<hr className="bubblesLine"/>
				<div className="bubbles">
					{props.steps.map((step, i) => {
						return (
							<div className="bubbleItem">
								<div className={props.step===i+1?"bubble":"bubble selectedBubble"}>{i+1}</div>
								<p>{step}</p>
							</div>
						)
					})}
				</div>
			</section>
		</>
    );
}

export default StepBubbles;