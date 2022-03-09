import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext } from "../../App";
import {useContext} from "react";
import "./Events.css";
import { exampleEvents } from "../../data/Events";
import EventPanel from "./EventPanel";
import Cookies from "universal-cookie";
const Events = () => {
	const {mobile} = useContext(MobileContext);
	const cookies = new Cookies()
	cookies.set("back", "/events");
	return (
		<>
			<Navbar root={true}/>
			<div className={mobile?"PageContainer":"asideContainer"}>
				{mobile?null:<Sidebar page="events"/>}
				<div className={"besideAside"}>
					<div className={mobile? "":"fullScreenPanel"}>
						<h4>Events 🎟️</h4>
						<hr/>
						<p>A brief description about what the events listed here are and any other info that is required.</p>
						<div className={"eventGrid"}>
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