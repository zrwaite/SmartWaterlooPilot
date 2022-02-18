import "../styles/styles.css";
// import {Link} from "react-router-dom";
import "../styles/profile.css";
//Todo change buttons to links
function Account() {
	let redText = {color: "red"};
	let greyText = {color: "grey"};
    return (
		<>
			<section className="progressBubbles">
				<hr className="bubblesLine"/>
				<div className="bubbles">
					<div className="bubbleItem">
						<div className="bubble">1</div>
						<p>Password</p>
					</div>
					<div className="bubbleItem">
						<div className="bubble selectedBubble">2</div>
						<p>Profile</p>
					</div>
					<div className="bubbleItem">
						<div className="bubble">3</div>
						<p>Avatar</p>
					</div>
				</div>
			</section>
			<header>
				<h3>Complete Profile 📝</h3>
				<p>
					Explanation of why this information is being collected and how and why it will be used.
				</p>
				<p className="redtext">
					Fields marked with a red * are required.
				</p>
			</header>
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
							<input name="day" id="dayInput" placeholder="DD"/>
							<pre> / </pre>
							<input name="month" id="monthInput" placeholder="MM"/>
							<pre> / </pre>
							<input name="year" id="yearInput" placeholder="YY"/>
						</div>
					</div>
					<div className="formDiv">
						<p>
							Gender<span style={redText}>*</span>
						</p>
						<select>
							<option selected disabled hidden>--Select--</option>
							<option>Male</option>
							<option>Female</option>
							<option>Non-Binary</option>
							<option>Genderqueer</option>
							<option>Agender</option>
							<option>Genderfluid</option>
							<option>Other</option>
							<option>Prefer not to say</option>
						</select>
					</div>
					<div className="formDiv horizontal">
						<div>
							<p>
								Height<span style={redText}>*</span>
							</p>
							<div className="pill">
								<input name="height" id="heightInput" placeholder="168"/>
								<p className="pillText">cm</p>
							</div>
						</div>
						<div>
							<p>
								Weight<span style={redText}>*</span>
							</p>
							<div className="pill">
								<input name="weight" id="weightInput" placeholder="160"/>
								<p className="pillText">lbs</p>
							</div>
						</div>
					</div>
					<div className="formDiv">
						<p>
							Religion <span style={greyText}>(Optional)</span>
						</p>
						<select>
							<option selected disabled hidden>--Select--</option>
							<option>Muslim</option>
							<option>Jewish</option>
							<option>Satanist</option>
							<option>Atheist</option>
							<option>Agnostic</option>
							<option>Scientologist</option>
							<option>Buddhist</option>
							<option>Sikh</option>
							<option>Hindu</option>
							<option>Taoism</option>
							<option>Jainism</option>
							<option>Pastafarianism</option>
							<option>Greek Mythology</option>
							<option>Spaghetti Monster</option>
							<option>Roman Mythology</option>
							<option>Norse Mythology</option>
							<option>Not religious, but like, spiritual</option>
							<option>Other</option>
						</select>
					</div>
					<div className="formDiv">
						<p>
							Sexuality <span style={greyText}>(Optional)</span>
						</p>
						<select>
							<option selected disabled hidden>--Select--</option>
							<option>Asexual</option>
							<option>Bisexual</option>
							<option>Heterosexual</option>
							<option>Demisexual</option>
							<option>Lesbian</option>
							<option>Gay</option>
							<option>Pansexual</option>
							<option>Aromantic</option>
							<option>Bicurios</option>
							<option>Questioning</option>
							<option>Fluid</option>
							<option>Other</option>
						</select>
					</div>
					<div className="formDiv">
						<p>
							Race <span style={greyText}>(Optional)</span>
						</p>
						<select>
							<option selected disabled hidden>--Select--</option>
							<option>White</option>
							<option>Black or African American</option>
							<option>Native American or Alaska Native</option>
							<option>Asian</option>
							<option>Native Hawaiian or Other Pacific Islander</option>
							<option>Hispanic</option>
							<option>Other</option>
						</select>
					</div>
					<div className="formDiv horizontal">
						<div>
							<p>
								Grade<span style={redText}>*</span>
							</p>
							<div className="horizontal">
								<div className="pill">
									<p className="pillText">-</p>
									<input name="grade" id="gradeInput" value="7"/>
									<p className="pillText">+</p>
								</div>
							</div>
						</div>
						<div>
							<p>
								Postal Code<span style={redText}>*</span>
							</p>
							<input name="postalCode" id="postalCodeInput" placeholder="M5A"/>
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

export default Account;