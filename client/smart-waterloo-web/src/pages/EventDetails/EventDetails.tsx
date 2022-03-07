import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext } from "../../App";
import {useContext} from "react";
import "./EventDetails.css";
import eventsDetailsData from "./EventDetailsData.json";
import NotFound from "../NotFound";
import React from 'react';
import {
	BrowserRouter as Router,
	Link,
	Route,
	Routes,
	useParams,
  } from "react-router-dom";

const EventsDetails = () => {
	const {mobile} = useContext(MobileContext);

	const { name } = useParams();
	const event = eventsDetailsData.find(event => event.name === name);

	if (!event) return <NotFound />;

	return (
		<>
			<Navbar root={false}/>
			{/* <div className={mobile?"PageContainer":"asideContainer"}>
				{mobile?null:<Sidebar page="events"/>}
				<div className={"besideAside"}> */}
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
				{/* </div>
			</div> */}
		</>
	)
}

export default EventsDetails;