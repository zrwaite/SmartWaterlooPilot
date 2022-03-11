import { Navigate, useNavigate } from "react-router-dom";
import "./EventPanel.css";
interface EventPanelProps {
	title: string,
	organization: string,
	age_range: string,
	start_date:string,
	end_date: string,
	category: string,
	signed_up: boolean,
	upcoming?: boolean,
	name: string,
	index: number,
}

const EventPanel = (props: EventPanelProps) => {
	const activeColour = {
		backgroundColor: props.upcoming?"#F9EEF3":"#6ec6f933"
	}
	const colorText = {color: props.upcoming?"#EF276F":"#3FBAFF"};
	const greyText = {color: "#848484"};
	const colorDiv = {backgroundColor: props.upcoming?"#EF276F":"#3FBAFF"};
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate(`/event/${props.name}`)} style={props.signed_up?activeColour:{}} className={`eventPanel`}>
			<div className="eventPanelHeader">
				<div className="horizontal">
					<p style={colorDiv} className={"eventBubble"}>NEW</p>
					<p style={colorText}>{props.category}</p>
				</div>
				{props.signed_up?<div  style={colorDiv} className={"eventBubble"}>Signed Up</div>:<div></div>}
			</div>
			<h6>{props.title}</h6>
			<p>{props.organization}</p>
			<p style={greyText}>For Ages {props.age_range}</p>
			<p style={greyText}>{props.start_date} {props.end_date}</p>
		</div>
	)
}	

export default EventPanel;