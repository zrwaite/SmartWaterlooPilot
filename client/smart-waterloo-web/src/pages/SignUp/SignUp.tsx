import React from "react";
import Navbar from "../../components/Navbar";
import {MobileContext} from "../../App";
import "./SignUp.css";
import Profile from "./Profile";
import Landing from "./Landing";
import MeetAvatar from "./MeetAvatar";
import Nickname from "./Nickname";
import Password from "./Password";
import StepBubbles from "./StepBubbles";
// import {Link} from "react-router-dom";
//Todo change buttons to links
type SignUpProps = {};
type SignUpState = {
	step: number;
};
class SignUp extends React.Component<SignUpProps, SignUpState> {
	constructor(props:SignUpProps) {
		super(props);
		this.updateStep = this.updateStep.bind(this);
		this.state = {
			step: 0
		}
	}
	updateStep(step:number) {
		this.setState({...this.state, step: step});
	}
	render() {
		let stepSection:any;
		switch (this.state.step) {
			case 0: stepSection = (
				<Landing updateStep={this.updateStep}/>
			); break; case 1: stepSection = (
				<Password updateStep={this.updateStep}/>
			); break; case 2: stepSection = (
				<Profile updateStep={this.updateStep}/>
			); break; case 3: stepSection = (
				<MeetAvatar updateStep={this.updateStep}/>
			);break; case 4: stepSection = (
				<Nickname updateStep={this.updateStep}/>
			); break; default: stepSection = (
				<h1>Invalid step "{this.state.step}"</h1>
			);
		}
		return (
			<>
				<Navbar root={true}/>
				<div className={"PageContainer"}>
					<MobileContext.Consumer>
						{({mobile}) => (<div className={mobile? "":"DesktopPanel"}>
							{this.state.step?<StepBubbles step={this.state.step}/>:null}
							{stepSection}
						</div>)}
					</MobileContext.Consumer>
				</div>	
			</>
		);
	}
}

export default SignUp;