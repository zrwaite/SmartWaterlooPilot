import Navbar from "../../components/Navbar";
import "./UserAnswers.css";
import {useContext, useState} from "react";
import {MobileContext} from "../../App";
import { AccountChildProps } from "../AccountParent";
import { getQuestionsAndAnswers } from "../../data/getData";
const UserAnswers = (props:AccountChildProps) => {
	const [dataPulled, setDataPulled] = useState(false);
	let {mobile} = useContext(MobileContext);
	const [questionsAndAnswers, setQuestionsAndAnswers] = useState<{set: boolean, questions: string[], answers: string[]}>({set: false, questions: [], answers: []})
	const getSetQuestionsAndAnswers = async () => {
		let {success, questions, answers, errors} = await getQuestionsAndAnswers(props.accountData.account.answers);
		if (!success) alert(JSON.stringify(errors));
		else setQuestionsAndAnswers({answers: answers, questions: questions, set: true })
	}
	if (!dataPulled && props.accountData.set) {
		getSetQuestionsAndAnswers();
		setDataPulled(true);
	}
	/*
	avatar_string varchar(100),
	*/
	const questionAnswerPairs = [];
	for (let i=0; i<questionsAndAnswers.answers.length; i++) {
		questionAnswerPairs.push(
			<div key={i}>
				<p>{questionsAndAnswers.questions[i]}:</p>
				<p>{questionsAndAnswers.answers[i]}:</p>
				<br/>
			</div>
		)
	}
	return (
		<>
			<Navbar root={false}/>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanel"}>
					{mobile?<h6>User Answers</h6>:<h4 className={"UserAnswersHeader"}>User Data</h4>}
					{questionAnswerPairs}
				</div>
			</div>	
		</>
	);
}

export default UserAnswers;