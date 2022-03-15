import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { MobileContext, AddressContext} from "../../App";
import "./SignUp.css";
import Profile from "./Profile";
import Landing from "./Landing";
import MeetAvatar from "./MeetAvatar";
import Nickname from "./Nickname";
import MetaMask from "./MetaMask";
import Verified from "./Verified";
import StepBubbles from "./StepBubbles";
import Cookies from "universal-cookie";
import { ActionMeta } from "react-select";
import userABI from "./utils/SmartUser.json";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

type SignUpProps = {
	org: boolean;
};
const defaultProfileProps = {
	day: "30",
	month: "09",
	year: "2002",
	gender: "Male",
	height: "173",
	weight: "132",
	grade: "14",
	postalCode: "N2L 3G5",
	race: "Other",
	religion: "Other",
	sexuality: "Other",
}
const defaultNicknameProps = {
	nickname: "",
	avatarString: ""
}
const defaultVerifiedProps = {
	businessNumber: ""
}
const defaultAvatarProps = {
	avatarString: ""
}
const defaultSignUpState = {
	step: 0,
	formInputs: {
		...defaultProfileProps,
		...defaultNicknameProps,
		...defaultAvatarProps,
		...defaultVerifiedProps
	}
}

declare var window: any;

type SignUpState = typeof defaultSignUpState;
class SignUp extends React.Component<SignUpProps, SignUpState> {
	constructor(props: SignUpProps) {
		super(props);
		SignUp.contextType = AddressContext;
		this.updateStep = this.updateStep.bind(this);
		this.state = defaultSignUpState;
		const cookies = new Cookies();
		cookies.set("back", "/signup");
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.childSetState = this.childSetState.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	updateStep(step: number) {
		this.setState({ ...this.state, step: step });
	}
	childSetState(key: keyof typeof defaultSignUpState.formInputs, value: string) {
		let partialInputs = { ...this.state.formInputs };
		partialInputs[key] = value;
		this.setState({ ...this.state, formInputs: partialInputs });
	}
	handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
		let inputKeys: keyof typeof this.state.formInputs;
		const name = event.target.name as typeof inputKeys;
		let partialInput = { ...this.state.formInputs };
		partialInput[name] = event.target.value;
		this.setState({ ...this.state, formInputs: partialInput });
	}
	handleSelectChange = (newValue: null | { value: string; label: string; }, actionMeta: ActionMeta<{ value: string, label: string }>) => {
		let inputKeys: keyof typeof this.state.formInputs;
		const name = actionMeta.name as typeof inputKeys;
		let partialInput = { ...this.state.formInputs };
		partialInput[name] = newValue?.value || "";
		this.setState({ ...this.state, formInputs: partialInput });
	}
	getProfileProps() {
		let profileProps = defaultProfileProps;
		let profilePropKeys = Object.keys(defaultProfileProps) as [keyof typeof defaultProfileProps];
		profilePropKeys.forEach(key => profileProps[key] = this.state.formInputs[key]);
		return profileProps;
	}
	getNicknameProps() {
		let nicknameProps = defaultNicknameProps;
		let nicknamePropKeys = Object.keys(defaultNicknameProps) as [keyof typeof defaultNicknameProps];
		nicknamePropKeys.forEach(key => nicknameProps[key] = this.state.formInputs[key]);
		return nicknameProps;
	}
	getAvatarProps() {
		let avatarProps = defaultAvatarProps;
		let avatarPropKeys = Object.keys(defaultAvatarProps) as [keyof typeof defaultAvatarProps];
		avatarPropKeys.forEach(key => avatarProps[key] = this.state.formInputs[key]);
		return avatarProps;
	}
	getVerifiedProps() {
		let verifiedProps = defaultVerifiedProps;
		let avatarPropKeys = Object.keys(defaultVerifiedProps) as [keyof typeof defaultVerifiedProps];
		avatarPropKeys.forEach(key => verifiedProps[key] = this.state.formInputs[key]);
		return verifiedProps;
	}
	submitForm = async() => {
		// const {org} = useContext(OrgContext);
		console.log("Working");
		const [userAddress, setUserAddress] = useState([]);
		if (window.ethereum) {
			await window.ethereum.request({ method: 'eth_requestAccounts' })
				.then((accounts: []) => setUserAddress(accounts))
				.catch((err: any) => console.log(err));
		}
		else{
			console.log("No accounts found!");
		}
		/*
		This uses the global context variable
		*/
		let exampleAddress = "0x8484802hjfjlkfadafjk23";
		this.context.address = exampleAddress;

		//User Information Smart Contract
		const contractAddress = "0x03AAc327157736eb154b7E8be9eb0B0d4431F96A";
		const contractABI = userABI.abi;
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const userContract = new ethers.Contract(
			contractAddress,
			contractABI,
			signer
		);
		await userContract.addInfo(userAddress[0], (this.state.formInputs.day + this.state.formInputs.month + this.state.formInputs.year), this.state.formInputs.gender, this.state.formInputs.height, this.state.formInputs.weight, this.state.formInputs.grade, this.state.formInputs.postalCode, this.state.formInputs.race, this.state.formInputs.religion, this.state.formInputs.sexuality, this.state.formInputs.nickname)
			.then(()=> console.log("Information added successfully"))
			.catch((err:any)=> console.log(err));
		console.log("working");
		const navigate = useNavigate();
		let path = `/dashboard`;
		navigate(path);
	}


	render() {
		let stepSection: any;

		const userInputFunctions = {
			handleParentInputChange: this.handleInputChange,
			handleParentSelectChange: this.handleSelectChange,
			updateStep: this.updateStep
		}
		switch (this.state.step) {
			case 0: stepSection = (
				<Landing updateStep={this.updateStep} />
			); break; case 1: stepSection = (
				<MetaMask updateStep={this.updateStep} />
			); break; case 2: stepSection = (
				this.props.org ?
					<Verified {...userInputFunctions} verifiedData={this.getVerifiedProps()} /> :
					<Profile {...userInputFunctions} formData={this.getProfileProps()} />
			); break; case 3: stepSection = (
				<MeetAvatar avatarData={this.getAvatarProps()} updateParentState={this.childSetState} updateStep={this.updateStep} />
			); break; case 4: stepSection = (
				<Nickname {...userInputFunctions} org={this.props.org} nicknameData={this.getNicknameProps()} submit={this.submitForm} />
			); break; default: stepSection = (
				<h1>Invalid step "{this.state.step}"</h1>
			);
		}
		return (
			<>
				<Navbar root={true} />
				<div className={"PageContainer"}>
					<MobileContext.Consumer>
						{({ mobile }) => (<div className={mobile ? "" : "DesktopPanel"}>
							{this.state.step ? <StepBubbles org={this.props.org} step={this.state.step} /> : null}
							{stepSection}
						</div>)}
					</MobileContext.Consumer>
				</div>
			</>
		);
	}
}

export default SignUp;