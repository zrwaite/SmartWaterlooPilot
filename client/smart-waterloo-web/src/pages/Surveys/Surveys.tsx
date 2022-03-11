import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext, OrgContext } from "../../App";
import {useContext} from "react";
import "./Surveys.css";
import {exampleSurveys} from "../../data/Surveys";
import SurveyPanel from "./SurveyPanel";
import { useNavigate } from "react-router-dom";
const Surveys = () => {
	const {mobile} = useContext(MobileContext);
	const {org} = useContext(OrgContext);
	const navigate = useNavigate();
	return (
		<>
			<Navbar root={true}/>
			<div className={mobile?"PageContainer":"asideContainer"}>
				{mobile?null:<Sidebar page="surveys"/>}
				<div className={"besideAside"}>
					<div className={mobile? "":"fullScreenPanel"}>
						<h4>Surveys 📝</h4>
						<hr/>
						<p>A brief description about what the surveys listed here are and any other info that is required.</p>
						<div className={"surveyGrid"}>
							{org?<div className={"addSurveySection"}>
								<button onClick={() => navigate("/createsurvey")}  className={"blackButton addSurveyButton"}>Add Survey</button>
							</div>:null}
							{exampleSurveys.map((survey, i) => {return (
								<SurveyPanel index={i} key={i} {...survey}/>
							);})}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Surveys;