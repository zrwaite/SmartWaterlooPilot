import "./Verified.css";

type VerifiedProps = {
	updateStep: Function,
	handleParentInputChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
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
				<button style={smallSpacing} onClick={buttonDisabled?()=>{}:() => props.updateStep(3)} className={buttonDisabled?"disabledButton signUpButton":"blackButton signUpButton"}>Submit</button>
				<button style={smallSpacing} onClick={() => props.updateStep(3)} className={"blackButton signUpButton"}>Skip</button>
			</div>
			<button onClick={() => props.updateStep(1)} className={"blackButton"}>Back</button>
		</>
	);
}

export default Verified;