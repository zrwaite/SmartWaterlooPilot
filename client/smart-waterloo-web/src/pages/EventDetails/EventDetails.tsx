import Navbar from "../../components/Navbar";
import { MobileContext } from "../../App";
import {useContext} from "react";
import "./EventDetails.css";
import {exampleEvents} from "../../data/Events";
import NotFound from "../NotFound";
import {useParams} from "react-router-dom";

const EventsDetails = () => {
	const {mobile} = useContext(MobileContext);

	const { name } = useParams();
	const event = exampleEvents.find(event => event.name === name);

	if (!event) return <NotFound />;

	return (
		<>
			<Navbar root={false}/>
			<div className={mobile? "":"fullScreenPanel"}>
				<div className={"eventDetails"}>
					<img src={event?.image} alt={event?.title} className={"eventImage"} />
				</div>
				<div>
					<p>New</p>
					<p>{event?.category}</p>
				</div>
				<h6>{event?.title}</h6>
				<p>{event?.organization}</p>
				<p>For Ages {event?.age_range}</p>
				<p>{event?.start_date} {event?.end_date}</p>
				<br></br>
				<div><p>{event?.description}</p></div>
			</div>
		</>
	)
}

export default EventsDetails;