import React from "react";
import Navbar from "../../components/Navbar";
import {mobileWidth} from "../../constants";
import AvatarPNG from "../../images/fullAvatar.png";
import "./Login.css";
// import {Link} from "react-router-dom";
//Todo change buttons to links
type LoginProps = {};
type LoginState = {mobileView: boolean, inputs:{password:string}};
class Login extends React.Component<LoginProps, LoginState> {
	constructor(props:LoginProps) {
		super(props);
		this.updateSize = this.updateSize.bind(this);
		this.state = {
			mobileView:false,
			inputs: {
				password: ""
			}
		}
	}
	handleInputChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
		let stateKeys: keyof typeof this.state.inputs;
		const name = event.target.name as typeof stateKeys;
		let partialState = {...this.state};
		partialState.inputs[name] = event.target.value;
        this.setState(partialState);
	}
	componentDidMount() {
		this.updateSize();
		window.addEventListener("resize", this.updateSize);
	}
	
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateSize);
	}
	
	updateSize() {
		this.setState({ ...this.state, mobileView: window.innerWidth < mobileWidth });
	}
	render() {

		return (
			<>
				<Navbar root={true}/>
				<div className={"PageContainer"}>
					<img src={AvatarPNG} alt="avatar" className={"avatarImage"}/>
					<div className={this.state.mobileView? "loginFormMobile":"loginFormDesktop DesktopPanel"}>
						<h4>Welcome back Tyragreenex! 🎉</h4>
						<p>Enter your password to continue using "Name of the Project"</p>
						<div className="passwordInput">
							<h6>Password</h6>
							<input name="password" id="passwordInput" placeholder="Password" type={"password"} value={this.state.inputs.password} onChange={this.handleInputChange}/>
							<a>Forgot your password?</a>
						</div>
						<button className="blackButton loginButton">Sign In</button>
					</div>
				</div>	
			</>
		);
	}
}

export default Login;