import Navbar from "../../components/Navbar";
import "./VerifyOrg.css";
import { useState } from "react";
import {useContext} from "react";
import {MobileContext} from "../../App";
import { verifyOrg } from "../../data/addData";
const ScanQR = () => {
	let {mobile} = useContext(MobileContext);
	let [inputs, setInputs] = useState({business_number: "", password: ""});


	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
		let inputKeys: keyof typeof inputs;
		const name = event.target.name as typeof inputKeys;
		let partialInput = { ...inputs };
		partialInput[name] = event.target.value;
		setInputs(partialInput);
	}

	const tryVerifyOrg = async () => {
		let {success, errors} = await verifyOrg(inputs.business_number, inputs.password );
		if (success) alert("Success!");
		else alert("ERROR: " + JSON.stringify(errors));
	}

	return (
		<>
			<Navbar root={false}/>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanel"}>
					<div className={"QRInfoPanel"}>
						<h2>Admin: Verify Organization Business Number</h2>
						<p>Business Number:</p>
						<input name="business_number" id="businessNumberInput" type={"text"} value={inputs.business_number} onChange={handleInputChange} />
						<p>Password:</p>
						<input name="password" id="passwordInput" type={"password"} value={inputs.password} onChange={handleInputChange} />
						<button onClick={tryVerifyOrg} className={"blackButton verifyOrgButton"}>Verify</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ScanQR;