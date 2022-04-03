import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext } from "../../App";
import { useContext, useState } from "react";
import "./Events.css";
import { defaultEventsData } from "../../data/Events";
import EventPanel from "./EventPanel";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { defaultAccountData } from "../../data/account";
import ClipLoader from "react-spinners/ClipLoader";
import { getEventsData, getBasicUserData, getUserOrgs } from "../../data/getData"
import Settings from "../../components/Settings";
import { defaultOrgsState } from "../../data/orgs";
import OrgsModal from "../../components/OrgsModal";


const Events = (props: {org: boolean}) => {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [orgsData, setOrgsData] = useState(defaultOrgsState);
	const [accountData, setAccountData] = useState(defaultAccountData);
	const [eventData, setEventData] = useState(defaultEventsData);
	const [dataCalled, setDataCalled] = useState(false);
	const [orgsModalOpen, setOrgsModalOpen] = useState(false);

	const { mobile } = useContext(MobileContext);
	// let { address } = useContext(AddressContext);
	let {orgId} = useParams();
	const cookies = new Cookies()
	const navigate = useNavigate();
	cookies.set("back", `/events/${props.org?`org/${orgId}`:"user"}`);
	const getSetUserData = async () => {
		let {success, response} = await getBasicUserData();
		if (!success) alert(JSON.stringify(response));	
		else setAccountData(response);
	}
	const getSetEventsData = async () => {
		let {events, success, errors} = await getEventsData();
		if (!success) alert(JSON.stringify(errors));
		else setEventData({ events: events, eventsDataSet: true })
	}
	const getSetOrgsData = async () => {
		let {success, orgs, errors} = await getUserOrgs(cookies.get("userId"));
		if (!success) alert(JSON.stringify(errors));
		else setOrgsData({orgs: orgs, set: true })
	}
	if (!dataCalled) {
		getSetEventsData();
		getSetUserData();
		getSetOrgsData();
		setDataCalled(true);
	}
	return (
		<>
			<Navbar root={true} org={props.org} orgId={orgId} orgs={orgsData.orgs} signedIn={true}/>
			<Settings open={settingsOpen} closeModal={() => setSettingsOpen(false)}/>
			<OrgsModal orgs={orgsData.orgs} open={orgsModalOpen} closeModal={() => setOrgsModalOpen(false)}/>
			<div className={mobile ? "PageContainer" : "asideContainer"}>
				{mobile ? null : <Sidebar org={props.org} orgId={orgId} orgs={orgsData.orgs} {...accountData} openOrgsModal={() => setOrgsModalOpen(true)} openSettings={() => setSettingsOpen(true)} page={"events"} />}
				<div className={"besideAside"}>
					<div className={mobile ? "" : "fullScreenPanel"}>
						<h4>Events 🎟️</h4>
						<hr />
						<p>A brief description about what the events listed here are and any other info that is required.</p>
						<div className={"eventGrid"}>
							{props.org ? <div className={"addEventSection"}>
								<button onClick={() => navigate("/createevent")} className={"blackButton addEventButton"}>Add Event</button>
							</div> : null}
							{
								eventData.eventsDataSet ?
									eventData.events.map((event, i) => {
										return (
											<EventPanel index={i} key={i} {...event} />
										);
									}) :
									[1, 2, 3, 4, 5].map((_,i) => { return <div key={i} className={"center"}> <ClipLoader color={"black"} loading={true} css={""} size={100} /> </div> })
							}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Events;