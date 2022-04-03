// import {Link} from "react-router-dom";
import Navbar from "../../components/Navbar";
import SWRLogo from "../../images/SWRLogo.png"
import "./SplashPage.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {isSignedIn} from "../../data/account";
//Todo change buttons to links
function SplashPage() {
	const cookies = new Cookies();
	cookies.set("back", "/");
	const navigate = useNavigate();
	const signedIn = isSignedIn();
    return (
		<>
			<Navbar signedIn={false} root={true}/>
			<section className="splashPage">
				<img src={SWRLogo} alt={"SWR Logo"} className="splashPageLogo"/>
				<h3>Data Playground Pilot</h3>
				<h4 className={"signedInIndicator"} >{signedIn?"Signed In":"Not signed in"}</h4>
				{signedIn?<button onClick={() => navigate("/dashboard/user")} className="blackButton splashPageButton">Dashboard</button>:
				<button onClick={() => navigate("/qr")} className="blackButton splashPageButton">Scan Card</button>}

			</section>
		</>
    );
}

export default SplashPage;