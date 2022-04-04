import Navbar from "../../components/Navbar";
import {useState, useContext} from "react"
import { MobileContext } from "../../App";
import { SurveyDataType } from "../../data/types/surveys";
import SurveyLanding from "./SurveyLanding";
import "./Survey.css";
import { useParams } from "react-router-dom";
import SurveyQuestion from "./SurveyQuestion";
// import Cookies from "universal-cookie";
import { getSurveyData } from "../../data/getData";
import NotFound from "../NotFound";
import { submitSurvey } from "../../data/postData";

const defaultSurveyData:SurveyDataType = {
	id: "",
	name: "Loading...",
	org: "- - - - - - - - -",
	description: "- - - - - - - - -",
	length: "? mins",
	completed: false,
	questions: []
}
const defaultAnswers:string[] = [];
const Survey = (props: {org:boolean}) => {
	// const cookies = new Cookies()
	// cookies.set("back", "/surveys/");
	const { id, orgId } = useParams();
	const {mobile} = useContext(MobileContext);
	const [progress, setProgess] = useState(false);
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
	const [notFound, setNotFound] = useState(false);
	const [surveyData, setSurveyData] = useState({survey: defaultSurveyData, surveyDataSet: false});
	const getSetSurveyData = async () => {
		if (!id) return;
		let {survey, success, errors} = await getSurveyData(id);
		if (success) {
			setSurveyData({ survey: survey, surveyDataSet: true })
		} else {
			setNotFound(true);
			console.error(errors);
		}
	}
	const [dataCalled, setDataCalled] = useState(false);
	if (!dataCalled) {
		getSetSurveyData();
		setDataCalled(true);
	} 

	if (answers.length !== surveyData.survey.questions.length) {
		const newAnswers = [];
		for (let i = 0; i<surveyData.survey.questions.length; i++) newAnswers.push("");
		setAnswers(newAnswers);
	}
	const questions = surveyData.survey.questions.map((question, i) => {
		return <SurveyQuestion key={i} index={i} answer={answers[i]} setParentAnswer={childSetAnswer} {...question}/>
	})
	const complete = answers.every(answer => answer!=="");
	const trySubmitSurvey = async () => {
		let {success, errors} = await submitSurvey(surveyData.survey.questions, answers);
		// if (success) navigate(`/eventdetails/${eventId}`);
		// else alert(JSON.stringify(errors));
	}
	if (notFound || !id) return <NotFound />
	return (
		<>
			<Navbar root={false}/>
			<div className={"PageContainer"}>
				<div className={mobile? "":"surveyPagePanel"}>
					{mobile?<h4>{surveyData.survey.name}</h4>:<h4 className={"surveyHeader"}>{surveyData.survey.name}</h4>}
					<p>{surveyData.survey.org}</p>
					<p style={greyText}>{surveyData.survey.questions.length} questions</p>
					<div className={"surveyForm"}>
						
					</div>
					{progress?(
						<div className={"surveyForm"}>
							{questions}
							<button onClick={complete?trySubmitSurvey:()=>{}} className={complete?"blackButton surveyButton": "disabledButton surveyButton"}>Submit</button>
						</div>
						):<SurveyLanding description={surveyData.survey.description} setParentProgress={childSetProgress}/>}
				</div>
			</div>
		</>
	)
}
export default Survey;