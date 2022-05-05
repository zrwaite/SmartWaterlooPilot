import React, {ChangeEvent} from "react";
import "./Profile.css";
import {
	householdCompositionOptions,
	incomeOptions,
	genderOptions,
	religionOptions,
	sexualityOptions,
	raceOptions,
	ProfileFormGridState,
	heardOptions, contactOptions, ProfileFormGridSelectState
} from "./FormGridData";
import { ActionMeta } from "react-select";
import { Link } from "react-router-dom";
import SelectOther from "../../../components/SelectOther";

type ProfileProps = { 
	backStep: () => void,
	nextStep: () => void,
	handleParentInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	handleParentSelectChange:  (newValue: null|{ value: string; label: string; }, actionMeta: ActionMeta<{value: string,label: string}>) => void,
	handleParentCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	handleParentSelectTextChange: (event: ChangeEvent<HTMLInputElement>) => void,
	formData: ProfileFormGridState,
	selectFormData: ProfileFormGridSelectState
};

const Profile = (props: ProfileProps) => {	
	let redText = { color: "red" };
	let greyText = { color: "grey" };
	let canContinue = (
		props.formData.birth_day !== "" &&
		(props.selectFormData.gender.select+props.selectFormData.gender.text !== "") &&
		(props.selectFormData.gender.select+props.selectFormData.gender.text !== "Other") &&
		props.formData.postalCode !== "" &&
		props.formData.city !== "" &&
		props.formData.code_of_conduct
	);
	const tryNextStep = () => {
		if (!canContinue) return;		
		const validBirthDay = (new Date(props.formData.birth_day)) < (new Date("3001-01-01"));
		if (!validBirthDay) return alert("Invalid Birth day");
		props.nextStep();
	}
	return (
		<>
			<header>
				<h3>Complete Profile 📝</h3>
				<p>
					Explanation of why this information is being collected and how and why it will be used.
				</p>
				<p className="redtext">
					Fields marked with a red * are required.
				</p>
			</header>
			<>
			<main>
				<section className="formGrid">
					<label htmlFor="day">Day</label>
					<label htmlFor="month">Month</label>
					<label htmlFor="year">Year</label>
					<div className="formDiv">
						<p>City<span style={redText}>*</span></p>
						<input name="city" id="cityInput" type={"text"} value={props.formData.city} onChange={props.handleParentInputChange} />
					</div>
					<div className="formDiv">
						<p>Postal Code<span style={redText}>*</span></p>
						<input name="postalCode" id="postalCodeInput" placeholder="M5A" type={"text"} value={props.formData.postalCode} onChange={props.handleParentInputChange} />
					</div>
					<div className="formDiv">
						<p>Date of Birth<span style={redText}>*</span></p>
						<input name="birth_day" type={"date"} value={props.formData.birth_day} onChange={props.handleParentInputChange} />
					</div>
					<div className="formDiv">
						<p>Grade <span style={greyText}>(Optional)</span></p>
						<input name="grade" id="gradeInput" type={"text"} value={props.formData.grade} onChange={props.handleParentInputChange} />
					</div>
					<div className="formDiv horizontal">
						<div>
							<p>Height<span style={redText}>*</span></p>
							<div className="pill">
								<input name="height" id="heightInput" placeholder="168" type={"text"} value={props.formData.height} onChange={props.handleParentInputChange} />
								<p className="pillText">cm</p>
							</div>
						</div>
						<div>
							<p>Weight<span style={redText}>*</span></p>
							<div className="pill">
								<input name="weight" id="weightInput" placeholder="160" type={"text"} value={props.formData.weight} onChange={props.handleParentInputChange} />
								<p className="pillText">lbs</p>
							</div>
						</div>
					</div>
					<div className="formDiv">
						<p>Gender<span style={redText}>*</span></p>
						<SelectOther options={genderOptions} data={props.selectFormData.gender} name={"gender"} handleParentSelectChange={props.handleParentSelectChange} handleParentSelectTextChange={props.handleParentSelectTextChange}/>
					</div>
					<div className="formDiv">
						<p>Sexual Orientation <span style={greyText}>(Optional)</span></p>
						<SelectOther options={sexualityOptions} data={props.selectFormData.sexuality} name={"sexuality"} handleParentSelectChange={props.handleParentSelectChange} handleParentSelectTextChange={props.handleParentSelectTextChange}/>
					</div>
					<div className="formDiv">
						<p>Primary Language <span style={greyText}>(Optional)</span></p>
						<input name="primary_language" id="primaryLanguageInput" type={"text"} value={props.formData.primary_language} onChange={props.handleParentInputChange} />
					</div>
					<div className="formDiv">
						<p>Secondary Language <span style={greyText}>(Optional)</span></p>
						<input name="secondary_language" id="secondaryLanguageInput" type={"text"} value={props.formData.secondary_language} onChange={props.handleParentInputChange} />
					</div>
					<div className="formDiv">
						<p>Religion <span style={greyText}>(Optional)</span></p>
						<SelectOther options={religionOptions} data={props.selectFormData.religion} name={"religion"} handleParentSelectChange={props.handleParentSelectChange} handleParentSelectTextChange={props.handleParentSelectTextChange}/>
					</div>

					<div className="formDiv">
						<p>Race <span style={greyText}>(Optional)</span></p>
						<SelectOther options={raceOptions} data={props.selectFormData.race} name={"race"} handleParentSelectChange={props.handleParentSelectChange} handleParentSelectTextChange={props.handleParentSelectTextChange}/>
					</div>
					<div className="formDiv">
						<p>Combined Household Income <span style={greyText}>(Optional)</span></p>
						<SelectOther options={incomeOptions} data={props.selectFormData.household_income} name={"household_income"} handleParentSelectChange={props.handleParentSelectChange} handleParentSelectTextChange={props.handleParentSelectTextChange}/>
					</div>
					<div className="formDiv">
						<p>Household Composition <span style={greyText}>(Optional)</span></p>
						<SelectOther options={householdCompositionOptions} data={props.selectFormData.household_composition} name={"household_composition"} handleParentSelectChange={props.handleParentSelectChange} handleParentSelectTextChange={props.handleParentSelectTextChange}/>
					</div>
					<div className="formDiv">
						<p>How did you hear about us? <span style={greyText}>(Optional)</span></p>
						<SelectOther options={heardOptions} data={props.selectFormData.heard} name={"heard"} handleParentSelectChange={props.handleParentSelectChange} handleParentSelectTextChange={props.handleParentSelectTextChange}/>
					</div>
					<div className="formDiv">
						<p>How would you like to be contacted for upcoming programs/events? <span style={greyText}>(Optional)</span></p>
						<SelectOther options={contactOptions} data={props.selectFormData.contact} name={"contact"} handleParentSelectChange={props.handleParentSelectChange} handleParentSelectTextChange={props.handleParentSelectTextChange}/>
					</div>
					<div className="formDiv">
						{props.selectFormData.contact.select!==""&&(<>
							<p>Enter your contact information for the above: <span style={redText}>*</span></p>
							<input name="contact_info"  type={"text"} value={props.formData.contact_info} onChange={props.handleParentInputChange} />
						</>)}
					</div>
					<div className="formDiv">
						<p>Please Read the <Link to={"/codeofconduct"}>Code of Conduct</Link></p>
						<div className={"horizontal"}>
							<p>I have read and agree with the Code of Conduct<span style={redText}>*</span></p>
							<input name="code_of_conduct" id="codeOfConductInput" type={"checkbox"} checked={props.formData.code_of_conduct} onChange={props.handleParentCheckboxChange} />
						</div>
					</div>
				</section>
				<div className="formDiv">
					<button className={`${canContinue?"blackButton":"disabledButton"} signUpButton`} onClick={tryNextStep}>
						Continue
					</button>
				</div>
			</main>
		</>
			<button onClick={props.backStep} className={"blackButton"}>Back</button>
		</>
	);
}

export default Profile;