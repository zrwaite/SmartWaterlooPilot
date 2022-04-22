import "./CreateProgram.css";
import { useContext, useState } from "react";
import { MobileContext } from "../../App";
import { programCategories } from "./CreateProgramData";
import Select, { ActionMeta } from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { postProgram } from "../../data/postData";
import cookies from "../../modules/cookies";
import { forceNavigate } from "../../modules/navigate";

//Todo change buttons to links
const DefaultCreateProgramState = {
	inputs: {
		name: "",
		age: "",
		start_day: "",
		start_month: "",
		start_year: "",
		end_day: "",
		end_month: "",
		end_year: "",
		category: "",
		description: ""
	}
}
const CreateProgram = () => {
	const navigate = useNavigate();
	let { mobile } = useContext(MobileContext);
	let {orgId} = useParams();
	const [state, setState] = useState(DefaultCreateProgramState)
	const [canSubmit, setCanSubmit] = useState(true);
	const handleInputChange = (Program: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		let inputKeys: keyof typeof state.inputs;
		const name = Program.target.name as typeof inputKeys;
		let partialInput = { ...state.inputs };
		partialInput[name] = Program.target.value;
		setState({ ...state, inputs: partialInput });
	}
	const handleSelectChange = (newValue: null | { value: string; label: string; }, actionMeta: ActionMeta<{ value: string, label: string }>) => {
		let inputKeys: keyof typeof state.inputs;
		const name = actionMeta.name as typeof inputKeys;
		let partialInput = { ...state.inputs };
		partialInput[name] = newValue?.value || "";
		setState({ ...state, inputs: partialInput });
	}
	const complete = Object.values(state.inputs).every(answer => answer !== "");
	const greyText = { color: "grey" };
	const link = { cursor: "pointer" };

	const ProgramCreation = async () => {
		setCanSubmit(false);
		if (orgId) {
			let {success, errors, programId} = await postProgram(orgId, {...state.inputs});
			if (success) forceNavigate(`/Programdetails/${programId}/org/${orgId}`);
			else {
				alert(JSON.stringify(errors));
				setCanSubmit(true);
			}
		}
	}
	
	return (
		<>
			<div className={"PageContainer"}>
				<div className={"createNavbar"}>
					<h6 style={link} onClick={() => navigate(cookies.get('back'))}>Cancel</h6>
					<h6 style={complete ? link : greyText}>Next</h6>
				</div>
				<div className={mobile ? "" : "DesktopPanel"}>
					<div className={"disclaimer"}>
						<div className={"infoBubble"}><p>i</p></div>
						<p>Please make sure information is correct. You will not be able to edit this Program once it is published.</p>
					</div>
					<h2 className={"createProgramHeader"}>Create New Program ✏️</h2>
					<div className={"formQuestion"}>
						<p>Name of Program</p>
						<input name={"name"} className={"createProgramInput"} placeholder={"Enter Text"} value={state.inputs.name} onChange={handleInputChange} />
					</div>
					<div className={"formQuestion"}>
						<p>Which age group is this program</p>
						{["4-6", "4-8", "4-12", "6-12", "8-12"].map((age, i) => {
							return (
								<div key={i} className={"mcInputs"}>
									<input name={"age"} type="radio" value={age} checked={age === state.inputs.age} onChange={handleInputChange} />
									<p>{age}</p>
								</div>
							)
						})}
					</div>
					<div className={"formQuestion"}>
						<p>Start Date</p>
						<div className={"singleLineMultiInput"}>
							<input name={"start_day"} className={"createProgramMiniInput"} placeholder={"DD"} value={state.inputs.start_day} onChange={handleInputChange} />
							<h6>/</h6>
							<input name={"start_month"} className={"createProgramMiniInput"} placeholder={"MM"} value={state.inputs.start_month} onChange={handleInputChange} />
							<h6>/</h6>
							<input name={"start_year"} className={"createProgramMiniInput"} placeholder={"YY"} value={state.inputs.start_year} onChange={handleInputChange} />
						</div>
					</div>
					<div className={"formQuestion"}>
						<p>End Date</p>
						<div className={"singleLineMultiInput"}>
							<input name={"end_day"} className={"createProgramMiniInput"} placeholder={"DD"} value={state.inputs.end_day} onChange={handleInputChange} />
							<h6>/</h6>
							<input name={"end_month"} className={"createProgramMiniInput"} placeholder={"MM"} value={state.inputs.end_month} onChange={handleInputChange} />
							<h6>/</h6>
							<input name={"end_year"} className={"createProgramMiniInput"} placeholder={"YY"} value={state.inputs.end_year} onChange={handleInputChange} />
						</div>
					</div>
					<div className="formQuestion">
						<p>Category</p>
						<Select className={"selectComponent"} defaultInputValue={state.inputs.category} name={"category"} onChange={handleSelectChange} options={programCategories} />
					</div>
					<div className={"formQuestion"}>
						<p>Description</p>
						<textarea name={"description"} className={"questionTextarea createProgramTextArea"} value={state.inputs.description} onChange={handleInputChange} />
					</div>
					<p>*All fields are required to continue</p>
					<button onClick={canSubmit&&complete?ProgramCreation:undefined} className={`createProgramButton ${canSubmit&&complete ? "blackButton" : "disabledButton"}`}>Create Program</button>
				</div>
			</div>
	</>
	);
}

export default CreateProgram;