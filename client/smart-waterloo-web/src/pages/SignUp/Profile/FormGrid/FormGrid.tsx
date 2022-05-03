// import {Link} from "react-router-dom";
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
import Select, { ActionMeta } from "react-select";
import { Link } from "react-router-dom";
import {ChangeEvent} from "react";


type ProfileFormGridProps = {
	nextStep: () => void,
	handleParentInputChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void,
	handleParentSelectChange: (newValue: null | { value: string; label: string; }, actionMeta: ActionMeta<{ value: string, label: string }>) => void,
	handleParentSelectTextChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void,
	handleParentCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void,
	formData: ProfileFormGridState,
	selectFormData: ProfileFormGridSelectState,
}
function ProfileFormGrid(props: ProfileFormGridProps) {
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
						<Select className={"selectComponent"} defaultInputValue={props.selectFormData.gender.select} name={"gender"} onChange={props.handleParentSelectChange} options={genderOptions} />
						{props.selectFormData.gender.select==="Other"&&<input name={"gender"} value={props.selectFormData.gender.text} onChange={props.handleParentSelectTextChange} />}
					</div>
					<div className="formDiv">
						<p>Sexual Orientation <span style={greyText}>(Optional)</span></p>
						<Select className={"selectComponent"} defaultInputValue={props.selectFormData.sexuality.select} name={"sexuality"} onChange={props.handleParentSelectChange} options={sexualityOptions} />
						{props.selectFormData.sexuality.select==="Other"&&<input name={"sexuality"} value={props.selectFormData.sexuality.text} onChange={props.handleParentSelectTextChange} />}

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
						<Select className={"selectComponent"} defaultInputValue={props.selectFormData.religion.select} name={"religion"} onChange={props.handleParentSelectChange} options={religionOptions} />
						{props.selectFormData.religion.select==="Other"&&<input name={"religion"} value={props.selectFormData.religion.text} onChange={props.handleParentSelectTextChange} />}

					</div>

					<div className="formDiv">
						<p>Race <span style={greyText}>(Optional)</span></p>
						<Select className={"selectComponent"} defaultInputValue={props.selectFormData.race.select} name={"race"} onChange={props.handleParentSelectChange} options={raceOptions} />
						{props.selectFormData.race.select==="Other"&&<input name={"race"} value={props.selectFormData.race.text} onChange={props.handleParentSelectTextChange} />}

					</div>
					<div className="formDiv">
						<p>Combined Household Income <span style={greyText}>(Optional)</span></p>
						<Select className={"selectComponent"} defaultInputValue={props.selectFormData.household_income.select} name={"household_income"} onChange={props.handleParentSelectChange} options={incomeOptions} />
						{props.selectFormData.household_income.select==="Other"&&<input name={"household_income"} value={props.selectFormData.household_income.text} onChange={props.handleParentSelectTextChange} />}

					</div>
					<div className="formDiv">
						<p>Household Composition <span style={greyText}>(Optional)</span></p>
						<Select className={"selectComponent"} defaultInputValue={props.selectFormData.household_composition.select} name={"household_composition"} onChange={props.handleParentSelectChange} options={householdCompositionOptions} />
						{props.selectFormData.household_composition.select==="Other"&&<input name={"household_composition"} value={props.selectFormData.household_composition.text} onChange={props.handleParentSelectTextChange} />}

					</div>
					<div className="formDiv">
						<p>How did you hear about us? <span style={greyText}>(Optional)</span></p>
						<Select className={"selectComponent"} defaultInputValue={props.selectFormData.heard.select} name={"heard"} onChange={props.handleParentSelectChange} options={heardOptions} />
						{props.selectFormData.heard.select==="Other"&&<input name={"heard"} value={props.selectFormData.heard.text} onChange={props.handleParentSelectTextChange} />}

					</div>
					<div className="formDiv">
						<p>How would you like to be contacted for upcoming programs/events? <span style={greyText}>(Optional)</span></p>
						<Select className={"selectComponent"} defaultInputValue={props.selectFormData.contact.select} name={"contact"} onChange={props.handleParentSelectChange} options={contactOptions} />
						{props.selectFormData.contact.select==="Other"&&<input name={"contact"} value={props.selectFormData.contact.text} onChange={props.handleParentSelectTextChange} />}

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