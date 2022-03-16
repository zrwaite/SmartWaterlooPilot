import React from 'react';
import "./EventDetails.css";
// import eventDataRaw from './EventDetailsData.json';
import { exampleEvents }  from "../data/Events";

interface EventData {
    "name": string;
    "title": string;
    "organization": string;
    "age_range": string;
    "start_date": string;
    "end_date": string;
    "category": string;
    "signed_up": boolean;
    "description": string;
    "image": string;
}

interface MatchingEvent {
    "name": string;
}
const EventInfo = (props: MatchingEvent): any => {
    const eventData: EventData[] = exampleEvents;

    const event = eventData.find( event => event.name === props.name);

    if (!event) return (<p>Event {props.name} not found</p>);

	return (
		<>
			{/* <div className={"eventDetails"}>
				<img src={event.image} alt={event.title} className="eventImage" />
			</div> */}
			<div className="DesktopPanelNoBorder">
				<p className="lightblue">NEW</p>
				<p className="lightbluetext">{event.category}</p>
				<h5 className="eventTitle">{event.title}</h5>
				<p>{event.organization}</p>
				<p className="greytext">For Ages {event.age_range}</p>
				<p className="greytext">{event.start_date} {event.end_date}</p>
				<br></br>
				<p >{event.description}</p>
			</div>
		</>
	)
}

export default EventInfo;