// import {Link} from "react-router-dom";
import "./Password.css";
import {ChangeEvent} from "react";

//Todo change buttons to links
type PasswordProps = {
	handleParentInputChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void
	backStep: () => void,
	nextStep: () => void,
	passwordData: { password: string, password2: string };
}
function Password(props:PasswordProps) {
	let matchedPasswords = (props.passwordData.password === props.passwordData.password2);
    return (
		<>
			<div className={"passwordContainer"}>
				<h4>Set up your Password 🔐</h4>
				<p>Do not share your password with anyone</p>
				<div className="passwordFormInput">
					<p>Password</p>
					<input value={props.passwordData.password} type="password" className="passwordInput" id="passwordInput" name="password" placeholder="Password" onChange={props.handleParentInputChange}/>
					<p>Confirm Password</p>
					<input value={props.passwordData.password2} type="password" className="password2Input" id="password2Input" name="password2" placeholder="Confirm Password" onChange={props.handleParentInputChange}/>
				</div>
				<button onClick={matchedPasswords?props.nextStep:()=>{}} className={`${matchedPasswords?"blackButton":"disabledButton"} confirmPasswordButton`}>Confirm Password</button>
				<p>{matchedPasswords?null:"Passwords do not match"}</p>
			</div>
			<button onClick={props.backStep} className={"blackButton"}>Back</button>
		</>
    );
}

export default Password;