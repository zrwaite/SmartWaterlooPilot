import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import { MobileContext, AddressContext, IdContext } from "../../App";
import "./SignUp.css";
import Profile from "./Profile";
import Landing from "./Landing";
import MeetAvatar from "./MeetAvatar";
import Nickname from "./Nickname";
import MetaMask from "./MetaMask";
import StepBubbles from "../../components/StepBubbles";
import Cookies from "universal-cookie";
import { ActionMeta } from "react-select";
import userABI from "./utils/SmartUser.json";
// import orgABI from "./utils/SmartOrganisation.json"
import Web3 from "web3";
import { AbiItem } from 'web3-utils';
// import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { randomString } from "../../modules/randomData";

let web3 = new Web3(Web3.givenProvider);

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
	const getAvatarProps = () => {
		let avatarProps = defaultAvatarProps;
		let avatarPropKeys = Object.keys(defaultAvatarProps) as [keyof typeof defaultAvatarProps];
		avatarPropKeys.forEach(key => avatarProps[key] = state.formInputs[key]);
		return avatarProps;
	}
	const submitForm = async () => {
		//Setting account wallet with context
		let returnedAddress = await setAccounts();
		console.log(web3.eth.defaultAccount);
		setAddress(returnedAddress);
		let contractAddress;
		let contractABI;
		console.log(address);
			//User Information Smart Contract
			
			contractAddress = "0x584Bfa8354673eF5f9Ab17a3d041D8E2537b4dD8";
			contractABI = userABI;

			const userContract = await new web3.eth.Contract(contractABI as AbiItem[], contractAddress);

			await userContract.methods.addInfo(
				web3.eth.defaultAccount,
				qrId,
				(state.formInputs.day + state.formInputs.month + state.formInputs.year),
				state.formInputs.gender,
				(state.formInputs.height + state.formInputs.weight),
				state.formInputs.grade,
				state.formInputs.postalCode,
				state.formInputs.race,
				state.formInputs.religion,
				state.formInputs.sexuality,
				(state.formInputs.nickname + state.formInputs.avatarString)).send({ from: web3.eth.defaultAccount })
				.then(() => console.log("Information added successfully"))
				.catch((err: any) => console.log(err));
		// }
		// else {
		// 	contractAddress = "0x2656D9bB68FCB5F56Ebe8CC50C5a2D61c86cB6b0";
		// 	contractABI = orgABI;
		// 	const orgContract = await new web3.eth.Contract(contractABI as AbiItem[], contractAddress);
		// 	console.log(orgContract);
		// 	await orgContract.methods.createOrg(web3.eth.defaultAccount,qrId, state.formInputs.businessNumber, (state.formInputs.nickname + state.formInputs.avatarString), [""]).send({from: web3.eth.defaultAccount})
		// 	.then(() => console.log(`Organisation ${state.formInputs.businessNumber} created succesfully`))
		// 	.catch((err:any) => console.log(err));
		// }
		let path = `/dashboard/user`;
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
			<MetaMask backStep={() => updateStep(0)} nextStep={() => updateStep(2)} />
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
						{state.step ? <StepBubbles steps={["MetaMask", "Profile", "Avatar"]} step={state.step} /> : null}
						{stepSection}
					</div>)}
				</MobileContext.Consumer>
			</div>
		</>
	);
}

export default SignUp;