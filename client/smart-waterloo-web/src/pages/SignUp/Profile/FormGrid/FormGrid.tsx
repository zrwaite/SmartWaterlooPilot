// import {Link} from "react-router-dom";
import {genderOptions, religionOptions, sexualityOptions, raceOptions, profileFormGridState} from "./FormGridData";
import {useState} from "react";
import Select, {ActionMeta} from "react-select";
//Todo change buttons to links
type ProfileFormGridProps = {
	updateStep: Function
}
function ProfileFormGrid(props:ProfileFormGridProps) {
	let [state, setState] = useState(profileFormGridState);
	let stateKeys: keyof typeof state;
	let handleInputChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
        const name = event.target.name as typeof stateKeys;
        let partialState = {...state};
		partialState[name] = event.target.value;
        setState(partialState);
    }
	const handleSelectChange = (newValue: null|{ value: string; label: string; }, actionMeta: ActionMeta<{value: string,label: string}>) => {
		const name = actionMeta.name as typeof stateKeys;
		let partialState = {...state};
		partialState[name] = newValue?.value || "";
        setState(partialState);
	}
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
							<input name="day" id="dayInput" placeholder="DD" type={"text"} value={state.day} onChange={handleInputChange}/>
							<pre> / </pre>
							<input name="month" id="monthInput" placeholder="MM"  type={"text"} value={state.month} onChange={handleInputChange}/>
							<pre> / </pre>
							<input name="year" id="yearInput" placeholder="YY"  type={"text"} value={state.year} onChange={handleInputChange}/>
						</div>
					</div>
					<div className="formDiv">
						<p>
							Gender<span style={redText}>*</span>
						</p>
						<Select name={"gender"} onChange={handleSelectChange} options={genderOptions}/>
					</div>
					<div className="formDiv horizontal">
						<div>
							<p>
								Height<span style={redText}>*</span>
							</p>
							<div className="pill">
								<input name="height" id="heightInput" placeholder="168" type={"text"} value={state.height} onChange={handleInputChange}/>
								<p className="pillText">cm</p>
							</div>
						</div>
						<div>
							<p>
								Weight<span style={redText}>*</span>
							</p>
							<div className="pill">
								<input name="weight" id="weightInput" placeholder="160" type={"text"} value={state.weight} onChange={handleInputChange}/>
								<p className="pillText">lbs</p>
							</div>
						</div>
					</div>
					<div className="formDiv">
						<p>
							Religion <span style={greyText}>(Optional)</span>
						</p>
						<Select name={"religion"} onChange={handleSelectChange} options={religionOptions}/>
					</div>
					<div className="formDiv">
						<p>
							Sexuality <span style={greyText}>(Optional)</span>
						</p>
						<Select name={"sexuality"} onChange={handleSelectChange} options={sexualityOptions}/>
					</div>
					<div className="formDiv">
						<p>
							Race <span style={greyText}>(Optional)</span>
						</p>
						<Select name={"race"} onChange={handleSelectChange} options={raceOptions}/>
					</div>
					<div className="formDiv horizontal">
						<div>
							<p>
								Grade<span style={redText}>*</span>
							</p>
							<div className="horizontal">
								<div className="pill">
									<p className="pillText">-</p>
									<input name="grade" id="gradeInput" type={"text"} value={state.grade} onChange={handleInputChange}/>
									<p className="pillText">+</p>
								</div>
							</div>
						</div>
						<div>
							<p>
								Postal Code<span style={redText}>*</span>
							</p>
							<input name="postalCode" id="postalCodeInput" placeholder="M5A" type={"text"} value={state.postalCode} onChange={handleInputChange}/>
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