import React from 'react';
import "./ProgramDetails.css";
import {Question} from "../../data/types/surveys";

interface ProgramData {
	name: string;
	id: string;
	age_group: string;
	start_date: string;
	end_date: string;
	min_age: string,
	max_age: string;
	start_time: string;
	end_time: string;
	questions: Question[];
	category: string;
	signed_up: boolean;
	description: string;
	location: string
	image: string;
	attendees: string;
	org: boolean;
	orgName: string|null;
}

//Todo: Change name to organization name
const ProgramInfo = (props: ProgramData): any => {
	const startDate = (new Date(props.start_date)).toDateString();
	const endDate = (new Date(props.end_date)).toDateString();
	return (
		<>
			<div className="DesktopPanelNoBorder">
				<p className="lightbluetext">{props.orgName} | {props.category}</p> 
				<h5 className="programTitle">{props.name}</h5>
				<h6 className="programTitle">{props.location}</h6>
				<p className="greytext">For Ages {props.min_age}-{props.max_age}</p>
				<p className="greytext">{startDate}, {props.start_time} to {endDate}, {props.end_time}</p>
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