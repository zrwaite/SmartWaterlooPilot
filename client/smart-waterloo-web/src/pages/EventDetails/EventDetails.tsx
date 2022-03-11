import React from 'react';
import {icons} from "../../images/icons";
import {event_images} from "../../images/eventimages";
// import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext } from "../../App";
import {useContext} from "react";
import "./EventDetails.css";
import EventInfo from "./EventInfo";
import eventDataRaw from "./EventDetailsData.json";
import NotFound from "../NotFound";
import {
	BrowserRouter as Router,
	Link,
	Route,
	Routes,
	useParams,
	useNavigate,
  } from "react-router-dom";

const EventsDetails = () => {
	let {mobile} = useContext(MobileContext);
	const navigate = useNavigate();
	const { name } = useParams();
	const [buttonText, setText] = React.useState("Sign Up");
	const [signupButtonClass, setClass] = React.useState("signupButton");
	const [bottomButtonClass, setBottomClass] = React.useState("bottomButton");

	const event = eventDataRaw.find(event => event.name === name);

	if (!event) return <NotFound />;

	return (
		<>
			<div className='navbarEventDetails'>
				<div className='leftNavEventDetail'>
					<div onClick={() => navigate("../Events")} className="eventBackButton">
						<img src={icons.leftArrow} alt="Events" className="h5"/>
						<p className="eventBackButton">Events</p>
					</div>					
				</div>
				<div>
					<p className={signupButtonClass} onClick={() => { setText("Signed Up ✓") 
					setClass("signupLightBlueButton")
					setBottomClass("bottomLightBlueButton") }}>{buttonText}</p>
				</div>				
			</div>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanelNoPadding"}>
					<div className={"eventDetails"}>
						<img src={event_images.basketball_skills} alt={event.title} className="eventImage" />
					</div>
					<EventInfo name={event.name} text={buttonText} class={signupButtonClass} bottomClass={bottomButtonClass}/>
					<div className="DesktopPanelNoBorder">
						<p className={bottomButtonClass} onClick={() => { setText("Signed Up ✓") 
						setClass("signupLightBlueButton")
						setBottomClass("bottomLightBlueButton") }}>{buttonText}</p>
					</div>
				</div>
			</div>	
		</>
	);
}

export default EventsDetails;