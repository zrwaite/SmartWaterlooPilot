// import {Link} from "react-router-dom";
import { genderOptions, religionOptions, sexualityOptions, raceOptions, ProfileFormGridState } from "./FormGridData";
import {useEffect, useState} from "react";
import Select, { ActionMeta } from "react-select";
import userABI from "../../utils/SmartUser.json"
import { ethers } from "ethers";

declare var window: any;

type ProfileFormGridProps = {
	updateStep: Function,
	handleParentInputChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void,
	handleParentSelectChange: (newValue: null | { value: string; label: string; }, actionMeta: ActionMeta<{ value: string, label: string }>) => void,
	formData: ProfileFormGridState
}
function ProfileFormGrid(props: ProfileFormGridProps) {
	let redText = { color: "red" };
	let greyText = { color: "grey" };

	const [userAddress, setUserAddress] = useState([]);
	useEffect(() => {
		if(window.ethereum){
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then((accounts: []) => setUserAddress(accounts));
		}
	});

	//User Information Smart Contract
	const contractAddress = "0xE51426A3e2e793B740A95073C6598e82fF64A09a";
	const contractABI = userABI.abi;
	const onSubmit = () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const userContract = new ethers.Contract(
			contractAddress,
			contractABI,
			signer
		);
		
		console.log(userAddress[0],(props.formData.day + props.formData.month + props.formData.year), props.formData.gender, props.formData.height, props.formData.weight, props.formData.grade, props.formData.postalCode, props.formData.race, props.formData.religion, props.formData.sexuality);

		userContract.addInfo(provider, (props.formData.day + props.formData.month + props.formData.year), props.formData.gender, props.formData.height, props.formData.weight, props.formData.grade, props.formData.postalCode, props.formData.race, props.formData.religion, props.formData.sexuality);
		// //Just trying to retrieve information from the smart contrsct, so testing using the getTotalUsers function
		const d = userContract.getInfo(userAddress[0]);
		console.log(d);
		// props.updateStep(3);
	};

	return (
		<>
			<main>
				<section className="formGrid">
					<label htmlFor="day">Day</label>
					<label htmlFor="month">Month</label>
					<label htmlFor="year">Year</label>
					<div className="formDiv">
						<p>
							Date of Birth<span style={redText}>*</span>
						</p>
						<div className="horizontal">
							<input name="day" id="dayInput" placeholder="DD" type={"text"} value={props.formData.day} onChange={props.handleParentInputChange} />
							<pre> / </pre>
							<input name="month" id="monthInput" placeholder="MM" type={"text"} value={props.formData.month} onChange={props.handleParentInputChange} />
							<pre> / </pre>
							<input name="year" id="yearInput" placeholder="YY" type={"text"} value={props.formData.year} onChange={props.handleParentInputChange} />
						</div>
					</div>
					<div className="formDiv">
						<p>
							Gender<span style={redText}>*</span>
						</p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.gender} name={"gender"} onChange={props.handleParentSelectChange} options={genderOptions} />
					</div>
					<div className="formDiv horizontal">
						<div>
							<p>
								Height<span style={redText}>*</span>
							</p>
							<div className="pill">
								<input name="height" id="heightInput" placeholder="168" type={"text"} value={props.formData.height} onChange={props.handleParentInputChange} />
								<p className="pillText">cm</p>
							</div>
						</div>
						<div>
							<p>
								Weight<span style={redText}>*</span>
							</p>
							<div className="pill">
								<input name="weight" id="weightInput" placeholder="160" type={"text"} value={props.formData.weight} onChange={props.handleParentInputChange} />
								<p className="pillText">lbs</p>
							</div>
						</div>
					</div>
					<div className="formDiv">
						<p>
							Religion <span style={greyText}>(Optional)</span>
						</p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.religion} name={"religion"} onChange={props.handleParentSelectChange} options={religionOptions} />
					</div>
					<div className="formDiv">
						<p>
							Sexuality <span style={greyText}>(Optional)</span>
						</p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.sexuality} name={"sexuality"} onChange={props.handleParentSelectChange} options={sexualityOptions} />
					</div>
					<div className="formDiv">
						<p>
							Race <span style={greyText}>(Optional)</span>
						</p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.race} name={"race"} onChange={props.handleParentSelectChange} options={raceOptions} />
					</div>
					<div className="formDiv horizontal">
						<div>
							<p>
								Grade<span style={redText}>*</span>
							</p>
							<div className="horizontal">
								<div className="pill">
									<p className="pillText">-</p>
									<input name="grade" id="gradeInput" type={"text"} value={props.formData.grade} onChange={props.handleParentInputChange} />
									<p className="pillText">+</p>
								</div>
							</div>
						</div>
						<div>
							<p>
								Postal Code<span style={redText}>*</span>
							</p>
							<input name="postalCode" id="postalCodeInput" placeholder="M5A" type={"text"} value={props.formData.postalCode} onChange={props.handleParentInputChange} />
						</div>
					</div>
				</section>
				<div className="formDiv">
					<button className="blackButton signUpButton" onClick={onSubmit}>
						Continue
					</button>
				</div>
			</main>
		</>
	);
}

export default ProfileFormGrid;