import React, { useState } from 'react';
import {icons} from "../../images/icons";
import {event_images} from "../../images/eventimages";
import img_party_popper from "../../images/emoji-party-popper.png"
// import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext } from "../../App";
import {useContext} from "react";
import "./EventDetails.css";
import EventInfo from "./EventInfo";
import ClipLoader from "react-spinners/ClipLoader";
import NotFound from "../NotFound";
import {
	BrowserRouter as Router,
	Link,
	Route,
	Routes,
	useParams,
	useNavigate,
  } from "react-router-dom";
import Modal from "react-modal";
import { defaultEvent } from '../../data/types/events';
import { getEventData } from '../../data/getData';
import Cookies from 'universal-cookie';

Modal.setAppElement("#root");

const EventsDetails = () => {
	let {mobile} = useContext(MobileContext);
	const navigate = useNavigate();
	const { id } = useParams();
	const [buttonText, setText] = React.useState("Sign Up");
	const [signupButtonClass, setClass] = React.useState("signupButton");
	const [bottomButtonClass, setBottomClass] = React.useState("bottomButton");
	const [isOpen, setIsOpen] = React.useState(false);

	// const event = eventDataRaw.find(event => event.id === id);
	const [notFound, setNotFound] = useState(false);
	const [eventData, setEventData] = useState({event: defaultEvent, eventDataSet: false});
	const getSetEventData = async () => {
		if (!id) return;
		let {event, success, errors} = await getEventData(id);
		if (!success) setNotFound(true);
		else setEventData({ event: event, eventDataSet: true })
	}
	const [dataCalled, setDataCalled] = useState(false);
	if (!dataCalled) {
		getSetEventData();
		setDataCalled(true);
	}
	if (notFound || !id) return <NotFound />

	function openModal() {
		setIsOpen(true);
	  }

	function closeModal() {
		setIsOpen(false);
	}
	const cookies = new Cookies();

	return (
		<>
			<Modal isOpen={isOpen} onRequestClose={closeModal} className="popupPanel">
				<div className='messagePanel'>
					<div>
						<img src={img_party_popper} alt="Yay! You're In!" className="h5"/>
					</div>
					<div>
						<h6 className='popupMessage'>Yay! You're in! </h6>
					</div>
					<div>
						<p className="popupButton" onClick={() => closeModal() }>OK</p>
					</div>
				</div>
			</Modal>	
			<div className='navbarEventDetails'>
				<div className='leftNavEventDetail'>
					<div onClick={() => navigate(cookies.get("back"))} className="eventBackButton">
						<img src={icons.leftArrow} alt="Events" className="h5"/>
						<p className="eventBackButton">Events</p>
					</div>					
				</div>
				<div>
					<p className={signupButtonClass} onClick={() => { 
					openModal()
					setText("Signed Up ✓") 
					setClass("signupLightBlueButton")
					setBottomClass("bottomLightBlueButton") }}>{buttonText}</p>
				</div>		
			</div>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanelNoPadding"}>
					{
						(eventData.eventDataSet)?(<>
							<div className={"eventDetails"}>
								<img src={event_images.basketball_skills} alt={eventData.event.name} className="eventImage" />
							</div>
							<EventInfo {...eventData.event} />
							<div className="DesktopPanelNoBorder">
								<p className={bottomButtonClass} onClick={() => { 
								openModal()
								setText("Signed Up ✓") 
								setClass("signupLightBlueButton")
								setBottomClass("bottomLightBlueButton") }}>{buttonText}</p>
							</div>
						</>):(
							<div className={"center"}> <ClipLoader color={"black"} loading={true} css={""} size={200} /> </div>
						)
					}
				</div>
			</div>
		</>
	);
}

export default EventsDetails;