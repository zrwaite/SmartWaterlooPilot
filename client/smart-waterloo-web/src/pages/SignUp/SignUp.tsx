import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { MobileContext, AddressContext, IdContext } from "../../App";
import "./SignUp.css";
import Profile from "./Profile";
import Landing from "./Landing";
import MeetAvatar from "./MeetAvatar";
import Nickname from "./Nickname";
import MetaMask from "./MetaMask";
import Password from "./Password";
import StepBubbles from "../../components/StepBubbles";
import Cookies from "universal-cookie";
import { ActionMeta } from "react-select";

// import orgABI from "./utils/SmartOrganisation.json"
// import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { randomString } from "../../modules/randomData";
import { postUser } from "../../data/postData";
import {USE_WEB3} from "../../data/dataConstants";


const defaultAvatarString = randomString();
type SignUpProps = {
};
const defaultProfileProps = {
	day: "",
	month: "",
	year: "",
	gender: "",
	height: "",
	weight: "",
	grade: "",
	postalCode: "",
	race: "",
	religion: "",
	sexuality: "",
}
const defaultPasswordProps = {
	password: "",
	password2: ""
}
const defaultNicknameProps = {
	nickname: "",
	avatarString: defaultAvatarString
}
const defaultVerifiedProps = {
	businessNumber: ""
}
const defaultAvatarProps = {
	avatarString: defaultAvatarString
}
const defaultSignUpState = {
	step: 0,
	formInputs: {
		...defaultProfileProps,
		...defaultNicknameProps,
		...defaultAvatarProps,
		...defaultVerifiedProps,
		...defaultPasswordProps
	}
}


const SignUp = (props: SignUpProps) => {
	const { id: qrId } = useContext(IdContext);
	// const { address, setAddress } = useContext(AddressContext);
	const [state, setState] = useState(defaultSignUpState);
	const cookies = new Cookies();
	const navigate = useNavigate();
	cookies.set("back", "/signup");
	
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
	const getProfileProps = () => {
		let profileProps = defaultProfileProps;
		let profilePropKeys = Object.keys(defaultProfileProps) as [keyof typeof defaultProfileProps];
		profilePropKeys.forEach(key => profileProps[key] = state.formInputs[key]);
		return profileProps;
	}
	const getNicknameProps = () => {
		let nicknameProps = defaultNicknameProps;
		let nicknamePropKeys = Object.keys(defaultNicknameProps) as [keyof typeof defaultNicknameProps];
		nicknamePropKeys.forEach(key => nicknameProps[key] = state.formInputs[key]);
		return nicknameProps;
	}
	const getPasswordProps = () => {
		let passwordProps = defaultPasswordProps;
		let passwordPropKeys = Object.keys(defaultPasswordProps) as [keyof typeof defaultPasswordProps];
		passwordPropKeys.forEach(key => passwordProps[key] = state.formInputs[key]);
		return passwordProps;
	}
	const getAvatarProps = () => {
		let avatarProps = defaultAvatarProps;
		let avatarPropKeys = Object.keys(defaultAvatarProps) as [keyof typeof defaultAvatarProps];
		avatarPropKeys.forEach(key => avatarProps[key] = state.formInputs[key]);
		return avatarProps;
	}
	const submitForm = async () => {
		postUser({...state.formInputs, qrId: qrId});
		let path = `/dashboard/user`;
		navigate(path);
	}

	let stepSection: any;

	const userInputFunctions = {
		handleParentInputChange: handleInputChange,
		handleParentSelectChange: handleSelectChange,
	}

	useEffect(() => {
		if (!USE_WEB3) {
			if (qrId==="") navigate("/qr");
		}
	});

	switch (state.step) {
		case 0: stepSection = (
			<Landing nextStep={() => updateStep(1)} />
		); break; case 1: stepSection = (
			USE_WEB3?<MetaMask backStep={() => updateStep(0)} nextStep={() => updateStep(2)} />:
			<Password {...userInputFunctions} backStep={() => updateStep(0)} nextStep={() => updateStep(2)} passwordData={getPasswordProps()}/>
		); break; case 2: stepSection = (
			<Profile backStep={() => updateStep(1)} nextStep={() => updateStep(3)} {...userInputFunctions} formData={getProfileProps()} />
		); break; case 3: stepSection = (
			<MeetAvatar backStep={() => updateStep(2)} nextStep={() => updateStep(4)} avatarData={getAvatarProps()} updateParentState={childSetState} />
		); break; case 4: stepSection = (
			<Nickname org={false} backStep={() => updateStep(3)} {...userInputFunctions} nicknameData={getNicknameProps()} submit={submitForm} />
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
						{state.step ? <StepBubbles steps={[USE_WEB3?"MetaMask":"Password", "Profile", "Avatar"]} step={state.step} /> : null}
						{stepSection}
					</div>)}
				</MobileContext.Consumer>
			</div>
		</>
	);
}

export default SignUp;