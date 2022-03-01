// import {Link} from "react-router-dom";
import Avatar from "../../../images/fullAvatar.png";
import "./MeetAvatar.css";

//Todo change buttons to links
type MeetAvatarProps = {
	updateStep: Function
}
function MeetAvatar(props:MeetAvatarProps) {
	const spacing = {
		margin: "0.5rem 0"
	}
    return (
		<div className={"meetAvatarContainer"}>
			<h4>Meet your Avatar 🦄</h4>
			<p style={spacing}>This is your Avatar, you can give it a nickname and customize its features!</p>
			<img src={Avatar} alt="Avatar" className="avatarImage"/>
			<hr/>
			<div className="buttonContainer">
				<button style={spacing} onClick={() => console.log("avatar cutomization")} className={"blackButton signUpButton"}>Customize my Avatar</button>
				<button style={spacing} onClick={() => props.updateStep(4)} className={"blackButton signUpButton"}>Continue with this Avatar</button>
			</div>
			<p>Don't worry, you can always customize later.</p>
		</div>
    );
}

export default MeetAvatar;