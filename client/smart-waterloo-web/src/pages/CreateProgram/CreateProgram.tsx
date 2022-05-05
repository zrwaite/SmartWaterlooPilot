import "./CreateProgram.css";
import {ChangeEvent, useContext, useState} from "react";
import { MobileContext } from "../../App";
import { programCategories } from "./CreateProgramData";
import { ActionMeta } from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { postProgram } from "../../data/postData";
import cookies from "../../modules/cookies";
import { forceNavigate } from "../../modules/navigate";
import { AccountChildProps } from "../AccountParent";
import {Question} from "../../data/types/surveys";
import QuestionController from "../../components/QuestionController";
import SelectOther from "../../components/SelectOther";
import {handleCheckboxChange, handleInputChange, handleSelectChange, handleSelectTextChange} from "../../modules/handleInput";


const DefaultQuestionArray:Question[] = [];
const DefaultCreateProgramState = {
	booleanInputs: {
		addQuestions: false
	},
	selectInputs: {
		category: {select: "", text: ""}
	},
	inputs: {
		name: "",
		min_age: "",
		max_age: "",
		start_date: "",
		end_date: "",
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

	const selectInputChangeFunctions = {
		handleParentSelectTextChange: (e: ChangeEvent<HTMLInputElement>) => handleSelectTextChange(e, state, setState),
		handleParentSelectChange: (newValue: null | { value: string; label: string; }, actionMeta: ActionMeta<{ value: string, label: string }>) => handleSelectChange(newValue, actionMeta, state, setState),
	}
	
	const handleParentInputChange =  (e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e, state, setState);
	const handleParentCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxChange(e, state, setState);

	const getSelectInputs = () => {
		let newSelectInputs = {
			category: ""
		}
		let selectInputKeys = Object.keys(newSelectInputs) as [keyof typeof newSelectInputs];
		selectInputKeys.forEach(key => {
			let value = state.selectInputs[key];
			newSelectInputs[key] = (value.select==="Other"?value.text:value.select);
		})
		return newSelectInputs;
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

	const programCreation = async () => {
		setCanSubmit(false);
		const validStartDate = (new Date(state.inputs.start_date)) < (new Date("3001-01-01"));
		const validEndDate = (new Date(state.inputs.end_date)) < (new Date("3001-01-01"));
		if (!validStartDate) alert("Invalid Start Date");
		else if (!validEndDate) alert("Invalid End Date");
		else if (!orgId) alert("missing orgId");
		else {
			let {success, errors, programId} = await postProgram(orgId, {...state.inputs, ...getSelectInputs()}, state.booleanInputs.addQuestions?state.questionInputs:[] );
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
						<input name={"name"} className={"createProgramInput"} placeholder={"Enter Text"} value={state.inputs.name} onChange={handleParentInputChange} />
					</div>
					<div className={"formQuestion"}>
						<p>Which age group is this program</p>
						<div className={"singleLineMultiInput"}>
							<p>Min age: </p>
							<input name={"min_age"} className={"createProgramMiniInput"} placeholder={"4"} value={state.inputs.min_age} onChange={handleParentInputChange} />
							<p>{"   Max age"}</p>
							<input name={"max_age"} className={"createProgramMiniInput"} placeholder={"8"} value={state.inputs.max_age} onChange={handleParentInputChange} />
						</div>
					</div>
					<div className={"formQuestion"}>
						<p>Start Date</p>
						<input type={"date"} name={"start_date"} value={state.inputs.start_date} onChange={handleParentInputChange} />
					</div>
					<div className={"formQuestion"}>
						<p>Start Time (ie: 12:15 am)</p>
						<input type={"time"} name={"start_time"} value={state.inputs.start_time} onChange={handleParentInputChange} />
					</div>
					<div className={"formQuestion"}>
						<p>End Date</p>
						<input type={"date"} name={"end_date"}  value={state.inputs.end_date} onChange={handleParentInputChange} />
					</div>
					<div className={"formQuestion"}>
						<p>End Time (ie: 12:15 am)</p>
						<input type={"time"} name={"end_time"} value={state.inputs.end_time} onChange={handleParentInputChange} />
					</div>
					<div className="formQuestion">
						<p>Category</p>
						<SelectOther data={state.selectInputs.category} name={"category"} {...selectInputChangeFunctions} options={programCategories} />
					</div>
					<div className={"formQuestion"}>
						<p>Location</p>
						<input name={"location"} className={"createProgramInput"} value={state.inputs.location} onChange={handleParentInputChange} />
					</div>
					<div className={"formQuestion"}>
						<p>Description</p>
						<textarea name={"description"} className={"questionTextarea createProgramTextArea"} value={state.inputs.description} onChange={handleParentInputChange} />
					</div> 
					<div className={"formQuestion"}>
						<p>Add Questions?</p>
						<input type={"checkbox"} name={"addQuestions"} checked={state.booleanInputs.addQuestions} onChange={handleParentCheckboxChange} />
					</div>
					{state.booleanInputs.addQuestions&&(
						<QuestionController questions={state.questionInputs} setQuestions={(newQuestions:Question[]) => {setState({...state, questionInputs: newQuestions})}}/>
					)}
					<p>*All fields are required to continue</p>
					<button onClick={canSubmit&&complete?programCreation:undefined} className={`createProgramButton ${canSubmit&&complete ? "blackButton" : "disabledButton"}`}>Create Program</button>
				</div>
			</div>
	</>
	);
}

export default CreateProgram;