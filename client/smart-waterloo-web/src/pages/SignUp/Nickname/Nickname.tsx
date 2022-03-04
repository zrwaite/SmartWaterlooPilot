import Avatar from "../../../images/fullAvatar.png";
import "./Nickname.css";

type NicknameProps = { 
	updateStep: Function,
	handleParentInputChange: (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => void
	nicknameData: {nickname:string, avatarString:string}
};
function Nickname(props: NicknameProps) {
	const spacing = {
		margin: "0.5rem 0"
	}
	const redText = {
		color: "red"
	}
    return (
		<>
			<div className={"nicknameContainer"}>
				<h4>Almost there 😎</h4>
				<p style={spacing}>Now let's give a nickname to your Avatar</p>
				<img src={`https://avatars.dicebear.com/api/bottts/${props.nicknameData.avatarString}.svg`} alt="Avatar" className="avatarImage"/>
				<hr/>
				<input onChange={props.handleParentInputChange} name="nickname" type="text" className="nicknameInput" id="nicknameInput" placeholder="Enter a nickname" value={props.nicknameData.nickname}/>
				<p style={redText}>*Do not use your real name or the name of someone you know for privacy reasons.</p>
				<button style={spacing} onClick={() => console.log("signup")} className={"blackButton signUpButton"}>Start using "The Project"</button>
			</div>
			<button onClick={() => props.updateStep(3)} className={"blackButton"}>Back</button>
		</>
    );
}

export default Nickname;