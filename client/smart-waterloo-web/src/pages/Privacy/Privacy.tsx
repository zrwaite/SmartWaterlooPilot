import Navbar from "../../components/Navbar";
import "./Privacy.css";
import {useContext} from "react";
import {MobileContext} from "../../App";
const Privacy = () => {
	let {mobile} = useContext(MobileContext); 
	return (
		<>
			<Navbar root={false}/>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanel"}>
					{mobile?<h6 className={"PrivacyMobileHeader"}>Privacy Policy 😎</h6>:<h4 className={"PrivacyDesktopHeader"}>Privacy Policy 😎</h4>}
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

export default Privacy;