import "./MetaMask.css";
import {useState} from "react";

//Todo change buttons to links
type MetaMaskProps = {
	updateStep: Function
}
function MetaMask(props:MetaMaskProps) {
	const [state, setState] = useState({connected: false});
	const connectToMetaMask = () => {
		alert("Connected! (Not really tho)");
		setState({connected: true});
	}
    return (
		<>
			<div className={"MetaMaskContainer"}>
				<h4>Metamask 🔐</h4>
				<div className={"MetaMaskButtons"}>
					<button onClick={() => connectToMetaMask()} className={"blackButton connectMetaMaskButton"}>Connect to MetaMask</button>
					<button onClick={state.connected? () => props.updateStep(2): () => {}} className={`${state.connected?"blackButton":"disabledButton"} connectMetaMaskButton`}>Continue</button>
				</div>
			</div>
			<button onClick={() => props.updateStep(0)} className={"blackButton"}>Back</button>
		</>
    );
}

export default MetaMask;