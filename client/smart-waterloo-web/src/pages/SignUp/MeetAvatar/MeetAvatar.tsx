// import {Link} from "react-router-dom";
// import Avatar from "../../../images/fullAvatar.png";
import "./MeetAvatar.css";

//Todo change buttons to links

type MeetAvatarProps = { 
	backStep: () => void,
	nextStep: () => void,
	updateParentState: Function
	avatarData: {avatarString:string}
};
const randomString = () => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
      	result += characters.charAt(Math.floor(Math.random() * charactersLength));
   	}
	console.log(result);
   	return result;
}
function MeetAvatar(props:MeetAvatarProps) {
	const spacing = {
		margin: "0.5rem 0"
	}
	const generateNewAvatar = async () => {
		props.updateParentState("avatarString", randomString());
	}
    return (
		<>
			<div className={"meetAvatarContainer"}>
				<h4>Meet your Avatar 🦄</h4>
				<p style={spacing}>This is your Avatar, you can give it a nickname and customize its features!</p>
				{/* <img src={Avatar} alt="Avatar" className="avatarImage"/> */}
				<img className="avatarImage" alt="avatar" src={`https://avatars.dicebear.com/api/bottts/${props.avatarData.avatarString}.svg`}/>
				<hr/>
				<div className="buttonContainer">
					<button style={spacing} onClick={() => generateNewAvatar()} className={"blackButton signUpButton"}>Generate new Avatar</button>
					<button style={spacing} onClick={props.nextStep} className={"blackButton signUpButton"}>Continue with this Avatar</button>
				</div>
				<p>Don't worry, you can always customize later.</p>
			</div>
			<button onClick={props.backStep} className={"blackButton"}>Back</button>
		</>
    );
}

export default MeetAvatar;