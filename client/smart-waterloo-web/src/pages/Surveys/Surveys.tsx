import { MobileContext } from "../../App";
import {useContext} from "react";
import "./Surveys.css";
import SurveyPanel from "./SurveyPanel";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import cookies from "../../modules/cookies";
import {AccountChildProps} from "../AccountParent"
const Surveys = (props: AccountChildProps) => {
	const {mobile} = useContext(MobileContext);
	const navigate = useNavigate();
	cookies.set("back", `/dashboard/${props.org?`org/${props.orgId}`:"user"}`);
	const displayedSurveys = props.org?props.surveysData:props.mySurveysData;
	return (
		<div className={"besideAside"}>
			<div className={mobile? "":"fullScreenPanel"}>
				<h4>Surveys 📝</h4>
				<hr/>
				<p>A brief description about what the surveys listed here are and any other info that is required.</p>
				<div className={"surveyGrid"}>
					{props.org && props.verified ?<div className={"addSurveySection"}>
						<button onClick={() => navigate(`/createsurvey/${props.orgId}`)}  className={"blackButton addSurveyButton"}>Add Survey</button>
					</div>:null}
					{
						displayedSurveys.set?(
							displayedSurveys.surveys.map((survey, i) => {
								return (
								<SurveyPanel numQuestions={survey.questions.length} orgId={props.orgId} isOrg={props.org} index={i} key={i} {...survey}/>
							);})
						):[1, 2, 3, 4, 5].map((_,i) => { return <div key={i} className={"center"}> <ClipLoader color={"black"} loading={true} css={""} size={100} /> </div> })
					}
				</div>
			</div>
		</div>
	)
}

export default Surveys;