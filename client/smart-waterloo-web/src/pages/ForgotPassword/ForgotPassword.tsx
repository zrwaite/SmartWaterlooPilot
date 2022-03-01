import React from "react";
import Navbar from "../../components/Navbar";
import {mobileWidth} from "../../constants";
import "./ForgotPassword.css";
// import {Link} from "react-router-dom";
//Todo change buttons to links
type ForgotPasswordProps = {};
type ForgotPasswordState = {mobileView: boolean};
class ForgotPassword extends React.Component<ForgotPasswordProps, ForgotPasswordState> {
	constructor(props:ForgotPasswordProps) {
		super(props);
		this.updateSize = this.updateSize.bind(this);
		this.state = {
			mobileView:false
		}
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
				<Navbar root={false}/>
				<div className={"PageContainer"}>
					<div className={this.state.mobileView? "":"DesktopPanel"}>
						{this.state.mobileView?<h6>Forgot your password?</h6>:<h4 className={"PasswordHeader"}>Forgot your password?</h4>}
						<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						<br/><br/>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						<br/><br/>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					</div>
				</div>	
			</>
		);
	}
}

export default ForgotPassword;