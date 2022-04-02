import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import AvatarPNG from "../../images/fullAvatar.png";
import "./Login.css";
import Cookies from "universal-cookie";
import { useContext, useState } from "react";
import { IdContext, MobileContext } from "../../App";
import { useNavigate, Link } from "react-router-dom";
import userABI from "../../data/utils/SmartUser.json";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import {USE_WEB3} from "../../data/dataConstants";
import {web2Login} from "../../data/account";

declare const window: any;
let web3 = new Web3(Web3.givenProvider);

const Login = () => {
	let { mobile } = useContext(MobileContext);
	let { id } = useContext(IdContext);
	const cookies = new Cookies();
	cookies.set("back", "/login");
	const signIn = "MetaMask Sign-in";
	const [currentUser, setCurrentUser] = useState("Tyragreenex");
	const [buttonText, setButtonText] = useState(signIn);
	const connected = "Connected!";

	const navigate = useNavigate();
	const defaultState:{inputs: {password: string}, errors: any[]} = {inputs: {password: ""}, errors: []}
	const [state, setState] = useState(defaultState);
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
		let stateKeys: keyof typeof state.inputs;
		const name = event.target.name as typeof stateKeys;
		let partialState = {...state};
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
			//Just a sleep function for it to wait before moving to dashboard
			(async () => {
				const contractAddress = "0x584Bfa8354673eF5f9Ab17a3d041D8E2537b4dD8";
				const contractABI = userABI;
				const userContract = await new web3.eth.Contract(
					contractABI as AbiItem[],
					contractAddress
				);
				await userContract.methods
					.getInfo(accounts[0])
					.call()
					// .then(() => (setOrg(false)))
					// .catch(() => (setOrg(true)));
				await delay(1500);
				navigate("/dashboard/user");
			})();
		} catch (error) {
			console.log(error);
		}
	};

	const tryLogin = async (id:string, password:string) => {
		let errors = await web2Login(id, password);
		if (errors.length) {
			setState({...state, errors: errors});
		} else {
			navigate("/dashboard/user");
		}
	}

	useEffect(() => {
		if (USE_WEB3) {
			checkConnectedWallet();
			connectWallet();
		} else {
			if (id==="") navigate("/qr");
		}
	});

	return (
		<>
			<Navbar root={true} />
			<div className={"PageContainer"}>
				<img src={AvatarPNG} alt="avatar" className={"avatarImage"} />
				<div className={mobile ? "loginFormMobile" : "loginFormDesktop DesktopPanel"}>
					{
						USE_WEB3?(<>
							<h4>Welcome back {currentUser}! 🎉</h4>
							<button onClick={connectWallet} className="blackButton loginButton">{buttonText}</button>
						</>):(<>
							<p>Enter your password to continue using the Data Playground Pilot</p>
							<div className="passwordInput">
								<h4>Password</h4>
								<input name="password" id="passwordInput" placeholder="Password" type={"password"} value={state.inputs.password} onChange={handleInputChange}/>
								<Link to={"/forgotpassword"}>Forgot your password?</Link>
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