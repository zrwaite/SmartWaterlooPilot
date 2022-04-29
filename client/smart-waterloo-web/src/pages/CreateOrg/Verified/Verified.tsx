import "./Verified.css";
import {ChangeEvent} from "react";

type VerifiedProps = {
	backStep: () => void,
	nextStep: () => void,
	handleParentInputChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void
	verifiedData: { businessNumber: string }
};
function Verified(props: VerifiedProps) {
	const smallSpacing = {margin: "0.5rem 0"}
	const bigSpacing = {margin: "1rem 0 2rem"}
	const buttonDisabled = props.verifiedData.businessNumber==="";
	return (
		<>
			<div className={"verifiedContainer"}>
				<h4>Get Verified 👀</h4>
				<p style={bigSpacing}>Verified accounts have blue checkmarks next to their names</p>
				<p>Business Number</p>
				<input onChange={props.handleParentInputChange} name="businessNumber" type="text" className="businessNumberInput" id="businessNumberInput" placeholder="#" value={props.verifiedData.businessNumber} />
				<button style={smallSpacing} onClick={buttonDisabled?()=>{}:props.nextStep} className={buttonDisabled?"disabledButton signUpButton":"blackButton signUpButton"}>Submit</button>
				<button style={smallSpacing} onClick={props.nextStep} className={"blackButton signUpButton"}>Skip</button>
			</div>
			<button onClick={props.backStep} className={"blackButton"}>Back</button>
		</>
	);
}

export default Verified;