import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext } from "../../App";
import {useContext} from "react";
import "./Surveys.css";
import {exampleSurveys} from "../../data/Surveys";
import SurveyPanel from "./SurveyPanel";
const Surveys = () => {
	const {mobile} = useContext(MobileContext);
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