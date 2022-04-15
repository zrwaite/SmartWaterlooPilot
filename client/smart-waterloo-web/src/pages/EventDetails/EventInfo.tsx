import React from 'react';
import "./EventDetails.css";
// import eventDataRaw from './EventDetailsData.json';

interface EventData {
    name: string;
    id: string;
    age_range: string;
    start_date: string;
    end_date: string;
    category: string;
    signed_up: boolean;
    description: string;
    image: string;
	attendees: string;
    org: boolean;
}
const EventInfo = (props: EventData): any => {
	return (
		<>
			{/* <div className={"eventDetails"}>
				<img src={event.image} alt={event.title} className="eventImage" />
			</div> */}
			<div className="DesktopPanelNoBorder">
				<p className="lightblue">NEW</p>
				<p className="lightbluetext">{props.category}</p>
				<h5 className="eventTitle">{props.name}</h5>
				<p className="greytext">For Ages {props.age_range}</p>
				<p className="greytext">{props.start_date} {props.end_date}</p>
				<br></br>
				<p >{props.description}</p>
				{
					props.org&&(<>
						<p>Signed Up: {props.attendees}</p>
						
					</>)
				}
			</div>
		</>
	)
}

export default EventInfo;