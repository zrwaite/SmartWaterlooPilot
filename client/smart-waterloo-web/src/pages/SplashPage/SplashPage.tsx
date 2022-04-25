// import {Link} from "react-router-dom";
import Navbar from "../../components/Navbar";
import SWRLogo from "../../images/SWRLogo.png"
import HomepageDescription from "../../images/HomepageDescription.png";
import HomepageDescriptionMobile from "../../images/HomepageDescriptionMobile.png";
import "./SplashPage.css";
import cookies from "../../modules/cookies";
import { useNavigate } from "react-router-dom";
import {isSignedIn, logout} from "../../data/account";
import { useContext } from "react";
import { MobileContext } from "../../App";
//Todo change buttons to links
function SplashPage() {
	cookies.set("back", "/");
	const navigate = useNavigate();
	const signedIn = isSignedIn();
	const {mobile} = useContext(MobileContext);
    return (
		<>
			<Navbar signedIn={false} root={true}/>
			<section className="splashPage">
				<img src={SWRLogo} alt={"SWR Logo"} className="splashPageLogo"/>
				<h3>Data Playground Pilot</h3>
				<img src={mobile?HomepageDescriptionMobile:HomepageDescription} alt={"SWR Description"} className="splashPageLogo"/>
				<h4 className={"signedInIndicator"} >{signedIn?"Signed In":"Not signed in"}</h4>
				{signedIn?(<>
					<button onClick={() => navigate("/dashboard/user")} className="blackButton splashPageButton">Dashboard</button>
					<button onClick={logout} className="blackButton splashPageButton">Logout</button>
				</>):
				<button onClick={() => navigate("/qr")} className="blackButton splashPageButton">Scan Card</button>}
			</section>
		</>
    );
}

export default SplashPage;