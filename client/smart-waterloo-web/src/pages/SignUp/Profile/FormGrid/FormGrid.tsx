// import {Link} from "react-router-dom";
import {genderOptions, religionOptions, sexualityOptions, raceOptions, ProfileFormGridState} from "./FormGridData";
// import {useState} from "react";
import Select, {ActionMeta} from "react-select";
type ProfileFormGridProps = {
	updateStep: Function,
	handleParentInputChange: (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => void,
	handleParentSelectChange:  (newValue: null|{ value: string; label: string; }, actionMeta: ActionMeta<{value: string,label: string}>) => void,
	formData: ProfileFormGridState
}
function ProfileFormGrid(props:ProfileFormGridProps) {
	let redText = {color: "red"};
	let greyText = {color: "grey"};
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
							<input name="day" id="dayInput" placeholder="DD" type={"text"} value={props.formData.day} onChange={props.handleParentInputChange}/>
							<pre> / </pre>
							<input name="month" id="monthInput" placeholder="MM"  type={"text"} value={props.formData.month} onChange={props.handleParentInputChange}/>
							<pre> / </pre>
							<input name="year" id="yearInput" placeholder="YY"  type={"text"} value={props.formData.year} onChange={props.handleParentInputChange}/>
						</div>
					</div>
					<div className="formDiv">
						<p>
							Gender<span style={redText}>*</span>
						</p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.gender} name={"gender"} onChange={props.handleParentSelectChange} options={genderOptions}/>
					</div>
					<div className="formDiv horizontal">
						<div>
							<p>
								Height<span style={redText}>*</span>
							</p>
							<div className="pill">
								<input name="height" id="heightInput" placeholder="168" type={"text"} value={props.formData.height} onChange={props.handleParentInputChange}/>
								<p className="pillText">cm</p>
							</div>
						</div>
						<div>
							<p>
								Weight<span style={redText}>*</span>
							</p>
							<div className="pill">
								<input name="weight" id="weightInput" placeholder="160" type={"text"} value={props.formData.weight} onChange={props.handleParentInputChange}/>
								<p className="pillText">lbs</p>
							</div>
						</div>
					</div>
					<div className="formDiv">
						<p>
							Religion <span style={greyText}>(Optional)</span>
						</p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.religion} name={"religion"} onChange={props.handleParentSelectChange} options={religionOptions}/>
					</div>
					<div className="formDiv">
						<p>
							Sexuality <span style={greyText}>(Optional)</span>
						</p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.sexuality} name={"sexuality"} onChange={props.handleParentSelectChange} options={sexualityOptions}/>
					</div>
					<div className="formDiv">
						<p>
							Race <span style={greyText}>(Optional)</span>
						</p>
						<Select className={"selectComponent"} defaultInputValue={props.formData.race} name={"race"} onChange={props.handleParentSelectChange} options={raceOptions}/>
					</div>
					<div className="formDiv horizontal">
						<div>
							<p>
								Grade<span style={redText}>*</span>
							</p>
							<div className="horizontal">
								<div className="pill">
									<p className="pillText">-</p>
									<input name="grade" id="gradeInput" type={"text"} value={props.formData.grade} onChange={props.handleParentInputChange}/>
									<p className="pillText">+</p>
								</div>
							</div>
						</div>
						<div>
							<p>
								Postal Code<span style={redText}>*</span>
							</p>
							<input name="postalCode" id="postalCodeInput" placeholder="M5A" type={"text"} value={props.formData.postalCode} onChange={props.handleParentInputChange}/>
						</div>
					</div>
				</section>
				<div className="formDiv">
					<button className="blackButton signUpButton" onClick={() => props.updateStep(3)}>
						Continue
					</button>
				</div>
			</main>
		</>
    );
}

export default ProfileFormGrid;