import Navbar from "../../components/Navbar";
import {useState, useContext} from "react"
import { MobileContext } from "../../App";
import { SurveyDataType } from "../../data/types/surveys";
import SurveyLanding from "./SurveyLanding";
import "./Survey.css";
import { useNavigate, useParams } from "react-router-dom";
import SurveyQuestion from "./SurveyQuestion";
// import Cookies from "universal-cookie";
import { getBasicUserData, getSurveyData } from "../../data/getData";
import NotFound from "../NotFound";
import { submitSurvey } from "../../data/postData";
import { defaultAccountState } from "../../data/types/account";
import { AccountChildProps } from "../AccountParent";

const defaultSurveyData:SurveyDataType = {
	id: "",
	name: "Loading...",
	org: "- - - - - - - - -",
	description: "- - - - - - - - -",
	length: "? mins",
	questions: []
}
const defaultAnswers:string[] = [];
const Survey = (props: AccountChildProps) => {
	// const cookies = new Cookies()
	// cookies.set("back", "/surveys/");
	const navigate = useNavigate();
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
	const [surveyData, setSurveyData] = useState({survey: defaultSurveyData, set: false});

	if (answers.length !== surveyData.survey.questions.length) {
		const newAnswers = [];
		for (let i = 0; i<surveyData.survey.questions.length; i++) newAnswers.push("");
		setAnswers(newAnswers);
	}
	const owner = (orgId===surveyData.survey.org.toString());
	const questions = surveyData.survey.questions.map((question, i) => {
		return <SurveyQuestion owner={owner} key={i} index={i} answer={answers[i]} setParentAnswer={childSetAnswer} {...question}/>
	});
	const complete = answers.every(answer => answer!=="");
	const trySubmitSurvey = async () => {
		let {success, errors} = await submitSurvey(surveyData.survey.id, surveyData.survey.questions, answers);
		if (success) {
			alert("Submitted!");
			navigate(`/surveys/${props.org?`org/${orgId}`:"user"}`);
		} else alert(JSON.stringify(errors));
	}
	if (notFound || !id) return <NotFound />
	const completed = (props.accountData.account.surveys.includes(parseInt(surveyData.survey.id)))

	if (!surveyData.set) {
		const newSurveyData = props.surveysData.surveys.find(survey => survey.id == id)
		if (newSurveyData) setSurveyData({survey: newSurveyData, set: true})
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
							{questions}
							{!owner&&<button onClick={complete?trySubmitSurvey:()=>{}} className={complete?"blackButton surveyButton": "disabledButton surveyButton"}>Submit</button>}
						</div>
						):<SurveyLanding set={surveyData.set} completed={completed} org={props.org} owner={owner} description={surveyData.survey.description} setParentProgress={childSetProgress}/>}
				</div>
			</div>
		</>
	)
}
export default Survey;