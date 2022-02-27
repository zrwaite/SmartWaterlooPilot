import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import {mobileWidth} from "../../constants";
import QRCard from "../../images/cardIcon.png";
import "./SignUp.css";
// import {Link} from "react-router-dom";
//Todo change buttons to links
type SignUpProps = {};
type SignUpState = {mobileView: boolean};
class SignUp extends React.Component<SignUpProps, SignUpState> {
	constructor(props:SignUpProps) {
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
		let redText = {color: "red"};
		return (
			<>
				<Navbar root={false}/>
				<div className={"PageContainer"}>
					<div className={this.state.mobileView? "":"DesktopPanel"}>
						<div className={"signUpContainer"}>
							<h4>Let's get started ✏️</h4>
							<p>Explanation of what that is. Explanation of what claiming an account means and what can the user do with this account.</p>
							<img src={QRCard} alt="QRCard" className="QRCardIcon"/>
							<p style={redText}>Important Notice: In the case of losing your card you will never be able to get your account back.</p>
							<button className={"blackButton signUpButton"}>Let's get started</button>
						</div>
					</div>
				</div>	
			</>
		);
	}
}

export default SignUp;