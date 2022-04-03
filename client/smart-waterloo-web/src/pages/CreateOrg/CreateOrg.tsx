import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import { MobileContext } from "../../App";
import "./CreateOrg.css";
import Landing from "./Landing";
import MeetAvatar from "../SignUp/MeetAvatar";
import Nickname from "../SignUp/Nickname";
import Verified from "./Verified";
import StepBubbles from "../../components/StepBubbles";
import Cookies from "universal-cookie";
import { ActionMeta } from "react-select";
import { useNavigate } from "react-router-dom";
import { randomString } from "../../modules/randomData";
import { postOrg } from "../../data/postData";

const defaultAvatarString = randomString();
type SignUpProps = {
};
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
		...defaultNicknameProps,
		...defaultAvatarProps,
		...defaultVerifiedProps
	}
}

const SignUp = (props: SignUpProps) => {
	const [state, setState] = useState(defaultSignUpState);
	const {mobile} = useContext(MobileContext);
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
		let {success, errors, orgId} = await postOrg({...state.formInputs});
		if (success) {
			navigate(`/dashboard/org/${orgId}`);
		} else {
			alert("Something went wrong" + JSON.stringify(errors));
		}
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

export default SignUp;