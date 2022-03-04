// import {Link} from "react-router-dom";
import "./StepBubbles.css";

//Todo change buttons to links
type StepBubblesProps = {
	step:number
}
function StepBubbles(props:StepBubblesProps) {
    return (
		<>
			<section className="progressBubbles">
				<hr className="bubblesLine"/>
				<div className="bubbles">
					<div className="bubbleItem">
						<div className={props.step===1?"bubble":"bubble selectedBubble"}>1</div>
						<p>MetaMask</p>
					</div>
					<div className="bubbleItem">
						<div className={props.step===2?"bubble":"bubble selectedBubble"}>2</div>
						<p>Profile</p>
					</div>
					<div className="bubbleItem">
						<div className={props.step===3||props.step===4?"bubble":"bubble selectedBubble"}>3</div>
						<p>Avatar</p>
					</div>
				</div>
			</section>
		</>
    );
}

export default StepBubbles;