// import {Link} from "react-router-dom";
import {useState} from "react";
import Select from "react-select";
//Todo change buttons to links
function ProfileFormGrid() {
	let [state, setState] = useState({
        day: "",
        month: "",
        year: "",
		gender: "",
		height: "",
		weight: "",
		grade: "7",
		postalCode: "",
		race: "",
		religion: "",
		sexuality: ""
    });
	let stateKeys: keyof typeof state;
	type stateKey = typeof stateKeys;
	let handleInputChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
        const target = event.target;
        const value = target.value;
        const name = target.name as stateKey;
        let partialState = {...state};
		partialState[name] = value;
        setState(partialState);
    }
    // handleInputChange = handleInputChange.bind(this);
	let redText = {color: "red"};
	let greyText = {color: "grey"};
	const genderOptions = [
		{ value: "Select", label: "--Select--", isDisabled: true},
		{ value: "Male", label: "Male"},
		{ value: "Female", label: "Female"},
		{ value: "Non-Binary", label: "Non-Binary"},
		{ value: "Genderqueer", label: "Genderqueer"},
		{ value: "Agender", label: "Agender"},
		{ value: "Genderfluid", label: "Genderfluid"},
		{ value: "Other", label: "Other"},
		{ value: "Prefer not to say", label: "Prefer not to say"}
	]
	const religionOptions = [
		{ value: "Select", label: "--Select--", isDisabled: true},
		{ value: "Muslim", label: "Muslim"},
		{ value: "Jewish", label: "Jewish"},
		{ value: "Satanist", label: "Satanist"},
		{ value: "Atheist", label: "Atheist"},
		{ value: "Agnostic", label: "Agnostic"},
		{ value: "Scientologist", label: "Scientologist"},
		{ value: "Buddhist", label: "Buddhist"},
		{ value: "Sikh", label: "Sikh"},
		{ value: "Hindu", label: "Hindu"},
		{ value: "Taoism", label: "Taoism"},
		{ value: "Jainism", label: "Jainism"},
		{ value: "Pastafarianism", label: "Pastafarianism"},
		{ value: "Spiritual", label: "Not religious, but like, spiritual"},
		{ value: "Other", label: "Other"}
	]
	const sexualityOptions = [
		{ value: "Select", label: "--Select--" },
		{ value: "Asexual", label: "Asexual" },
		{ value: "Bisexual", label: "Bisexual" },
		{ value: "Heterosexual", label: "Heterosexual" },
		{ value: "Demisexual", label: "Demisexual" },
		{ value: "Lesbian", label: "Lesbian" },
		{ value: "Gay", label: "Gay" },
		{ value: "Pansexual", label: "Pansexual" },
		{ value: "Aromantic", label: "Aromantic" },
		{ value: "Bicurios", label: "Bicurios" },
		{ value: "Questioning", label: "Questioning" },
		{ value: "Fluid", label: "Fluid" },
		{ value: "Other", label: "Other" }
	]
	const raceOptions = [
		{ value: "Select", label: "--Select--" },
		{ value: "White", label: "White" },
		{ value: "Black", label: "Black or African American" },
		{ value: "Native", label: "Native American or Alaska Native" },
		{ value: "Asian", label: "Asian" },
		{ value: "Pacific", label: "Native Hawaiian or Other Pacific Islander" },
		{ value: "Hispanic", label: "Hispanic" },
		{ value: "Other", label: "Other" }
	]
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
						{/* <select defaultValue={"--Select--"} name={"gender"} value={state.gender} onChange={handleInputChange}>
							
						</select> */}
						<Select options={genderOptions}/>
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
						<Select options={religionOptions}/>
					</div>
					<div className="formDiv">
						<p>
							Sexuality <span style={greyText}>(Optional)</span>
						</p>
						<Select options={sexualityOptions}/>
					</div>
					<div className="formDiv">
						<p>
							Race <span style={greyText}>(Optional)</span>
						</p>
						<Select options={raceOptions}/>
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
					<button className="continueButton">
						Continue
					</button>
				</div>
			</main>
		</>
    );
}

export default ProfileFormGrid;