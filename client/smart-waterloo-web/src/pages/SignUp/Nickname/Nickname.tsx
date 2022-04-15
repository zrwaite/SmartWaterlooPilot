import "./Nickname.css";


type NicknameProps = {
	backStep: () => void,
	handleParentInputChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
	nicknameData: { nickname: string, avatar_string: string };
	submit: () => void;
	org: boolean;
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
				<img src={`https://avatars.dicebear.com/api/bottts/${props.nicknameData.avatar_string}.svg`} alt="Avatar" className="avatarImage" />
				<hr />
				<input onChange={props.handleParentInputChange} name="nickname" type="text" className="nicknameInput" id="nicknameInput" placeholder="Enter a nickname" value={props.nicknameData.nickname} />
				{
					props.org?
					<p style={redText}>*Use the real name of the organization that this account is for.</p>:
					<p style={redText}>*Do not use your real name or the name of someone you know for privacy reasons.</p>
				}
				<button style={spacing} onClick={()=>props.submit()} className={"blackButton signUpButton"}>Start using "The Project"</button>
			</div>
			<button onClick={props.backStep} className={"blackButton"}>Back</button>
		</>
	);
}

export default Nickname;