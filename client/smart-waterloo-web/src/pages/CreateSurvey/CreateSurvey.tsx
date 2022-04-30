import "./CreateSurvey.css";
import {ChangeEvent, useContext} from "react";
import {MobileContext} from "../../App";
import { useNavigate, useParams } from "react-router-dom";
import {useState} from "react";
import { postSurvey } from "../../data/postData";
import cookies from "../../modules/cookies";
import { forceNavigate } from "../../modules/navigate";
import { AccountChildProps } from "../AccountParent";
//Todo change buttons to links

import QuestionController from "../../components/QuestionController";

interface Question {
	id: string;
	prompt: string;
	optional: boolean;
    answer_type: "text"|"mc";
	choices: string[];
}
const DefaultStandardInput = {
	name: "",
	description: ""
}
const DefaultQuestionArray:Question[] = [];

const CreateSurvey = (props:AccountChildProps) => {
	const navigate = useNavigate();
	let {mobile} = useContext(MobileContext);
	let {orgId} = useParams();
	const [standardInputs, setStandardInputs] = useState(DefaultStandardInput);
	const [questionInputs, setQuestionInputs] = useState(DefaultQuestionArray);
	const [canSubmit, setCanSubmit] = useState(true);

	const handleStandardInputChange = (event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>) => {
		let inputKeys: keyof typeof standardInputs;
        const name = event.target.name as typeof inputKeys;
        let partialInput = {...standardInputs};
		partialInput[name] = event.target.value;
        setStandardInputs(partialInput);
    }

	const greyText = {color: "grey"};
	const link = {cursor: "pointer"};
	const tryPostSurvey = async () => {
		setCanSubmit(false);
		if (orgId) {
			let {success, errors, surveyId} = await postSurvey(orgId, {name: standardInputs.name, description: standardInputs.description, questions: questionInputs}) 
			if (success && surveyId) forceNavigate(`/survey/${surveyId}/org/${orgId}`);
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
					<h6 style={link} onClick={() => navigate(cookies.get("back"))}>Cancel</h6>	
					<h6 style={greyText}>Next</h6>
				</div>
				<div className={mobile? "":"DesktopPanel"}>
					<div className={"disclaimer"}>
						<div className={"infoBubble"}><p>i</p></div>
						<p>Please make sure information is correct. You will not be able to edit this event once it is published.</p>
					</div>
					<h2 className={"createEventHeader"}>Create New Survey 📝</h2>
					<div className={"formQuestion"}>
						<h6>Name of Survey</h6>
						<input name={"name"} className={"createEventInput"} placeholder={"Enter Text"} value={standardInputs.name} onChange={handleStandardInputChange} />
					</div>
					<div className={"formQuestion"}>
						<h6>Description</h6>
						<textarea name={"description"} className={"questionTextarea createEventTextArea"} value={standardInputs.description} onChange={handleStandardInputChange} />
					</div>
					<QuestionController questions={questionInputs} setQuestions={setQuestionInputs}/>
					<div className={"horizontal"}>
						<button onClick={canSubmit?tryPostSurvey:undefined} className={`addQuestionButton ${canSubmit?"blackButton":"disabledButton"}`}>Submit Survey!</button>
					</div>
				</div>
			</div>	
		</>
	);
}

export default CreateSurvey;