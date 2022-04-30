import {ChangeEvent} from "react";
import {Question} from "../../data/types/surveys";

const handleQuestionBooleanChange = (
    event: ChangeEvent<HTMLInputElement>,
    index:number, name: "optional",
    questions: Question[],
    setQuestions: (newQuestions: Question[]) => void
) => {
    let partialInput = [...questions];
    if (name==="optional") {
        partialInput[index][name] = event.target.checked;
    }
    setQuestions(partialInput);
}

const handleQuestionInputChange = (
    event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>,
    index: number, name: "prompt"|"answer_type",
    questions: Question[],
    setQuestions: (newQuestions: Question[]) => void
) => {
    let partialInput = [...questions];
    if (name==="answer_type") {
        partialInput[index][name] = event.target.value as "text"|"mc";
        if (partialInput[index].choices.length===0) partialInput[index].choices = ["", ""];
    } else if (name==="prompt"){
        partialInput[index][name] = event.target.value;
    }
    setQuestions(partialInput);
}
const handleAnswerInputChange = (
    event: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement>,
    qindex: number, aindex: number,
    questions: Question[],
    setQuestions: (newQuestions: Question[]) => void
) => {
    let answers = questions[qindex].choices;
    if (answers) {
        let partialInput = [...questions];
        let qChoices = partialInput[qindex].choices
        if (qChoices) qChoices[aindex] = event.target.value;
        partialInput[qindex].choices = qChoices;
        setQuestions(partialInput);
    }
}
const addQuestion = (
    questions: Question[],
    setQuestions: (newQuestions: Question[]) => void
) => {
    let previousQuestions = [...questions];
    previousQuestions.push({
        id: "",
        optional: false,
        prompt: "",
        answer_type: "text",
        choices: []
    });
    setQuestions(previousQuestions);
}
const removeQuestion = (
    qindex: number,
    questions: Question[],
    setQuestions: (newQuestions: Question[]) => void
) => {
    let previousQuestions = [...questions];
    previousQuestions.splice(qindex,1);
    setQuestions(previousQuestions);
}
const addChoice = (
    qindex: number,
    questions: Question[],
    setQuestions: (newQuestions: Question[]) => void
) => {
    let previousQuestions = [...questions];
    previousQuestions[qindex].choices.push("");
    setQuestions(previousQuestions);
}
const removeChoice = (
    qindex: number, aindex:number,
    questions: Question[],
    setQuestions: (newQuestions: Question[]) => void
) => {
    let previousQuestions = [...questions];
    previousQuestions[qindex].choices.splice(aindex,1);
    setQuestions(previousQuestions);
}

export {handleAnswerInputChange, handleQuestionBooleanChange, handleQuestionInputChange, addQuestion, addChoice, removeChoice, removeQuestion}