import "./SurveyQuestion.css";
import {Question} from "../../../data/Surveys"
interface SurveyQuestionProps extends Question {
	index: number;
}
const SurveyQuestion = (props: SurveyQuestionProps) => {
	switch (props.choices){
		
	}
	return (
		<div>
			<div className="horizontal">
				<div className={"questionIndexBubble"}>{props.index}</div>
				<p>{props.prompt}</p>
			</div>

		</div>
	)
}

export default SurveyQuestion;