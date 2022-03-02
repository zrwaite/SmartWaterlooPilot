import React from "react";
import Navbar from "../../components/Navbar";
import AvatarPNG from "../../images/fullAvatar.png";
import "./Login.css";
import Cookies from "universal-cookie";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {MobileContext} from "../../App";
const Login = () => {
	let {mobile} = useContext(MobileContext); 
	const cookies = new Cookies();
	cookies.set("back", "/login");
	const [state, setState] = useState({inputs: {password: ""}});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
		let stateKeys: keyof typeof state.inputs;
		const name = event.target.name as typeof stateKeys;
		let partialState = {...state};
		partialState.inputs[name] = event.target.value;
        setState(partialState);
	}
	return (
		<>
			<Navbar root={true}/>
			<div className={"PageContainer"}>
				<img src={AvatarPNG} alt="avatar" className={"avatarImage"}/>
				<div className={mobile? "loginFormMobile":"loginFormDesktop DesktopPanel"}>
					<h4>Welcome back Tyragreenex! 🎉</h4>
					<p>Enter your password to continue using "Name of the Project"</p>
					<div className="passwordInput">
						<h6>Password</h6>
						<input name="password" id="passwordInput" placeholder="Password" type={"password"} value={state.inputs.password} onChange={handleInputChange}/>
						<Link to={"/forgotpassword"}>Forgot your password?</Link>
					</div>
					<button className="blackButton loginButton">Sign In</button>
				</div>
			</div>	
		</>
	);
}

export default Login;