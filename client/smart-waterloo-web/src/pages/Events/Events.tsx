import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext, OrgContext, IdContext, AddressContext } from "../../App";
import {useContext, useState} from "react";
import "./Events.css";
import { exampleEvents } from "../../data/Events";
import EventPanel from "./EventPanel";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {exampleUsers, defaultUserData} from "../../data/Users";

const Events = () => {
	const {mobile} = useContext(MobileContext);
	const {org} = useContext(OrgContext);
	let {address} = useContext(AddressContext);
	let {id} = useContext(IdContext);
	const cookies = new Cookies()
	const navigate = useNavigate();
	cookies.set("back", "/events");
	const [userData, setUserData] = useState(defaultUserData);
	const getUserData = async () => {
		await new Promise(resolve => setTimeout(resolve, 1000)); //Just an artificial delay for mock data
		const user = exampleUsers.find(user => user.userId === id);
		if (!user) {
			alert("Invalid user!");
			return;
		}
		setUserData({
			set: true,
			nickname: user.nickname,
			avatarString: user.avatarString
		})
	}
	if (!userData.set) getUserData();
	return (
		<>
			<Navbar root={true}/>
			<div className={mobile?"PageContainer":"asideContainer"}>
				{mobile?null:<Sidebar nickname={userData.nickname} avatarString={userData.avatarString} page="events"/>}
				<div className={"besideAside"}>
					<div className={mobile? "":"fullScreenPanel"}>
						<h4>Events 🎟️</h4>
						<hr/>
						<p>A brief description about what the events listed here are and any other info that is required.</p>
						<div className={"eventGrid"}>
							{org?<div className={"addEventSection"}>
								<button onClick={() => navigate("/createevent")} className={"blackButton addEventButton"}>Add Event</button>
							</div>:null}
							{exampleEvents.map((event, i) => {return (
								<EventPanel index={i} key={i} {...event}/>
							);})}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Events;