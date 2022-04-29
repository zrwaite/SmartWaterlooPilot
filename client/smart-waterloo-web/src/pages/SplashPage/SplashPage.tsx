// import {Link} from "react-router-dom";
import Navbar from "../../components/Navbar";
import SWRLogo from "../../images/SWRLogo.png"
import HomepageDescription from "../../images/HomepageDescription.png";
import HomepageDescriptionMobile from "../../images/HomepageDescriptionMobile.png";
import "./SplashPage.css";
import cookies from "../../modules/cookies";
import { useNavigate } from "react-router-dom";
import { hasWeb3Account, isSignedIn, logout, metaMaskInstalled } from "../../data/account";
import { useContext, useEffect } from "react";
import { MobileContext } from "../../App";
import { USE_WEB3 } from "../../data/dataConstants";
import { useState } from "react";


function SplashPage() {
	cookies.set("back", "/");
	const navigate = useNavigate();
	const signedIn = isSignedIn();
	const { mobile } = useContext(MobileContext);
	const [hasMetaMask, setHasMetaMask] = useState(false);
	const [hasAccount, setHasAccount] = useState(false);
	const metamask = async () => {
		const hasMetaMaskCheck = metaMaskInstalled();
		setHasMetaMask(hasMetaMaskCheck);
		console.log("hasMetaMaskCheck", hasMetaMaskCheck);
		const hasAccountCheck = await hasWeb3Account();
		setHasAccount(hasAccountCheck);
		console.log("hasAccountCheck", hasAccountCheck);
	}
	useEffect(() => {
		if (USE_WEB3) {
			metamask();
		}
	}, []);
	let buttons;
	if (!USE_WEB3) {
		if (signedIn) buttons = <>
			<button onClick={() => navigate("/dashboard/user")} className="blackButton splashPageButton">Dashboard</button>
			<button onClick={logout} className="blackButton splashPageButton">Logout</button>
		</>
		else buttons = <button onClick={() => navigate("/qr")} className="blackButton splashPageButton">Scan Card</button>
	} else {
		if (hasMetaMask) {
			if (hasAccount) buttons = <button onClick={() => navigate("/dashboard/user")} className="blackButton splashPageButton">Dashboard</button>
			else buttons = <button onClick={() => navigate("/qr")} className="blackButton splashPageButton">Scan Card</button>
		} else buttons = <button onClick={() => navigate("/metamask")} className="blackButton splashPageButton">Install MetaMask</button>
	}
	return (
		<>
			<Navbar signedIn={false} root={true} />
			<section className="splashPage">
				<img src={SWRLogo} alt={"SWR Logo"} className="splashPageLogo" />
				<h3>Data Playground Pilot</h3>
				<img src={mobile ? HomepageDescriptionMobile : HomepageDescription} alt={"SWR Description"} className="splashPageLogo" />
				<h4 className={"signedInIndicator"} >{signedIn ? "Signed In" : "Not signed in"}</h4>
				{buttons}
			</section>
		</>
	);
}

export default SplashPage;