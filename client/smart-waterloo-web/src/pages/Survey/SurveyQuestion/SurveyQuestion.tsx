import "./SurveyQuestion.css";
import {Question} from "../../../data/Surveys"
interface SurveyQuestionProps extends Question {
	index: number;
	setParentAnswer: (arg0: number, arg1: string) => void;
	answer: string;
}
const SurveyQuestion = (props: SurveyQuestionProps) => {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
		props.setParentAnswer(props.index, event.target.value);
    }
	let userInput;
	if (props.type==="short") {
		userInput = <input className={"questionInput"} value={props.answer} onChange={handleInputChange} />
	} else if (props.type==="long") {
		userInput = <textarea className={"questionTextarea"} value={props.answer} onChange={handleInputChange} />
	} else if (props.type==="mc") {
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
	} else if (props.type==="check") {
		userInput = (
			<div className={"questionChoices"}>
				{props.choices?.map((choice, i) => {
					return (
						<div className={"questionChoice"} key={i}>
							<input type="checkbox" value={choice} checked={choice===props.answer} onChange={handleInputChange}/>
							<p>{choice}</p>
						</div>
					)
				})}
			</div>
		)
	}
	const fullWidth = {width: "100%"}
	return (
		<div style={fullWidth}>
			<div className="questionPrompt">
				<div className={"questionIndexBubble"}>{props.index + 1}</div>
				<p>{props.prompt}</p>
			</div>
			<div>
				{userInput}
			</div>
		</div>
	)
}

export default SurveyQuestion;