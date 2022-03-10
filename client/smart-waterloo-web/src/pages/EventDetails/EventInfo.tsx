import React from 'react';
import "./EventDetails.css";
import eventDataRaw from './EventDetailsData.json';

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
const EventInfo = (prop: MatchingEvent): any => {
    const eventData: EventData[] = eventDataRaw;

    const event = eventData.find( event => event.name === prop.name);

    if (!event) return (<p>Event {prop} not found</p>);

	return (
		<>
			{/* <div className={"eventDetails"}>
				<img src={event.image} alt={event.title} className="eventImage" />
			</div> */}
			<div className="DesktopPanelNoBorder">
				<p className="lightblue">NEW</p>
				<p className="lightbluetext">{event.category}</p>
				<p className="eventTitle">{event.title}</p>
				<p>{event.organization}</p>
				<p className="greytext">For Ages {event.age_range}</p>
				<p className="greytext">{event.start_date} {event.end_date}</p>
				<br></br>
				<p >{event.description}</p>
				<br></br>
				<p className="blackButton">Sign Up</p>
			</div>
		</>
	)
}

export default EventInfo;