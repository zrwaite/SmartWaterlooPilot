import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import AvatarPNG from "../../images/fullAvatar.png";
import "./Login.css";
import cookies from "../../modules/cookies";
import { useContext, useState } from "react";
import { IdContext, MobileContext } from "../../App";
import { useNavigate, Link } from "react-router-dom";
import userABI from "../../data/utils/SmartUser.json";
import Web3 from "web3";
import { USE_WEB3, userContract } from "../../data/dataConstants";
import { web2Login } from "../../data/account";

declare const window: any;
let web3 = new Web3(Web3.givenProvider);

const Login = () => {
	let { mobile } = useContext(MobileContext);
	let { id } = useContext(IdContext);
	cookies.set("back", "/login");
	const signIn = "MetaMask Sign-in";
	const [currentUser, setCurrentUser] = useState("Tyragreenex");
	const [buttonText, setButtonText] = useState(signIn);
	const connected = "Connected!";

	const navigate = useNavigate();
	const defaultState: { inputs: { password: string }, errors: any[] } = { inputs: { password: "" }, errors: [] }
	const [state, setState] = useState(defaultState);
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
		let stateKeys: keyof typeof state.inputs;
		const name = event.target.name as typeof stateKeys;
		let partialState = { ...state };
		partialState.inputs[name] = event.target.value;
		setState(partialState);
	}

	//MetaMask Sign-In
	const checkConnectedWallet = async () => {
		try {
			if (!window.ethereum) {
				console.log("No MetaMask Account Found");
				return;
			} else {
				console.log("Metamask found!", window.ethereum);
			}
			const accounts = await window.ethereum.request({
				method: "eth_accounts",
			});

			if (accounts.length > 0) {
				// setCurrentUser(accounts[0]);
				setButtonText(connected);
			} else {
				console.log("No accounts found!");
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};
	//Delay function
	function delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	const connectWallet = async () => {
		if (!USE_WEB3 || !userContract) return console.error("Web3 method called in web2 mode");
		try {
			if (!window.ethereum) {
				console.log("No metamask account found!");
				return;
			}

			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});

			setCurrentUser(accounts[0].substring(0, 4) + "..." + accounts[0].substring(accounts[0].length - 4));
			setButtonText(connected);
			web3.eth.defaultAccount = accounts[0];
			const userData = await userContract.methods
				.getInfo(web3.eth.defaultAccount)
				.call();
			console.log(userData);
			if (userData !== [] || userData !== null) {
				await delay(1500);
			navigate("/dashboard/user");
			} else {
				navigate("/qr");
			}
			
		}
	catch (error) {
		console.log(error);
	}
};

const tryLogin = async (id: string, password: string) => {
	let errors = await web2Login(id, password);
	if (errors.length) {
		setState({ ...state, errors: errors });
	} else {
		navigate("/dashboard/user");
	}
}

useEffect(() => {
	// if (USE_WEB3) {
	// 	// checkConnectedWallet();
	// 	connectWallet();
	// } else {
	if (id === "") navigate("/qr");
	// }
});

return (
	<>
		<Navbar root={true} signedIn={false} />
		<div className={"PageContainer"}>
			<img src={AvatarPNG} alt="avatar" className={"avatarImage"} />
			<div className={mobile ? "loginFormMobile" : "loginFormDesktop DesktopPanel"}>
				{
					USE_WEB3 ? (<>
						<h4>Welcome back {currentUser}! 🎉</h4>
						<button onClick={connectWallet} className="blackButton loginButton">{buttonText}</button>
					</>) : (<>
						<p>Enter your password to continue using the Data Playground Pilot</p>
						<div className="passwordInput">
							<h4>Password</h4>
							<input name="password" id="passwordInput" placeholder="Password" type={"password"} value={state.inputs.password} onChange={handleInputChange} />
							<button onClick={() => tryLogin(id, state.inputs.password)} className="blackButton loginButton">Login</button>
						</div>
					</>)
				}
			</div>
			<div className={"errors"}>
				{state.errors.map((error, i) => {
					return <p key={i}>{error}</p>
				})}
			</div>
		</div>
	</>
);
}

export default Login;