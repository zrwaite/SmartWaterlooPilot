// import {Link} from "react-router-dom";
import Navbar from "../../components/Navbar";

import "./SplashPage.css";
//Todo change buttons to links
function SplashPage() {
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