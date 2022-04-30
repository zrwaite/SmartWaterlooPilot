import {
    addChoice, addQuestion,
    handleAnswerInputChange, handleQuestionBooleanChange,
    handleQuestionInputChange,
    removeChoice,
    removeQuestion
} from "./questionFunctions";
import {Question} from "../../data/types/surveys";

interface QuestionControllerProps {
    questions: Question[],
    setQuestions: (newQuestions: Question[]) => void
}
const QuestionController = (props: QuestionControllerProps) => {
    return (
        <>
            <div className={"formQuestion"}>
                <h6>Questions</h6>
                <div className="createSurveyQuestions">{
                    props.questions.map((question, i) => {
                        return (
                            <div key={i} className={"createSurveyQuestionSection"}>
                                <div className={"horizontal"}>
                                    <div className={"questionNumber"}>{i}</div>
                                    <input name={"prompt"} className={"createEventInput"} placeholder={`Enter Question ${i}`} value={props.questions[i].prompt} onChange={(e) => handleQuestionInputChange(e, i, "prompt", props.questions, props.setQuestions)} />
                                    <button onClick={() => removeQuestion(i, props.questions, props.setQuestions)} className={"blackButton"}>Remove</button>
                                </div>
                                <div className={"tabbedSection"}>
                                    <div className={"questionTypeMCSection"} >
                                        {[
                                            {shortName:"text",fullName:"Text"},
                                            {shortName:"mc",fullName:"Multiple Choice"},
                                            // {shortName:"long",fullName:"Long Text"},
                                            // {shortName:"check",fullName:"Checkboxes"},
                                        ].map((questionType, i2) => {
                                            return (<div key={i2}>
                                                <input name={`type${i}`} type="radio" value={questionType.shortName} checked={question.answer_type===questionType.shortName} onChange={(e) => handleQuestionInputChange(e, i, "answer_type", props.questions, props.setQuestions)}/>
                                                <p>{questionType.fullName}</p>
                                            </div>)
                                        })}
                                    </div>
                                    {(props.questions[i].answer_type==="mc")?(
                                        <div className={"questionChoiceCreator"}>
                                            {props.questions[i].choices.map((choice, i2) => {
                                                return (
                                                    <div className={"horizontal"} key={i2}>
                                                        <div className={"choiceNumber"}>{i2}</div>
                                                        <input name={`choice${i}-${i2}`} className={"createEventInput"} placeholder={`Choice ${i2}`} value={choice} onChange={(e) => handleAnswerInputChange(e,i,i2, props.questions, props.setQuestions)} />
                                                        <button onClick={() => removeChoice(i, i2, props.questions, props.setQuestions)} className={"blackButton"}>Remove</button>
                                                    </div>
                                                )
                                            })}
                                            <div className={"horizontal"}>
                                                <button onClick={() => addChoice(i, props.questions, props.setQuestions)} className={"addChoiceButton blackButton"}>+ Add Choice</button>
                                            </div>
                                        </div>
                                    ):null}
                                </div>
                                <div className={"horizontal"}>
                                    <h6>Optional?</h6>
                                    <input type={"checkbox"} name={"optional"} className={"createEventInput"} checked={props.questions[i].optional} onChange={(e) => handleQuestionBooleanChange(e, i, "optional", props.questions, props.setQuestions)} />
                                </div>
                            </div>
                        )
                    })
                }</div>
            </div>
            <div className={"horizontal"}>
                <button onClick={() => addQuestion(props.questions, props.setQuestions)} className={"addQuestionButton blackButton"}>+ Add Question</button>
            </div>
        </>
    )
}

export default QuestionController;