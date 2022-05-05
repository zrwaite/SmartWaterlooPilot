import { useNavigate } from "react-router-dom";
import "./ProgramPanel.css";
interface ProgramPanelProps {
	id: string,
	org: string,
	age_group: string,
	start_date:string,
	end_date: string,
	category: string,
	signed_up: boolean,
	upcoming?: boolean,
	name: string,
	index: number,
	isOrg: boolean,
	orgId: string|undefined;
	start_time: string;
	end_time: string;
}

const ProgramPanel = (props: ProgramPanelProps) => {
	const activeColour = {
		backgroundColor: props.upcoming?"#F9EEF3":"#6ec6f933"
	}
	const colorText = {color: props.upcoming?"#EF276F":"#3FBAFF"};
	const greyText = {color: "#848484"};
	const colorDiv = {backgroundColor: props.upcoming?"#EF276F":"#3FBAFF"};
	const navigate = useNavigate();
	const startDate = (new Date(props.start_date)).toDateString();
	const endDate = (new Date(props.end_date)).toDateString();
	return (
		<div onClick={() => navigate(`/programdetails/${props.id}/${props.isOrg?`org/${props.orgId}`:"user"}`)} style={props.signed_up?activeColour:{}} className={`programPanel`}>
			<div className="programPanelHeader">
				<div className="horizontal">
					<p style={colorText}>{props.org} | {props.category}</p>
				</div>
				{props.signed_up?<div  style={colorDiv} className={"programBubble"}>Signed Up</div>:<div></div>}
			</div>
			<h6>{props.name}</h6>
			<p style={greyText}>For Ages {props.age_group}</p>
			<p style={greyText}>{startDate}, {props.start_time} to {endDate}, {props.end_time}</p>
		</div>
	)
}	

export default ProgramPanel;