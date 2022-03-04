import "./EventPanel.css";
interface EventPanelProps {
	title: string,
	organization: string,
	age_range: string,
	start_date:string,
	end_date: string,
	category: string,
	signed_up: boolean
}

const EventPanel = (props: EventPanelProps) => {
	return (
		<div className={`eventPanel ${props.signed_up?"activeEventPanel":""}`}>
			<div className="eventPanelHeader">
				<div>
					<p>New</p>
					<p>{props.category}</p>
				</div>
				{props.signed_up?<div>Signed Up</div>:<div></div>}
			</div>
			<h6>{props.title}</h6>
			<p>{props.organization}</p>
			<p>For Ages {props.age_range}</p>
			<p>{props.start_date} {props.end_date}</p>
		</div>
	)
}	

export default EventPanel;