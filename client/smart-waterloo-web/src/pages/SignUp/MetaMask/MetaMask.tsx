import "./MetaMask.css";
import { useState, useEffect, useRef, useContext } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { AddressContext } from "../../../App";
declare const window: any;

type MetaMaskProps = {
	backStep: () => void;
	nextStep: () => void;
}

export default function MetaMask(props: MetaMaskProps) {
	const ONBOARD_TEXT = "Let's install MetaMask!";
	const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
	const [isDisabled, setDisabled] = useState(false);
	const [accounts, setAccounts] = useState([""]);
	const { address, setAddress } = useContext(AddressContext);
	let onboarding = useRef<MetaMaskOnboarding>();
	const CONNECT_TEXT = 'Connect MetaMask Wallet';
	const CONNECTED_TEXT = `${accounts[0].substring(0, 4)} ... ${accounts[0].substring(accounts[0].length - 4)} Connected`;

	//Creating Onboarding Flow if metamask doesn't exist
	useEffect(() => {
		if (!(onboarding && onboarding.current)) {
			onboarding.current = new MetaMaskOnboarding();
		}
	}, []);

	//Connects automatically if wallet exists
	useEffect(() => {
		if (MetaMaskOnboarding.isMetaMaskInstalled()) {
			if (accounts.length > 0) {
				setButtonText(CONNECTED_TEXT);
				setDisabled(true);
				console.log(accounts[0]);
				if (onboarding && onboarding.current) {
					onboarding.current.stopOnboarding();
				}
			} else {
				setButtonText(CONNECT_TEXT);
				setDisabled(false);
			}
		}
	}, [accounts]);

	//handles changes in accounts
	useEffect(() => {
		async function handleNewAccounts(newAccounts: []) {
			setAccounts(newAccounts);
			setAddress(accounts[0]);
		}
		if (MetaMaskOnboarding.isMetaMaskInstalled()) {
			window.ethereum
				.request({ method: 'eth_requestAccounts' })
				.then(handleNewAccounts);
			window.ethereum.on('accountsChanged', handleNewAccounts);
			return () => {
				window.ethereum.removeListener('accountsChanged', handleNewAccounts);
			};
		}
	}, []);

	//Starts onboarding if metamask isn't installed
	const onClickOnboard = () => {
		try {
			if (MetaMaskOnboarding.isMetaMaskInstalled()) {
				window.ethereum
					.request({ method: 'eth_requestAccounts' })
					.then((newAccounts: []) => {
						setAccounts(newAccounts);
						setAddress(accounts[0]);
					})
					.catch((err: any) => {
						console.log(err);
					});
			} else {
				if ((onboarding && onboarding.current)) {
					onboarding.current.startOnboarding();
				}
			}
		}
		catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<div className={"MetaMaskContainer"}>
				<h4>Metamask 🔐</h4>
				<div className={"MetaMaskButtons"}>
					<button onClick={onClickOnboard} disabled={isDisabled} className={"blackButton connectMetaMaskButton"}>{buttonText}</button>
					<button onClick={isDisabled ? props.nextStep : () => { }} className={`${isDisabled ? "blackButton" : "disabledButton"} connectMetaMaskButton`}>Continue</button>
				</div>
			</div>
			<button onClick={props.nextStep} className={"blackButton"}>Back</button>
		</>
	);
}