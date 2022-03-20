import Navbar from "../../components/Navbar";
import "./About.css";
import {useContext} from "react";
import {MobileContext} from "../../App";
import AboutImage1 from "../../images/AboutUs1.png"
import AboutImage2 from "../../images/AboutUs.png"
// import {Link} from "react-router-dom";
const About = () => {
	let {mobile} = useContext(MobileContext);
	return (
		<>
			<Navbar root={false}/>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanel"}>
					{mobile?<h6>About</h6>:<h4 className={"AboutHeader"}>About</h4>}
					<img className={"aboutUsImage"} src={AboutImage1} alt={"aboutUs"}/>
					<img className={"aboutUsImage"} src={AboutImage2} alt={"aboutUs"}/>
				</div>
			</div>	
		</>
	);
}

export default About;