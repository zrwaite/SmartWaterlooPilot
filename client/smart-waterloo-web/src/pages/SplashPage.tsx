import "../styles/styles.css";
// import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";

import "../styles/splashpage.css";
//Todo change buttons to links
function SplashPage() {
    return (
		<>
			<Navbar />
			<section className="splashPage">
				<div className="grey circle h1">

				</div>
				<h3>Name of the Project</h3>
			</section>
		</>
    );
}

export default SplashPage;