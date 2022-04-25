import "./SurveyQuestion.css";
import {Question} from "../../../data/types/surveys"
import { useState } from "react";
import { getAnswersData } from "../../../data/getData";
interface SurveyQuestionProps extends Question {
	index: number;
	setParentAnswer: (arg0: number, arg1: string) => void;
	answer: string;
	owner: boolean;
	id: string;
	optional: boolean;
}

const defaultAnswers: {answer: string, question_id: number}[] = []
const SurveyQuestion = (props: SurveyQuestionProps) => {
	const [answers, setAnswers] = useState(defaultAnswers);
	const [dataPulled, setDataPulled] = useState(false);
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
		props.setParentAnswer(props.index, event.target.value);
    }
	const getSetAnswers = async () => {
		let {success, answers: newAnswers, errors} = await getAnswersData(props.id);
		if (!success && errors.length) alert(JSON.stringify(errors));
		else setAnswers(newAnswers)
	}
	
	let userInput;
	let userAnswers;
	
	if (!props.owner) {
		// if (props.answer_type==="short") {
		// 	userInput = <input className={"questionInput"} value={props.answer} onChange={handleInputChange} />
		// } else 
		if (props.answer_type==="text") {
			userInput = <textarea className={"questionTextarea"} value={props.answer} onChange={handleInputChange} />
		} else if (props.answer_type==="mc") {
			userInput = (
				<div className={"questionChoices"}>
					{props.choices?.map((choice, i) => {
						return (<div className={"questionChoice"} key={i}>
								<input type="radio" value={choice} checked={choice===props.answer} onChange={handleInputChange}/>
								<p>{choice}</p>
							</div>)
					})}
				</div>
			)
		} 
		// else if (props.answer_type==="check") {
		// 	userInput = (
		// 		<div className={"questionChoices"}>
		// 			{props.choices?.map((choice, i) => {
		// 				return (
		// 					<div className={"questionChoice"} key={i}>
		// 						<input type="checkbox" value={choice} checked={choice===props.answer} onChange={handleInputChange}/>
		// 						<p>{choice}</p>
		// 					</div>
		// 				)
		// 			})}
		// 		</div>
		// 	)
		// }
	} else {
		userAnswers = (<>
			<h6>Answers: {answers.length}</h6>
			<ul>
				{answers.map((answer, i) => {
					return (
						<li key={i} >{answer.answer}</li>
					)
				})}
			</ul>
		</>)
	}
	if (!dataPulled) {
		getSetAnswers();
		setDataPulled(true);
	}
	const fullWidth = {width: "100%"}
	const greyText = {color: "grey"};
	return (
		<div style={fullWidth}>
			<div className="questionPrompt">
				<div className={"questionIndexBubble"}>{props.index + 1}</div>
				<p>{props.prompt} <span style={greyText}>{props.optional&&"  *Optional"}</span></p>
			</div>
			<div>
				
				{props.owner?userAnswers:userInput}
			</div>
		</div>
	)
}

export default SurveyQuestion;