import React from "react";
import Navbar from "../../components/Navbar";
import {MobileContext} from "../../App";
import "./SignUp.css";
import Profile from "./Profile";
import Landing from "./Landing";
import MeetAvatar from "./MeetAvatar";
import Nickname from "./Nickname";
import Password from "./MetaMask";
import StepBubbles from "./StepBubbles";
import Cookies from "universal-cookie";
import {ActionMeta} from "react-select";

type SignUpProps = {};
const defaultProfileProps = {
	day: "",
	month: "",
	year: "",
	gender: "",
	height: "",
	weight: "",
	grade: "7",
	postalCode: "",
	race: "",
	religion: "",
	sexuality: "",
}
const defaultNicknameProps = {
	nickname: ""
}
const defaultSignUpState = {
	step: 0,
	formInputs: {
		...defaultProfileProps,
		...defaultNicknameProps,
		password: "",
		avatar: ""
	}
}
type SignUpState = typeof defaultSignUpState;
class SignUp extends React.Component<SignUpProps, SignUpState> {
	constructor(props:SignUpProps) {
		super(props);
		this.updateStep = this.updateStep.bind(this);
		this.state = defaultSignUpState;
		const cookies = new Cookies();
		cookies.set("back", "/signup");
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
	}
	updateStep(step:number) {
		this.setState({...this.state, step: step});
	}
	handleInputChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
		let inputKeys: keyof typeof this.state.formInputs;
        const name = event.target.name as typeof inputKeys;
        let partialInput = {...this.state.formInputs};
		partialInput[name] = event.target.value;
        this.setState({...this.state, formInputs: partialInput});
    }
	handleSelectChange = (newValue: null|{ value: string; label: string; }, actionMeta: ActionMeta<{value: string,label: string}>) => {
		let inputKeys: keyof typeof this.state.formInputs;
		const name = actionMeta.name as typeof inputKeys;
		let partialInput = {...this.state.formInputs};
		partialInput[name] = newValue?.value || "";
        this.setState({...this.state, formInputs: partialInput});
	}
	getProfileProps(){
		let profileProps = defaultProfileProps;
		let profilePropKeys = Object.keys(defaultProfileProps) as [keyof typeof defaultProfileProps];
		profilePropKeys.forEach(key => profileProps[key] = this.state.formInputs[key]);
		return profileProps;
	}
	getNicknameProps(){
		let nicknameProps = defaultNicknameProps;
		let nicknamePropKeys = Object.keys(defaultNicknameProps) as [keyof typeof defaultNicknameProps];
		nicknamePropKeys.forEach(key => nicknameProps[key] = this.state.formInputs[key]);
		return nicknameProps;
	}
	render() {
		let stepSection:any;
		
		const userInputFunctions = {
			handleParentInputChange: this.handleInputChange,
			handleParentSelectChange: this.handleSelectChange,
			updateStep: this.updateStep
		}
		switch (this.state.step) {
			case 0: stepSection = (
				<Landing updateStep={this.updateStep}/>
			); break; case 1: stepSection = (
				<Password updateStep={this.updateStep}/>
			); break; case 2: stepSection = (
				<Profile {...userInputFunctions} formData={this.getProfileProps()} />
			); break; case 3: stepSection = (
				<MeetAvatar updateStep={this.updateStep}/>
			);break; case 4: stepSection = (
				<Nickname {...userInputFunctions} nicknameData={this.getNicknameProps()}/>
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