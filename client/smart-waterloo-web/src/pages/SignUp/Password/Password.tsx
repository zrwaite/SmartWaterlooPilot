// import {Link} from "react-router-dom";
import "./Password.css";

//Todo change buttons to links
type PasswordProps = {
	updateStep: Function
}
function Password(props:PasswordProps) {
    return (
		<div className={"passwordContainer"}>
			<h4>Set up your Password 🔐</h4>
			<p>Do not share your password with anyone</p>
			<div className="passwordFormInput">
				<p>Password</p>
				<input type="password" className="passwordInput" id="passwordInput" name="passwordInput" placeholder="Password"/>
				<p>Confirm Password</p>
				<input type="password2" className="password2Input" id="password2Input" name="password2Input" placeholder="Confirm Password"/>
			</div>
			<button onClick={() => props.updateStep(2)} className={"blackButton confirmPasswordButton"}>Confirm Password</button>
		</div>
    );
}

export default Password;