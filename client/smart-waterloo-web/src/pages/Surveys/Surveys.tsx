import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext, IdContext, AddressContext } from "../../App";
import {useContext, useState} from "react";
import "./Surveys.css";
import {exampleSurveys} from "../../data/Surveys";
import SurveyPanel from "./SurveyPanel";
import { useNavigate } from "react-router-dom";
import { defaultUserData} from "../../data/Users";
import { getUserData} from "../../data/getData"


const Surveys = (props: {org: boolean}) => {
	const {mobile} = useContext(MobileContext);
	const {address} = useContext(AddressContext);
	const {id} = useContext(IdContext);
	const navigate = useNavigate();

	const [userData, setUserData] = useState(defaultUserData);
	const getSetUserData = async () => {
		let users = await getUserData();
		if (!users) return;
		setUserData(users)
	}
	const [dataCalled, setDataCalled] = useState(false);
	if (!dataCalled) {
		getSetUserData();
		setDataCalled(true);
	}

	return (
		<>
			<Navbar root={true}/>
			<div className={mobile?"PageContainer":"asideContainer"}>
				{mobile?null:<Sidebar {...userData} page="surveys"/>}
				<div className={"besideAside"}>
					<div className={mobile? "":"fullScreenPanel"}>
						<h4>Surveys 📝</h4>
						<hr/>
						<p>A brief description about what the surveys listed here are and any other info that is required.</p>
						<div className={"surveyGrid"}>
							{props.org?<div className={"addSurveySection"}>
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