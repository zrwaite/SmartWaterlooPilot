// import {Link} from "react-router-dom";
import { incomeOptions, genderOptions, religionOptions, sexualityOptions, raceOptions, ProfileFormGridState } from "./FormGridData";
import Select, { ActionMeta } from "react-select";
import { Link } from "react-router-dom";


type ProfileFormGridProps = {
	nextStep: () => void,
	handleParentInputChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void,
	handleParentSelectChange: (newValue: null | { value: string; label: string; }, actionMeta: ActionMeta<{ value: string, label: string }>) => void,
	handleParentCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
	formData: ProfileFormGridState
}
function ProfileFormGrid(props: ProfileFormGridProps) {
	let redText = { color: "red" };
	let greyText = { color: "grey" };
	let canContinue = (
		props.formData.day !== "" && !isNaN(parseInt(props.formData.day)) && parseInt(props.formData.day) <=31  && parseInt(props.formData.day) >0 &&
		props.formData.month !== "" && !isNaN(parseInt(props.formData.month)) && parseInt(props.formData.month) <=12  && parseInt(props.formData.month) >0 && 
		props.formData.year !== "" && !isNaN(parseInt(props.formData.year)) && parseInt(props.formData.year) <=3000  && parseInt(props.formData.year) >1000 &&
		props.formData.gender !== "" &&
		props.formData.postalCode !== "" &&
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
						<p>
							Date of Birth<span style={redText}>*</span>
						</p>
						<div className="horizontal">
							<input name="day" id="dayInput" placeholder="DD" type={"text"} value={props.formData.day} onChange={props.handleParentInputChange} />
							<pre> / </pre>
							<input name="month" id="monthInput" placeholder="MM" type={"text"} value={props.formData.month} onChange={props.handleParentInputChange} />
							<pre> / </pre>
							<input name="year" id="yearInput" placeholder="YYYY" type={"text"} value={props.formData.year} onChange={props.handleParentInputChange} />
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
					<div className="formDiv">
						<p>
							Household Income <span style={greyText}>(Optional)</span>
						</p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.household_income} name={"household_income"} onChange={props.handleParentSelectChange} options={incomeOptions} />
					</div>
					<div className="formDiv">
						<p>
							Primary Language <span style={greyText}>(Optional)</span>
						</p>
						<input name="primary_language" id="primaryLanguageInput" type={"text"} value={props.formData.primary_language} onChange={props.handleParentInputChange} />
					</div>
					<div className="formDiv">
						<p>
							Secondary Language <span style={greyText}>(Optional)</span>
						</p>
						<input name="secondary_language" id="secondaryLanguageInput" type={"text"} value={props.formData.secondary_language} onChange={props.handleParentInputChange} />
					</div>
					<div className="formDiv horizontal">
						<div>
							<p>
								Grade
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
					<div className="formDiv">
						<p>
							How did you hear about us? <span style={greyText}>(Optional)</span>
						</p>
						<input name="heard" id="heardInput" type={"text"} value={props.formData.heard} onChange={props.handleParentInputChange} />
					</div>
					<div className="formDiv">
						<p>How would you like to be contacted for upcoming programs/events?</p>
						<input name="contact" id="contactInput" type={"checkbox"} checked={props.formData.contact} onChange={props.handleParentCheckboxChange} />
					</div>
					<div className="formDiv">
						<p>Have you read and agree to our <Link to={"/codeofconduct"}>Code of Conduct?</Link></p>
						<input name="code_of_conduct" id="codeOfConductInput" type={"checkbox"} checked={props.formData.code_of_conduct} onChange={props.handleParentCheckboxChange} />
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