import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext, OrgContext, IdContext, AddressContext } from "../../App";
import {useContext, useState} from "react";
import "./Surveys.css";
import {exampleSurveys} from "../../data/Surveys";
import SurveyPanel from "./SurveyPanel";
import { useNavigate } from "react-router-dom";
import {exampleUsers, defaultUserData} from "../../data/Users";

const Surveys = () => {
	const {mobile} = useContext(MobileContext);
	const {org} = useContext(OrgContext);
	const {address} = useContext(AddressContext);
	const {id} = useContext(IdContext);
	const navigate = useNavigate();

	const [userData, setUserData] = useState(defaultUserData);
	const getUserData = async () => {
		await new Promise(resolve => setTimeout(resolve, 1000)); //Just an artificial delay for mock data
		const user = exampleUsers.find(user => user.userId === id);
		if (!user) {
			alert("Invalid user!");
			return;
		}
		setUserData({
			userDataSet: true,
			nickname: user.nickname,
			avatarString: user.avatarString
		})
	}
	const [dataCalled, setDataCalled] = useState(false);
	if (!dataCalled) {
		getUserData();
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