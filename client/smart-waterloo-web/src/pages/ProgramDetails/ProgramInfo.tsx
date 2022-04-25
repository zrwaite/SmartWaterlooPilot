import React from 'react';
import "./ProgramDetails.css";

interface ProgramData {
    name: string;
    id: string;
    age_group: string;
    start_date: string;
    end_date: string;
	min_age: string,
	max_age: string;
	linked_survey_id: string;
    category: string;
    signed_up: boolean;
    description: string;
	location: string
    image: string;
	attendees: string;
    org: boolean;
}
const ProgramInfo = (props: ProgramData): any => {
	return (
		<>
			<div className="DesktopPanelNoBorder">
				<p className="lightblue">NEW</p>
				<p className="lightbluetext">{props.category}</p>
				<h5 className="programTitle">{props.name}</h5>
				<h6 className="programTitle">{props.location}</h6>
				<p className="greytext">For Ages {props.min_age}-{props.max_age}</p>
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

export default ProgramInfo;