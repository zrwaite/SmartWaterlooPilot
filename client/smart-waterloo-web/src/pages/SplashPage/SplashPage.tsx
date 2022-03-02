// import {Link} from "react-router-dom";
import Navbar from "../../components/Navbar";

import "./SplashPage.css";
import Cookies from "universal-cookie";
//Todo change buttons to links
function SplashPage() {
	const cookies = new Cookies();
	cookies.set("back", "/");
    return (
		<>
			<Navbar root={true}/>
			<section className="splashPage">
				<div className="grey circle h1"></div>
				<h3>Name of the Project</h3>
			</section>
		</>
    );
}

export default SplashPage;