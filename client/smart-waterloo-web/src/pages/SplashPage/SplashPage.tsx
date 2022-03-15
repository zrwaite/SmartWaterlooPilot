// import {Link} from "react-router-dom";
import Navbar from "../../components/Navbar";
import SWRLogo from "../../images/SWRLogo.png"
import "./SplashPage.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { OrgContext } from "../../App";
import {useContext} from "react";
//Todo change buttons to links
function SplashPage() {
	const cookies = new Cookies();
	cookies.set("back", "/");
	const navigate = useNavigate()
	const {setOrg} = useContext(OrgContext);
    return (
		<>
			<Navbar root={true}/>
			<section className="splashPage">
				<img src={SWRLogo} alt={"SWR Logo"} className="splashPageLogo"/>
				<h3>Name of the Project</h3>
				<button onClick={() => {navigate("/qr"); setOrg(true)}} className="blackButton splashPageButton">Sign Up Org</button>
				<button onClick={() => {navigate("/qr"); setOrg(false)}} className="blackButton splashPageButton">Sign Up User</button>
				<button onClick={() => navigate("/login")} className="blackButton splashPageButton">Log In</button>
			</section>
		</>
    );
}

export default SplashPage;