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
import { getBasicUserData, getEventData } from '../../data/getData';
import Cookies from 'universal-cookie';
import { defaultAccountState } from '../../data/types/account';
import { addEventtoUser } from '../../data/addData';

Modal.setAppElement("#root");

const EventsDetails = (props: {org:boolean}) => {
	let {mobile} = useContext(MobileContext);
	const navigate = useNavigate();
	const { id, orgId} = useParams();
	const [buttonText, setText] = useState("Sign Up");
	const [signupButtonClass, setClass] = useState("signupButton");
	const [bottomButtonClass, setBottomClass] = useState("bottomButton");
	const [accountData, setAccountData] = useState(defaultAccountState);
	const [isOpen, setIsOpen] = React.useState(false);

	// const event = eventDataRaw.find(event => event.id === id);
	const [notFound, setNotFound] = useState(false);
	const [eventData, setEventData] = useState({event: defaultEvent, eventDataSet: false});
	const getSetEventData = async () => {
		if (!id) return;
		let {event, success, errors} = await getEventData(id);
		if (!success) {
			setNotFound(true);
			console.error(errors);
		}
		else setEventData({ event: event, eventDataSet: true })
	}
	const getSetUserData = async () => {
		let {success, userData, errors} = await getBasicUserData();
		if (!success && errors.length) alert(JSON.stringify(errors));	
		else if ('nickname' in userData) setAccountData({account: userData, set: true});
		else console.error("invalid userData response");
	}
	const [dataCalled, setDataCalled] = useState(false);
	
	if (notFound || !id) return <NotFound />

	function openModal() {
		setIsOpen(true);
	  }

	function closeModal() {
		setIsOpen(false);
	}
	const cookies = new Cookies();
	const signedUp = accountData.account.events.includes(parseInt(eventData.event.id));
	const trySignUp = async () => {
		if (!signedUp) {
			let {success, errors} = await addEventtoUser(cookies.get("userId"), eventData.event.id)
			if (success) {
				openModal();
				setText("Signed Up ✓");
				setClass("signupLightBlueButton");
				setBottomClass("bottomLightBlueButton");
			} else alert(JSON.stringify(errors));
		}
	}
	if (accountData.set && eventData.eventDataSet && signedUp && buttonText!=="Signed Up ✓" && signupButtonClass!=="signupLightBlueButton" && bottomButtonClass!=="bottomLightBlueButton") {
		setText("Signed Up ✓");
		setClass("signupLightBlueButton");
		setBottomClass("bottomLightBlueButton");
	}

	if (!dataCalled) {
		getSetEventData();
		getSetUserData();
		setDataCalled(true);
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
						(eventData.eventDataSet)?(<>
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