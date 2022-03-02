import Navbar from "../../components/Navbar";
import "./About.css";
import {useContext} from "react";
import {MobileContext} from "../../App";
// import {Link} from "react-router-dom";
//Todo change buttons to links
const About = () => {
	let {mobile} = useContext(MobileContext);
	return (
		<>
			<Navbar root={false}/>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanel"}>
					{mobile?<h6>About</h6>:<h4 className={"AboutHeader"}>About</h4>}
					<p>
						Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. 
						<br/>
						<br/>
						Explanation of the project in a brief and simple way. nd simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. nd simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. nd simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. 
						<br/>
						<br/>
						Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. nd simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. 
					</p>
				</div>
			</div>	
		</>
	);
}

export default About;