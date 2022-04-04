import React, { useState } from 'react';
import {icons} from "../../images/icons";
import {event_images} from "../../images/eventimages";
import img_party_popper from "../../images/emoji-party-popper.png"
// import Sidebar from "../../components/Sidebar";
import { MobileContext } from "../../App";
import {useContext} from "react";
import "./EventDetails.css";
import EventInfo from "./EventInfo";
import ClipLoader from "react-spinners/ClipLoader";
import NotFound from "../NotFound";
import {useParams,useNavigate,} from "react-router-dom";
import Modal from "react-modal";
import { defaultEvent } from '../../data/types/events';
import Cookies from 'universal-cookie';
import { addEventtoUser } from '../../data/addData';
import { AccountChildProps } from '../AccountParent';

Modal.setAppElement("#root");

const EventsDetails = (props: AccountChildProps) => {
	let {mobile} = useContext(MobileContext);
	const navigate = useNavigate();
	const { id, orgId} = useParams();
	const [buttonText, setText] = useState("Sign Up");
	const [signupButtonClass, setClass] = useState("signupButton");
	const [bottomButtonClass, setBottomClass] = useState("bottomButton");
	const [isOpen, setIsOpen] = React.useState(false);

	// const event = eventDataRaw.find(event => event.id === id);
	const [notFound, setNotFound] = useState(false);
	const [eventData, setEventData] = useState({event: defaultEvent, set: false});
	if (!eventData.set) {
		const newEventData = props.eventsData.events.find(event => event.id == id)
		if (newEventData) setEventData({event: newEventData, set: true})
	}
	
	if (notFound || !id) return <NotFound />

	function openModal() {
		setIsOpen(true);
	  }

	function closeModal() {
		setIsOpen(false);
	}
	const cookies = new Cookies();
	const signedUp = props.accountData.account.events.includes(parseInt(eventData.event.id));
	const trySignUp = async () => {
		if (!signedUp) {
			let {success, errors} = await addEventtoUser(cookies.get("userId"), eventData.event.id)
			if (success) {
				openModal();
				setText("Signed Up ✓");
				setClass("signupLightBlueButton");
				setBottomClass("bottomLightBlueButton");
				setTimeout(() => window.location.reload(), 800);
			} else alert(JSON.stringify(errors));
		}
	}
	if (props.accountData.set && eventData.set && signedUp && buttonText!=="Signed Up ✓" && signupButtonClass!=="signupLightBlueButton" && bottomButtonClass!=="bottomLightBlueButton") {
		setText("Signed Up ✓");
		setClass("signupLightBlueButton");
		setBottomClass("bottomLightBlueButton");
	}

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
					<p className={signupButtonClass} onClick={trySignUp}>{buttonText}</p>
				</div>		
			</div>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanelNoPadding"}>
					{
						(eventData.set)?(<>
							<div className={"eventDetails"}>
								<img src={event_images.basketball_skills} alt={eventData.event.name} className="eventImage" />
							</div>
							<EventInfo {...eventData.event} />
							{props.org?null:(<div className="DesktopPanelNoBorder">
								<p className={bottomButtonClass} onClick={trySignUp}>{buttonText}</p>
							</div>)}
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