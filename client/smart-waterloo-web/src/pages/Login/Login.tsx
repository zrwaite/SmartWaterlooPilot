import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import AvatarPNG from "../../images/fullAvatar.png";
import "./Login.css";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { MobileContext } from "../../App";
import { useNavigate } from "react-router-dom";

declare const window: any;

const Login = () => {
	let { mobile } = useContext(MobileContext);
	const cookies = new Cookies();
	cookies.set("back", "/login");
	const signIn = "MetaMask Sign-in";
	const [currentUser, setCurrentUser] = useState("Tyragreenex");
	const [buttonText, setButtonText] = useState(signIn);
	const connected = "Connected!";

	const navigate = useNavigate();
	// const [state, setState] = useState({inputs: {password: ""}});
	// const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
	// 	let stateKeys: keyof typeof state.inputs;
	// 	const name = event.target.name as typeof stateKeys;
	// 	let partialState = {...state};
	// 	partialState.inputs[name] = event.target.value;
	//     setState(partialState);
	// }

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
				// Do something before delay
				console.log('before delay')

				await delay(1800);

				navigate("/dashboard");
			})();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		checkConnectedWallet();
		connectWallet();
	});

	return (
		<>
			<Navbar root={true} />
			<div className={"PageContainer"}>
				<img src={AvatarPNG} alt="avatar" className={"avatarImage"} />
				<div className={mobile ? "loginFormMobile" : "loginFormDesktop DesktopPanel"}>
					<h4>Welcome back {currentUser}! 🎉</h4>
					{/* <p>Enter your password to continue using "Name of the Project"</p>
					<div className="passwordInput">
						<h6>Password</h6>
						<input name="password" id="passwordInput" placeholder="Password" type={"password"} value={state.inputs.password} onChange={handleInputChange}/>
						<Link to={"/forgotpassword"}>Forgot your password?</Link>
					</div> */}
					<button onClick={connectWallet} className="blackButton loginButton">{buttonText}</button>
				</div>
			</div>
		</>
	);
}

export default Login;