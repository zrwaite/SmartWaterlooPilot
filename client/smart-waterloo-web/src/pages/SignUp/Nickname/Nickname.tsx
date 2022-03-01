// import {Link} from "react-router-dom";
import Avatar from "../../../images/fullAvatar.png";
import "./Nickname.css";

//Todo change buttons to links
function Nickname() {
	const spacing = {
		margin: "0.5rem 0"
	}
	const redText = {
		color: "red"
	}
    return (
		<div className={"nicknameContainer"}>
			<h4>Almost there 😎</h4>
			<p style={spacing}>Now let's give a nickname to your Avatar</p>
			<img src={Avatar} alt="Avatar" className="avatarImage"/>
			<hr/>
			<input type="text" className="nicknameInput" id="nicknameInput" placeholder="Enter a nickname"/>
			<p style={redText}>*Do not use your real name or the name of someone you know for privacy reasons.</p>
			<button style={spacing} onClick={() => console.log("signup")} className={"blackButton signUpButton"}>Start using "The Project"</button>
		</div>
    );
}

export default Nickname;