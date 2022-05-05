import "./CreateProgram.css";
import {ChangeEvent, useContext, useState} from "react";
import { MobileContext } from "../../App";
import { programCategories } from "./CreateProgramData";
import Select, { ActionMeta } from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { postProgram } from "../../data/postData";
import cookies from "../../modules/cookies";
import { forceNavigate } from "../../modules/navigate";
import { AccountChildProps } from "../AccountParent";
import {Question} from "../../data/types/surveys";
import QuestionController from "../../components/QuestionController";


//Todo change buttons to links
const DefaultQuestionArray:Question[] = [];
const DefaultCreateProgramState = {
	booleanInputs: {
		addQuestions: false
	},
	inputs: {
		name: "",
		min_age: "",
		max_age: "",
		start_date: "",
		end_date: "",
		category: "",
		description: "",
		location: "",
		start_time: "",
		end_time: "",
	},
	questionInputs: [...DefaultQuestionArray]
}
const CreateProgram = (props:AccountChildProps) => {
	const navigate = useNavigate();
	let { mobile } = useContext(MobileContext);
	let {orgId} = useParams();
	const [state, setState] = useState(DefaultCreateProgramState)
	const [canSubmit, setCanSubmit] = useState(true);
	const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
		let inputKeys: keyof typeof state.inputs;
		const name = event.target.name as typeof inputKeys;
		let partialInput = { ...state.inputs };
		partialInput[name] = event.target.value;
		setState({ ...state, inputs: partialInput });
	}
	const handleBooleanInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		let inputKeys: keyof typeof state.booleanInputs;
		const name = event.target.name as typeof inputKeys;
		let partialInput = { ...state.booleanInputs };
		partialInput[name] = event.target.checked;
		setState({ ...state, booleanInputs: partialInput });
	}
	const handleSelectChange = (newValue: null | { value: string; label: string; }, actionMeta: ActionMeta<{ value: string, label: string }>) => {
		let inputKeys: keyof typeof state.inputs;
		const name = actionMeta.name as typeof inputKeys;
		let partialInput = { ...state.inputs };
		partialInput[name] = newValue?.value || "";
		setState({ ...state, inputs: partialInput });
	}
	let complete = true;
	const values = Object.values(state.inputs);
	// const keys = Object.keys(state.inputs);
	for (let i=0; i<values.length; i++) {
		if (values[i] === "") {
			complete = false
		}
	}
	const greyText = { color: "grey" };
	const link = { cursor: "pointer" };

	const ProgramCreation = async () => {
		setCanSubmit(false);
		const validStartDate = (new Date(state.inputs.start_date)) < (new Date("3001-01-01"));
		const validEndDate = (new Date(state.inputs.end_date)) < (new Date("3001-01-01"));
		if (!validStartDate) alert("Invalid Start Date");
		else if (!validEndDate) alert("Invalid End Date");
		else if (!orgId) alert("missing orgId");
		else {
			let {success, errors, programId} = await postProgram(orgId, {...state.inputs}, state.booleanInputs.addQuestions?state.questionInputs:[] );
			if (success) return forceNavigate(`/Programdetails/${programId}/org/${orgId}`);
			else alert(JSON.stringify(errors));
		}
		setCanSubmit(true);
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
						<div className={"singleLineMultiInput"}>
							<p>Min age: </p>
							<input name={"min_age"} className={"createProgramMiniInput"} placeholder={"4"} value={state.inputs.min_age} onChange={handleInputChange} />
							<p>{"   Max age"}</p>
							<input name={"max_age"} className={"createProgramMiniInput"} placeholder={"8"} value={state.inputs.max_age} onChange={handleInputChange} />
						</div>
					</div>
					<div className={"formQuestion"}>
						<p>Start Date</p>
						<input type={"date"} name={"start_date"} value={state.inputs.start_date} onChange={handleInputChange} />
					</div>
					<div className={"formQuestion"}>
						<p>Start Time (ie: 12:15)</p>
						<input type={"time"} name={"start_time"} value={state.inputs.start_time} onChange={handleInputChange} />
					</div>
					<div className={"formQuestion"}>
						<p>End Date</p>
						<input type={"date"} name={"end_date"}  value={state.inputs.end_date} onChange={handleInputChange} />
					</div>
					<div className={"formQuestion"}>
						<p>End Time (ie: 16:15)</p>
						<input type={"time"} name={"end_time"} value={state.inputs.end_time} onChange={handleInputChange} />
					</div>
					<div className="formQuestion">
						<p>Category</p>
						<Select className={"selectComponent"} defaultInputValue={state.inputs.category} name={"category"} onChange={handleSelectChange} options={programCategories} />
					</div>
					<div className={"formQuestion"}>
						<p>Location</p>
						<input name={"location"} className={"createProgramInput"} value={state.inputs.location} onChange={handleInputChange} />
					</div>
					<div className={"formQuestion"}>
						<p>Description</p>
						<textarea name={"description"} className={"questionTextarea createProgramTextArea"} value={state.inputs.description} onChange={handleInputChange} />
					</div>
					<div className={"formQuestion"}>
						<p>Add Questions?</p>
						<input type={"checkbox"} name={"addQuestions"} checked={state.booleanInputs.addQuestions} onChange={handleBooleanInputChange} />
					</div>
					{state.booleanInputs.addQuestions&&(
						<QuestionController questions={state.questionInputs} setQuestions={(newQuestions:Question[]) => {setState({...state, questionInputs: newQuestions})}}/>
					)}
					<p>*All fields are required to continue</p>
					<button onClick={canSubmit&&complete?ProgramCreation:undefined} className={`createProgramButton ${canSubmit&&complete ? "blackButton" : "disabledButton"}`}>Create Program</button>
				</div>
			</div>
	</>
	);
}

export default CreateProgram;