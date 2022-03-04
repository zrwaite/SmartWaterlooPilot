import Navbar from "../../components/Navbar";
import "./SharedData.css";
import {useContext} from "react";
import {MobileContext} from "../../App";
import sharedDataGraph from "../../images/SharedDataGraph.png"
// import {Link} from "react-router-dom";
//Todo change buttons to links
const SharedData = () => {
	let {mobile} = useContext(MobileContext);
	const imageStyle = {
		width: "100%"
	}
	return (
		<>
			<Navbar root={false}/>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanel"}>
					{mobile?<h6>What is being shared?</h6>:<h4 className={"SharedDataHeader"}>What is being shared?</h4>}
					<img style={imageStyle} src={sharedDataGraph} alt="data graph"/>
					<p>
					Any other details that are related to this section. 
					Any other details that are related to this section.
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
					sed do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
					ullamco laboris nisi ut aliquip ex ea commodo consequat. 
					Duis aute irure dolor in reprehenderit in voluptate velit 
					esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
					occaecat cupidatat non proident, sunt in culpa qui officia 
					deserunt mollit anim id est laborum.Lorem ipsum dolor sit 
					amet, consectetur adipiscing elit, sed do eiusmod tempor 
					incididunt ut labore et dolore magna aliqua. Ut enim ad 
					minim veniam, quis nostrud exercitation ullamco laboris nisi 
					ut aliquip ex ea commodo consequat.  Ut enim ad minim veniam, 
					quis nostrud exercitation ullamco laboris nisi ut aliquip ex 
					ea commodo consequat.  Ut enim ad minim veniam, quis nostrud 
					exercitation ullamco laboris nisi ut aliquip ex ea commodo 
					consequat. Ut enim ad minim veniam, quis nostrud exercitation.
					</p>
				</div>
			</div>	
		</>
	);
}

export default SharedData;