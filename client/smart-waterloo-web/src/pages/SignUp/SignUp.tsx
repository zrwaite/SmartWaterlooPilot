import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import {mobileWidth} from "../../constants";
import "./SignUp.css";
import Profile from "./Profile/Profile";
import Landing from "./Landing/Landing";
import Password from "./Password/Password";
import StepBubbles from "./StepBubbles/StepBubbles";
// import {Link} from "react-router-dom";
//Todo change buttons to links
type SignUpProps = {};
type SignUpState = {
	mobileView: boolean;
	step: number;
};
class SignUp extends React.Component<SignUpProps, SignUpState> {
	constructor(props:SignUpProps) {
		super(props);
		this.updateSize = this.updateSize.bind(this);
		this.updateStep = this.updateStep.bind(this);
		this.state = {
			mobileView:false,
			step: 0
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
	updateStep(step:number) {
		this.setState({...this.state, step: step});
	}
	render() {
		let stepSection;
		switch (this.state.step) {
			case 0: stepSection = (
				<Landing updateStep={this.updateStep}/>
			); break; case 1: stepSection = (
				<Password updateStep={this.updateStep}/>
			); break; case 2: stepSection = (
				<Profile updateStep={this.updateStep}/>
			); break; case 3: stepSection = (
				<h1>Avatar to come</h1>
			);break; default: stepSection = (
				<h1>Invalid step "{this.state.step}"</h1>
			);
		}
		return (
			<>
				<Navbar root={false}/>
				<div className={"PageContainer"}>
					<div className={this.state.mobileView? "":"DesktopPanel"}>
						{this.state.step?<StepBubbles step={this.state.step}/>:null}
						{stepSection}
					</div>
				</div>	
			</>
		);
	}
}

export default SignUp;