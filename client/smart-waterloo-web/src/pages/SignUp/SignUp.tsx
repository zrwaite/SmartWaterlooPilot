import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import { MobileContext, IdContext } from "../../App";
import "./SignUp.css";
import Profile from "./Profile";
import Landing from "./Landing";
import MeetAvatar from "./MeetAvatar";
import Nickname from "./Nickname";
import MetaMask from "./MetaMask";
import Password from "./Password";
import StepBubbles from "../../components/StepBubbles";
import cookies from "../../modules/cookies";
import { ActionMeta } from "react-select";
import { useNavigate } from "react-router-dom";
import { randomString } from "../../modules/randomData";
import { postUser } from "../../data/postData";
import {USE_WEB3} from "../../data/dataConstants";
import {ProfileFormGridSelectState} from "./Profile/FormGridData";
import {handleCheckboxChange, handleInputChange, handleSelectTextChange, handleSelectChange} from "../../modules/handleInput";


const defaultAvatarString = randomString();
const defaultProfileProps = {
	birth_day: "",
	height: "",
	weight: "",
	grade: "",
	postalCode: "",
	primary_language: "",
	secondary_language: "",
	city: "",
	contact_info: ""
}
const defaultSelectInputs:ProfileFormGridSelectState = {
	religion: {select: "", text: ""},
	sexuality: {select: "", text: ""},
	household_income: {select: "", text: ""},
	race: {select: "", text: ""},
	household_composition:{select: "", text: ""},
	contact:{select: "", text: ""},
	gender: {select: "", text: ""},
	heard: {select: "", text: ""},
}
const defaultPasswordProps = {
	password: "",
	password2: ""
}
const defaultNicknameProps = {
	nickname: "",
	avatar_string: defaultAvatarString
}
const defaultVerifiedProps = {
	businessNumber: ""
}
const defaultAvatarProps = {
	avatar_string: defaultAvatarString
}
const booleanInputs = {
	code_of_conduct: false,
}
const defaultSignUpState = {
	step: 0,
	selectInputs: {
		...defaultSelectInputs,
	},
	inputs: {
		...defaultProfileProps,
		...defaultNicknameProps,
		...defaultAvatarProps,
		...defaultVerifiedProps,
		...defaultPasswordProps
	},
	booleanInputs: {
		...booleanInputs
	}
}


const SignUp = () => {
	const { id: qrId } = useContext(IdContext);
	const [state, setState] = useState(defaultSignUpState);
	const navigate = useNavigate();
	cookies.set("back", "/signup");
	
	const updateStep = (step: number) => {
		setState({ ...state, step: step });
	}
	const childSetState = (key: keyof typeof defaultSignUpState.inputs, value: string) => {
		let partialInputs = { ...state.inputs };
		partialInputs[key] = value;
		setState({ ...state, inputs: partialInputs });
	}
	
	const getProfileProps = () => {
		let profileProps = {
			...defaultProfileProps,
			...booleanInputs
		};
		let profilePropKeys = Object.keys(defaultProfileProps) as [keyof typeof defaultProfileProps];
		profilePropKeys.forEach(key => profileProps[key] = state.inputs[key]);
		let profileBooleanPropKeys = Object.keys(booleanInputs) as [keyof typeof booleanInputs];
		profileBooleanPropKeys.forEach(key => profileProps[key] = state.booleanInputs[key]);
		return profileProps;
	}

	const getNicknameProps = () => {
		let nicknameProps = defaultNicknameProps;
		let nicknamePropKeys = Object.keys(defaultNicknameProps) as [keyof typeof defaultNicknameProps];
		nicknamePropKeys.forEach(key => nicknameProps[key] = state.inputs[key]);
		return nicknameProps;
	}
	const getPasswordProps = () => {
		let passwordProps = defaultPasswordProps;
		let passwordPropKeys = Object.keys(defaultPasswordProps) as [keyof typeof defaultPasswordProps];
		passwordPropKeys.forEach(key => passwordProps[key] = state.inputs[key]);
		return passwordProps;
	}
	const getAvatarProps = () => {
		let avatarProps = defaultAvatarProps;
		let avatarPropKeys = Object.keys(defaultAvatarProps) as [keyof typeof defaultAvatarProps];
		avatarPropKeys.forEach(key => avatarProps[key] = state.inputs[key]);
		return avatarProps;
	}
	const getSelectInputs = () => {
		let newSelectInputs = {
			gender: "",
			religion: "",
			sexuality: "",
			household_income: "",
			race: "",
			household_composition:"",
			contact: "",
			heard: ""
		}
		let selectInputKeys = Object.keys(newSelectInputs) as [keyof typeof newSelectInputs];
		selectInputKeys.forEach(key => {
			let value = state.selectInputs[key];
			newSelectInputs[key] = (value.select==="Other"?value.text:value.select);
		})
		return newSelectInputs;
	}
	const submitForm = async () => {
		let errors = await postUser({...state.inputs, ...state.booleanInputs, ...getSelectInputs(), qrId: qrId});
		if (errors.length) {
			console.log(errors);
		} else {
			let path = `/dashboard/user`;
			navigate(path);
			return true;
		}
		return false;
	}

	let stepSection: any;

	const userInputFunctions = {
		handleParentInputChange:  (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, state, setState),
		handleParentSelectTextChange: (e: ChangeEvent<HTMLInputElement>) => handleSelectTextChange(e, state, setState),
		handleParentSelectChange: (newValue: null | { value: string; label: string; }, actionMeta: ActionMeta<{ value: string, label: string }>) => handleSelectChange(newValue, actionMeta, state, setState),
		handleParentCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, state, setState),
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
			<Profile backStep={() => updateStep(1)} nextStep={() => updateStep(3)} {...userInputFunctions} formData={getProfileProps()} selectFormData={state.selectInputs} />
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
			<Navbar signedIn={false} root={true}/>
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