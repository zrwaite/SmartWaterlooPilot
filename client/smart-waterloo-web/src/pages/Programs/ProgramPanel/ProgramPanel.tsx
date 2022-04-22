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
}

const ProgramPanel = (props: ProgramPanelProps) => {
	const activeColour = {
		backgroundColor: props.upcoming?"#F9EEF3":"#6ec6f933"
	}
	const colorText = {color: props.upcoming?"#EF276F":"#3FBAFF"};
	const greyText = {color: "#848484"};
	const colorDiv = {backgroundColor: props.upcoming?"#EF276F":"#3FBAFF"};
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate(`/programdetails/${props.id}/${props.isOrg?`org/${props.orgId}`:"user"}`)} style={props.signed_up?activeColour:{}} className={`programPanel`}>
			<div className="programPanelHeader">
				<div className="horizontal">
					<p style={colorDiv} className={"programBubble"}>NEW</p>
					<p style={colorText}>{props.category}</p>
				</div>
				{props.signed_up?<div  style={colorDiv} className={"programBubble"}>Signed Up</div>:<div></div>}
			</div>
			<h6>{props.name}</h6>
			<p style={greyText}>For Ages {props.age_group}</p>
			<p style={greyText}>{props.start_date} {props.end_date}</p>
		</div>
	)
}	

export default ProgramPanel;