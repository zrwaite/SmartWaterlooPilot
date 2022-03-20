import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import { MobileContext, AddressContext, IdContext } from "../../App";
import "./CreateOrg.css";
import Landing from "./Landing";
import MeetAvatar from "../SignUp/MeetAvatar";
import Nickname from "../SignUp/Nickname";
import Verified from "./Verified";
import StepBubbles from "../../components/StepBubbles";
import Cookies from "universal-cookie";
import { ActionMeta } from "react-select";
import Web3 from "web3";
import { AbiItem } from 'web3-utils';
// import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

let web3 = new Web3(Web3.givenProvider);

type SignUpProps = {
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

const SignUp = (props: SignUpProps) => {
	const { id: qrId } = useContext(IdContext);
	const { address, setAddress } = useContext(AddressContext);
	const [state, setState] = useState(defaultSignUpState);
	const cookies = new Cookies();
	const navigate = useNavigate();
	cookies.set("back", "/signup");
	const setAccounts = async () => {
		try {
			let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			web3.eth.defaultAccount = accounts[0];
			return web3.eth.defaultAccount;
		} catch (err: any) {
			console.log(err);
		}
		return "";
	}
	const updateStep = (step: number) => {
		setState({ ...state, step: step });
	}
	const childSetState = (key: keyof typeof defaultSignUpState.formInputs, value: string) => {
		let partialInputs = { ...state.formInputs };
		partialInputs[key] = value;
		setState({ ...state, formInputs: partialInputs });
	}
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
		let inputKeys: keyof typeof state.formInputs;
		const name = event.target.name as typeof inputKeys;
		let partialInput = { ...state.formInputs };
		partialInput[name] = event.target.value;
		setState({ ...state, formInputs: partialInput });
	}
	const handleSelectChange = (newValue: null | { value: string; label: string; }, actionMeta: ActionMeta<{ value: string, label: string }>) => {
		let inputKeys: keyof typeof state.formInputs;
		const name = actionMeta.name as typeof inputKeys;
		let partialInput = { ...state.formInputs };
		partialInput[name] = newValue?.value || "";
		setState({ ...state, formInputs: partialInput });
	}
	const getNicknameProps = () => {
		let nicknameProps = defaultNicknameProps;
		let nicknamePropKeys = Object.keys(defaultNicknameProps) as [keyof typeof defaultNicknameProps];
		nicknamePropKeys.forEach(key => nicknameProps[key] = state.formInputs[key]);
		return nicknameProps;
	}
	const getAvatarProps = () => {
		let avatarProps = defaultAvatarProps;
		let avatarPropKeys = Object.keys(defaultAvatarProps) as [keyof typeof defaultAvatarProps];
		avatarPropKeys.forEach(key => avatarProps[key] = state.formInputs[key]);
		return avatarProps;
	}
	const getVerifiedProps = () => {
		let verifiedProps = defaultVerifiedProps;
		let avatarPropKeys = Object.keys(defaultVerifiedProps) as [keyof typeof defaultVerifiedProps];
		avatarPropKeys.forEach(key => verifiedProps[key] = state.formInputs[key]);
		return verifiedProps;
	}
	const submitForm = async () => {
		
		let path = `/dashboard`;
		navigate(path);
	}

	let stepSection: any;

	const userInputFunctions = {
		handleParentInputChange: handleInputChange,
		handleParentSelectChange: handleSelectChange,
	}
	switch (state.step) {
		case 0: stepSection = (
			<Landing nextStep={() => updateStep(1)} />
		); break; case 1: stepSection = (
			<Verified backStep={() => updateStep(0)} nextStep={() => updateStep(2)}{...userInputFunctions} verifiedData={getVerifiedProps()}/>
		); break; case 2: stepSection = (
			<MeetAvatar backStep={() => updateStep(1)} nextStep={() => updateStep(3)} avatarData={getAvatarProps()} updateParentState={childSetState} />
		); break; case 3: stepSection = (
			<Nickname backStep={() => updateStep(2)} {...userInputFunctions} nicknameData={getNicknameProps()} submit={submitForm} />
		); break; default: stepSection = (
			<h1>Invalid step "{state.step}"</h1>
		);
	}
	return (
		<>
			<Navbar root={true} />
			<div className={"PageContainer"}>
				<MobileContext.Consumer>
					{({ mobile }) => (<div className={mobile ? "" : "DesktopPanel"}>
						{state.step ? <StepBubbles steps={["MetaMask", "Profile", "Avatar"]} step={state.step} /> : null}
						{stepSection}
					</div>)}
				</MobileContext.Consumer>
			</div>
		</>
	);
}

export default SignUp;