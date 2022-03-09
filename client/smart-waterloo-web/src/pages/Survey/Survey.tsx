import Navbar from "../../components/Navbar";
import {useState, useContext, useEffect} from "react"
import { MobileContext } from "../../App";
import {exampleSurveys, SurveyDataType} from "../../data/Surveys";
import SurveyLanding from "./SurveyLanding";
import "./Survey.css";
import { useParams } from "react-router-dom";
import SurveyQuestion from "./SurveyQuestion";

const defaultSurveyData:SurveyDataType = {
	title: "Loading...",
	organization: "- - - - - - - - -",
	length: "? mins",
	completed: false,
	questions: []
}
const defaultAnswers:string[] = [];
const Survey = () => {
	const { id } = useParams<"id">();
	const {mobile} = useContext(MobileContext);
	const [progress, setProgess] = useState(false);
	const [surveyData, setSurveyData] = useState(defaultSurveyData);
	const [loaded, setLoaded] = useState(false);
	const [answers, setAnswers] = useState(defaultAnswers);
	const greyText = {color: "grey"};
	const childSetProgress = (newVal: boolean) => {
		setProgess(newVal);
	}
	const childSetAnswer = (index: number, newVal: string) => {
		let newAnswers = [...answers];
		newAnswers[index] = newVal;
		setAnswers(newAnswers);
	}
	const getSurveyData = async () => {
		setLoaded(true);
		//TODO actual get 
		console.log(id);
		setTimeout(() => {
			if (id && parseInt(id)<exampleSurveys.length)
			setSurveyData(exampleSurveys[parseInt(id)]);
			else alert("not found");
		}, 1000)
	}
	useEffect(() => {
		if (!loaded) getSurveyData();
	})

	if (answers.length !== surveyData.questions.length) {
		const newAnswers = [];
		for (let i = 0; i<surveyData.questions.length; i++) newAnswers.push("");
		setAnswers(newAnswers);
	}
	const questions = surveyData.questions.map((question, i) => {
		return <SurveyQuestion key={i} index={i} answer={answers[i]} setParentAnswer={childSetAnswer} {...question}/>
	})
	return (
		<>
			<Navbar root={false}/>
			<div className={"PageContainer"}>
				<div className={mobile? "":"surveyPanel"}>
					{mobile?<h4>{surveyData.title}</h4>:<h4 className={"surveyHeader"}>{surveyData.title}</h4>}
					<p>{surveyData.organization}</p>
					<p style={greyText}>{surveyData.length} to fill</p>
					{progress?(<>{questions}</>):<SurveyLanding setParentProgress={childSetProgress}/>}
				</div>
			</div>
		</>
	)
}
export default Survey;