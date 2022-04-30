// import {Link} from "react-router-dom";
import {
	householdCompositionOptions,
	incomeOptions,
	genderOptions,
	religionOptions,
	sexualityOptions,
	raceOptions,
	ProfileFormGridState,
	heardOptions, contactOptions
} from "./FormGridData";
import Select, { ActionMeta } from "react-select";
import { Link } from "react-router-dom";
import {ChangeEvent} from "react";


type ProfileFormGridProps = {
	nextStep: () => void,
	handleParentInputChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void,
	handleParentSelectChange: (newValue: null | { value: string; label: string; }, actionMeta: ActionMeta<{ value: string, label: string }>) => void,
	handleParentCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void,
	formData: ProfileFormGridState
}
function ProfileFormGrid(props: ProfileFormGridProps) {
	let redText = { color: "red" };
	let greyText = { color: "grey" };
	let canContinue = (
		props.formData.birth_day !== "" &&
		props.formData.gender !== "" &&
		props.formData.postalCode !== "" &&
		props.formData.city !== "" &&
		props.formData.code_of_conduct

	);
	return (
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
						<Select className={"selectComponent"} defaultInputValue={props.formData.gender} name={"gender"} onChange={props.handleParentSelectChange} options={genderOptions} />
					</div>
					<div className="formDiv">
						<p>Sexual Orientation <span style={greyText}>(Optional)</span></p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.sexuality} name={"sexuality"} onChange={props.handleParentSelectChange} options={sexualityOptions} />
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
						<Select className={"selectComponent"} defaultInputValue={props.formData.religion} name={"religion"} onChange={props.handleParentSelectChange} options={religionOptions} />
					</div>

					<div className="formDiv">
						<p>Race <span style={greyText}>(Optional)</span></p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.race} name={"race"} onChange={props.handleParentSelectChange} options={raceOptions} />
					</div>
					<div className="formDiv">
						<p>Combined Household Income <span style={greyText}>(Optional)</span></p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.household_income} name={"household_income"} onChange={props.handleParentSelectChange} options={incomeOptions} />
					</div>
					<div className="formDiv">
						<p>Household Composition <span style={greyText}>(Optional)</span></p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.household_composition} name={"household_composition"} onChange={props.handleParentSelectChange} options={householdCompositionOptions} />
					</div>
					<div className="formDiv">
						<p>How did you hear about us? <span style={greyText}>(Optional)</span></p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.heard} name={"heard"} onChange={props.handleParentSelectChange} options={heardOptions} />
					</div>
					<div className="formDiv">
						<p>How would you like to be contacted for upcoming programs/events? <span style={greyText}>(Optional)</span></p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.contact} name={"contact"} onChange={props.handleParentSelectChange} options={contactOptions} />
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
					<button className={`${canContinue?"blackButton":"disabledButton"} signUpButton`} onClick={canContinue?props.nextStep:()=>{}}>
						Continue
					</button>
				</div>
			</main>
		</>
	);
}

export default ProfileFormGrid;