import React, { ChangeEvent, useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import { MobileContext } from "../../App";
import "./CreateOrg.css";
import Landing from "./Landing";
import MeetAvatar from "../SignUp/MeetAvatar";
import Nickname from "../SignUp/Nickname";
import Verified from "./Verified";
import StepBubbles from "../../components/StepBubbles";
import { ActionMeta } from "react-select";
import { randomString } from "../../modules/randomData";
import { postOrg } from "../../data/postData";
import { forceNavigate } from "../../modules/navigate";
import {handleInputChange} from "../../modules/handleInput";

const defaultAvatarString = randomString();
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
const defaultSignUpState = {
	step: 0,
	inputs: {
		...defaultNicknameProps,
		...defaultAvatarProps,
		...defaultVerifiedProps
	}
}

const CreateOrg = () => {
	const [state, setState] = useState(defaultSignUpState);
	const {mobile} = useContext(MobileContext);
	const updateStep = (step: number) => {
		setState({ ...state, step: step });
	}
	const childSetState = (key: keyof typeof defaultSignUpState.inputs, value: string) => {
		let partialInputs = { ...state.inputs };
		partialInputs[key] = value;
		setState({ ...state, inputs: partialInputs });
	}
	// const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
	// 	let inputKeys: keyof typeof state.inputs;
	// 	const name = event.target.name as typeof inputKeys;
	// 	let partialInput = { ...state.inputs };
	// 	partialInput[name] = event.target.value;
	// 	setState({ ...state, inputs: partialInput });
	// }
	// const handleSelectChange = (newValue: null | { value: string; label: string; }, actionMeta: ActionMeta<{ value: string, label: string }>) => {
	// 	let inputKeys: keyof typeof state.inputs;
	// 	const name = actionMeta.name as typeof inputKeys;
	// 	let partialInput = { ...state.inputs };
	// 	partialInput[name] = newValue?.value || "";
	// 	setState({ ...state, inputs: partialInput });
	// }
	const getNicknameProps = () => {
		let nicknameProps = defaultNicknameProps;
		let nicknamePropKeys = Object.keys(defaultNicknameProps) as [keyof typeof defaultNicknameProps];
		nicknamePropKeys.forEach(key => nicknameProps[key] = state.inputs[key]);
		return nicknameProps;
	}
	const getAvatarProps = () => {
		let avatarProps = defaultAvatarProps;
		let avatarPropKeys = Object.keys(defaultAvatarProps) as [keyof typeof defaultAvatarProps];
		avatarPropKeys.forEach(key => avatarProps[key] = state.inputs[key]);
		return avatarProps;
	}
	const getVerifiedProps = () => {
		let verifiedProps = defaultVerifiedProps;
		let avatarPropKeys = Object.keys(defaultVerifiedProps) as [keyof typeof defaultVerifiedProps];
		avatarPropKeys.forEach(key => verifiedProps[key] = state.inputs[key]);
		return verifiedProps;
	}
	const submitForm = async () => {
		let {success, errors, orgId} = await postOrg({...state.inputs});
		if (success) {
			setTimeout(() => forceNavigate(`/dashboard/org/${orgId}`),500);
			return true;
		} else {
			alert("Something went wrong" + JSON.stringify(errors));
		}
		return false;
	}

	let stepSection: any;

	const userInputFunctions = {
		handleParentInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, state, setState),
	}
	switch (state.step) {
		case 0: stepSection = (
			<Landing nextStep={() => updateStep(1)} />
		); break; case 1: stepSection = (
			<Verified backStep={() => updateStep(0)} nextStep={() => updateStep(2)} {...userInputFunctions} verifiedData={getVerifiedProps()}/>
		); break; case 2: stepSection = (
			<MeetAvatar backStep={() => updateStep(1)} nextStep={() => updateStep(3)} avatarData={getAvatarProps()} updateParentState={childSetState} />
		); break; case 3: stepSection = (
			<Nickname org={true} backStep={() => updateStep(2)} {...userInputFunctions} nicknameData={getNicknameProps()} submit={submitForm} />
		); break; default: stepSection = (
			<h1>Invalid step "{state.step}"</h1>
		);
	}
	return (
		<>
			<Navbar root={false} />
			<div className={"PageContainer"}>
				{<div className={mobile ? "" : "DesktopPanel"}>
					{state.step ? <StepBubbles steps={["Verification", "Avatar"]} step={state.step} /> : null}
					{stepSection}
				</div>}
			</div>
		</>
	);
}

export default CreateOrg;