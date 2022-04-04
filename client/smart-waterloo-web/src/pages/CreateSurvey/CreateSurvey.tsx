import "./CreateSurvey.css";
import {useContext} from "react";
import {MobileContext} from "../../App";
// import {eventCategories} from "./CreateSurveyData";
// import Select, {ActionMeta} from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import {useState} from "react";
import { postSurvey } from "../../data/postData";
import cookies from "../../modules/cookies";
//Todo change buttons to links


interface Question {
	id: string;
	prompt: string;
    answer_type: "short"|"long"|"mc"|"check";
	choices: string[];
}
const DefaultStandardInput = {
	name: "",
	description: ""
}
const DefaultQuestionArray:Question[] = [];

const CreateSurvey = () => {
	const navigate = useNavigate();
	let {mobile} = useContext(MobileContext);
	let {orgId} = useParams();
	const [standardInputs, setStandardInputs] = useState(DefaultStandardInput);
	const [questionInputs, setQuestionInputs] = useState(DefaultQuestionArray);
	const handleStandardInputChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
		let inputKeys: keyof typeof standardInputs;
        const name = event.target.name as typeof inputKeys;
        let partialInput = {...standardInputs};
		partialInput[name] = event.target.value;
        setStandardInputs(partialInput);
    }
	const handleQuestionInputChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>, index: number, name: "prompt"|"answer_type") => {
        let partialInput = [...questionInputs];
		if (name==="answer_type") {
			partialInput[index][name] = event.target.value as "short"|"long"|"mc"|"check";
			if (partialInput[index].choices.length===0) partialInput[index].choices = ["", ""];
		} else {
			partialInput[index][name] = event.target.value;
		}
        setQuestionInputs(partialInput);
    }
	const handleAnswerInputChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>, qindex: number, aindex: number) => {
        let answers = questionInputs[qindex].choices;
		if (answers) {
			let partialInput = [...questionInputs];
			let qChoices = partialInput[qindex].choices
			if (qChoices) qChoices[aindex] = event.target.value;
			partialInput[qindex].choices = qChoices;
			setQuestionInputs(partialInput);
		}
    }
	const addQuestion = () => {
		let previousQuestions = [...questionInputs];
		previousQuestions.push({
			id: "",
			prompt: "",
			answer_type: "short",
			choices: []
		});
		setQuestionInputs(previousQuestions);
	}
	const removeQuestion = (qindex: number) => {
		let previousQuestions = [...questionInputs];
		previousQuestions.splice(qindex,1);
		setQuestionInputs(previousQuestions);
	}
	const addChoice = (qindex: number) => {
		let previousQuestions = [...questionInputs];
		previousQuestions[qindex].choices.push("");
		setQuestionInputs(previousQuestions);
	}
	const removeChoice = (qindex: number, aindex:number) => {
		let previousQuestions = [...questionInputs];
		previousQuestions[qindex].choices.splice(aindex,1);
		setQuestionInputs(previousQuestions);
	}
	const greyText = {color: "grey"};
	const link = {cursor: "pointer"};
	const tryPostSurvey = async () => {
		if (orgId) {
			let {success, errors, surveyId} = await postSurvey(orgId, {name: standardInputs.name, description: standardInputs.description, questions: questionInputs}) 
			if (success) navigate(`/survey/${surveyId}/org/${orgId}`);
			else alert(JSON.stringify(errors));
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
						<h6>Name of Event</h6>
						<input name={"name"} className={"createEventInput"} placeholder={"Enter Text"} value={standardInputs.name} onChange={handleStandardInputChange} />
					</div>
					<div className={"formQuestion"}>
						<h6>Description</h6>
						<textarea name={"description"} className={"questionTextarea createEventTextArea"} value={standardInputs.description} onChange={handleStandardInputChange} />
					</div>
					<div className={"formQuestion"}>
						<h6>Questions</h6>
						<div className="createSurveyQuestions">{
							questionInputs.map((question, i) => {
								return (
									<div key={i} className={"createSurveyQuestionSection"}>
										<div className={"horizontal"}>
											<div className={"questionNumber"}>{i}</div>
											<input name={"prompt"} className={"createEventInput"} placeholder={`Enter Question ${i}`} value={questionInputs[i].prompt} onChange={(e) => handleQuestionInputChange(e, i, "prompt")} />
											<button onClick={() => removeQuestion(i)} className={"blackButton"}>Remove</button>
										</div>
										<div className={"tabbedSection"}>	
											<div className={"questionTypeMCSection"} >
													{[
														{shortName:"short",fullName:"Short Text"},
														{shortName:"mc",fullName:"Multiple Choice"},
														{shortName:"long",fullName:"Long Text"},
														{shortName:"check",fullName:"Checkboxes"},
													].map((questionType, i2) => {
														return (<div key={i2}>
															<input name={`type${i}`} type="radio" value={questionType.shortName} checked={question.answer_type===questionType.shortName} onChange={(e) => handleQuestionInputChange(e, i, "answer_type")}/>
															<p>{questionType.fullName}</p>
														</div>)
													})}
											</div>
											{(questionInputs[i].answer_type==="mc"||questionInputs[i].answer_type==="check")?(
												<div className={"questionChoiceCreator"}>
													{questionInputs[i].choices.map((choice, i2) => {
														return (
															<div className={"horizontal"} key={i2}>
																<div className={"choiceNumber"}>{i2}</div>
																<input name={`choice${i}-${i2}`} className={"createEventInput"} placeholder={`Choice ${i2}`} value={choice} onChange={(e) => handleAnswerInputChange(e,i,i2)} />
																<button onClick={() => removeChoice(i, i2)} className={"blackButton"}>Remove</button>
															</div>
														)
													})}
													<div className={"horizontal"}>
														<button onClick={() => addChoice(i)}className={"addChoiceButton blackButton"}>+ Add Choice</button>
													</div>
												</div>
											):null}
										</div>
									</div>
								)
							})
						}</div>
					</div>
					<div className={"horizontal"}>
						<button onClick={() => addQuestion()}className={"addQuestionButton blackButton"}>+ Add Question</button>
					</div>
					<div className={"horizontal"}>
						<button onClick={tryPostSurvey}className={"addQuestionButton blackButton"}>Submit Survey!</button>
					</div>
				</div>
			</div>	
		</>
	);
}

export default CreateSurvey;