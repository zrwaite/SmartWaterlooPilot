// import {Link} from "react-router-dom";
import Navbar from "../../components/Navbar";
import SWRLogo from "../../images/SWRLogo.png"
import "./SplashPage.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
//Todo change buttons to links
function SplashPage() {
	const cookies = new Cookies();
	cookies.set("back", "/");
	const navigate = useNavigate()
    return (
		<>
			<Navbar root={true}/>
			<section className="splashPage">
				<img src={SWRLogo} alt={"SWR Logo"} className="splashPageLogo"/>
				<h3>Name of the Project</h3>
				<button onClick={() => navigate("/qr")} className="blackButton splashPageButton">Scan Card</button>
			</section>
		</>
    );
}

export default SplashPage;