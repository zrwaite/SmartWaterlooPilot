import Navbar from "../../components/Navbar";
import "./CodeOfConduct.css";
import {useContext} from "react";
import {MobileContext} from "../../App";
// import {Link} from "react-router-dom";
const CodeOfConduct = () => {
	let {mobile} = useContext(MobileContext);
	return (
		<>
			<Navbar root={false}/>
			<div className={"PageContainer"}>
				<div className={`CodeOfConductText ${mobile? "":"DesktopPanel"}`}>
					{mobile?<h5>Code Of Conduct</h5>:<h4 className={"CodeOfConductHeader"}>Code Of Conduct</h4>}
					<h6>This policy statement describes a code of ethical conduct or expected behaviour and the rights and responsibilities of participants and volunteers in all aspects of programming within any of the Cambridge Neighbourhoods.</h6>
					<h6>Rights of all participants and Volunteers</h6>
					<p>To be treated respectfully, fairly and with dignity. To have individual differences respected which may include various ethnic, psychological, spiritual, language, family, gender, sexual orientation or cultural issues. To feel safe and be free from any form of abuse. To feel accepted and included. To express opinions and be heard in a manner that is open, honest and accepting. To have privacy and confidentiality respected. To know what is expected, acceptable behaviour and to know the consequences of unacceptable behaviour. To receive the support of colleagues, participants, patients, the board of directors and the community. To provide feedback on services and programs in the organization. </p>
				</div>
			</div>	
		</>
	);
}

export default CodeOfConduct;