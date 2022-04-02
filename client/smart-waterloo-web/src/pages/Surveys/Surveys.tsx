import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext, IdContext, AddressContext } from "../../App";
import {useContext, useState} from "react";
import "./Surveys.css";
import {defaultSurveysState} from "../../data/Surveys";
import SurveyPanel from "./SurveyPanel";
import { useNavigate } from "react-router-dom";
import { defaultAccountData} from "../../data/account";
import { getBasicUserData, getSurveysData} from "../../data/getData"
import Settings from "../../components/Settings";
import { ClipLoader } from "react-spinners";



const Surveys = (props: {org: boolean}) => {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const {mobile} = useContext(MobileContext);
	const {address} = useContext(AddressContext);
	const {id} = useContext(IdContext);
	const navigate = useNavigate();

	const [accountData, setAccountData] = useState(defaultAccountData);
	const getSetUserData = async () => {
		let {success, response} = await getBasicUserData();
		if (!success) alert(JSON.stringify(response));	
		else setAccountData(response);
	}
	const [surveysData, setSurveyData] = useState(defaultSurveysState);
	const getSetSurveysData = async () => {
		let {success, surveys, errors} = await getSurveysData();
		if (!success) alert(JSON.stringify(errors));
		else setSurveyData({surveys: surveys, surveysDataSet: true })
	}
	const [dataCalled, setDataCalled] = useState(false);
	if (!dataCalled) {
		getSetUserData();
		getSetSurveysData();
		setDataCalled(true);
	}

	return (
		<>
			<Navbar root={true}/>
			<Settings open={settingsOpen} closeModal={() => setSettingsOpen(false)}/>
			<div className={mobile?"PageContainer":"asideContainer"}>
				{mobile?null:<Sidebar {...accountData} openSettings={() => setSettingsOpen(true)} page="surveys"/>}
				<div className={"besideAside"}>
					<div className={mobile? "":"fullScreenPanel"}>
						<h4>Surveys 📝</h4>
						<hr/>
						<p>A brief description about what the surveys listed here are and any other info that is required.</p>
						<div className={"surveyGrid"}>
							{props.org?<div className={"addSurveySection"}>
								<button onClick={() => navigate("/createsurvey")}  className={"blackButton addSurveyButton"}>Add Survey</button>
							</div>:null}
							{
								surveysData.surveysDataSet?(
									surveysData.surveys.map((survey, i) => {return (
										<SurveyPanel index={i} key={i} {...survey}/>
									);})
								):[1, 2, 3, 4, 5].map((_,i) => { return <div key={i} className={"center"}> <ClipLoader color={"black"} loading={true} css={""} size={100} /> </div> })
							}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Surveys;