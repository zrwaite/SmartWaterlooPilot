import "./CreateSurvey.css";
import {useContext} from "react";
import {MobileContext} from "../../App";
// import {eventCategories} from "./CreateSurveyData";
// import Select, {ActionMeta} from "react-select";
import { useNavigate } from "react-router-dom";
//Todo change buttons to links

const CreateSurvey = () => {
	const navigate = useNavigate();
	let {mobile} = useContext(MobileContext);
	
	const greyText = {color: "grey"};
	const link = {cursor: "pointer"};
	return (
		<>
			<div className={"PageContainer"}>
				<div className={"createNavbar"}>
					<h6 style={link} onClick={() => navigate("/events")}>Cancel</h6>	
					<h6 style={greyText}>Next</h6>
				</div>
				<div className={mobile? "":"DesktopPanel"}>
					<div className={"disclaimer"}>
						<div className={"infoBubble"}><p>i</p></div>
						<p>Please make sure information is correct. You will not be able to edit this event once it is published.</p>
					</div>
					<h2 className={"createEventHeader"}>Create New Survey 📝</h2>
				</div>
			</div>	
		</>
	);
}

export default CreateSurvey;