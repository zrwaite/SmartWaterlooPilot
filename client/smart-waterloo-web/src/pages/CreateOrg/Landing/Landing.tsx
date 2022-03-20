// import {Link} from "react-router-dom";
import QRCard from "../../../images/cardIcon.png";
import "./Landing.css";

//Todo change buttons to links
type LandingProps = {
	nextStep: () => void;
}
function Landing(props:LandingProps) {
	let redText = {color: "red"};
    return (
		<>
			<div className={"signUpContainer"}>
				<h4>Let's get started ✏️</h4>
				<p>Explanation of what that is. Explanation of what claiming an account means and what can the user do with this account.</p>
				<div className="QRCardContainer">
					<img src={QRCard} alt="QRCard" className="QRCardIcon"/>
					<p style={redText}>Important Notice: In the case of losing your card you will never be able to get your account back.</p>
				</div>
				<button onClick={props.nextStep}className={"blackButton signUpButton"}>Let's get started</button>
			</div>
		</>
    );
}

export default Landing;