import Navbar from "../../components/Navbar";
import {useState, useContext} from "react"
import { MobileContext } from "../../App";
import { SurveyDataType } from "../../data/types/surveys";
import SurveyLanding from "./SurveyLanding";
import "./Survey.css";
import { useParams } from "react-router-dom";
import SurveyQuestion from "../../components/AnswerInput";
import NotFound from "../NotFound";
import { submitSurvey } from "../../data/postData";
import { AccountChildProps } from "../AccountParent";
import { forceNavigate } from "../../modules/navigate";
import UserInfo from "../../components/UserInfo";

const defaultSurveyData:SurveyDataType = {
	id: "",
	name: "Loading...",
	org: "- - - - - - - - -",
	description: "- - - - - - - - -",
	length: "? mins",
	completed: false,
	questions: [],
	user_info: []
}
const defaultAnswers:string[] = [];
const Survey = (props: AccountChildProps) => {
	const { id, orgId } = useParams();
	const {mobile} = useContext(MobileContext);
	const [progress, setProgess] = useState(false);
	const [answers, setAnswers] = useState(defaultAnswers);
	const [canSubmit, setCanSubmit] = useState(true);
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
	const [surveyData, setSurveyData] = useState({survey: defaultSurveyData, set: false});

	if (answers.length !== surveyData.survey.questions.length) {
		const newAnswers = [];
		for (let i = 0; i<surveyData.survey.questions.length; i++) newAnswers.push("");
		setAnswers(newAnswers);
	}
	const owner = (orgId===surveyData.survey.org.toString());
	const complete = answers.every((answer, i) => (answer!=="")||surveyData.survey.questions[i].optional);
	const trySubmitSurvey = async () => {
		setCanSubmit(false);
		let {success, errors} = await submitSurvey(surveyData.survey.id, surveyData.survey.questions, answers);
		if (success) forceNavigate(`/surveys/${props.org?`org/${orgId}`:"user"}`);
		else {
			alert(JSON.stringify(errors));
			setCanSubmit(true);
		}
		
	}
	if (notFound || !id) return <NotFound />


	if (!surveyData.set) {
		if (props.surveysData.set) {
			const newSurveyData = props.surveysData.surveys.find(survey => survey.id == id)
			if (newSurveyData) setSurveyData({survey: newSurveyData, set: true});
			else setNotFound(true);
		}
	} 

	return ( 
		<>
			<Navbar root={false}/>
			<div className={"PageContainer"}>
				<div className={mobile? "":"surveyPagePanel"}>
					{mobile?<h4>{surveyData.survey.name}</h4>:<h4 className={"surveyHeader"}>{surveyData.survey.name}</h4>}
					<p style={greyText}>{surveyData.survey.questions.length} questions</p>
					{progress?(
						<div className={"surveyForm"}>
							{owner&&(
								<UserInfo userInfo={surveyData.survey.user_info}/>
							)}
							{surveyData.survey.questions.map((question, i) => {
								return <SurveyQuestion owner={owner} key={i} index={i} answer={answers[i]} setParentAnswer={childSetAnswer} {...question}/>
							})}
							{!owner&&<button onClick={complete&&canSubmit?trySubmitSurvey:()=>{}} className={complete&&canSubmit?"blackButton surveyButton": "disabledButton surveyButton"}>Submit</button>}
						</div>
						):<SurveyLanding set={surveyData.set} completed={surveyData.survey.completed} org={props.org} owner={owner} description={surveyData.survey.description} setParentProgress={childSetProgress}/>}
				</div>
			</div>
		</>
	)
}
export default Survey;