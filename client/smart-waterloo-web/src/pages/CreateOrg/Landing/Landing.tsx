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
				<h4>Create an Organization ✏️</h4>
				<div className="QRCardContainer">
					<p style={redText}>Organizations require a valid business number to be verified</p>
				</div>
				<button onClick={props.nextStep}className={"blackButton createOrgButton"}>Let's get started</button>
			</div>
		</>
    );
}

export default Landing;