import { useNavigate } from "react-router-dom";
import { defaultProgram } from "../../../data/types/programs";
import { AccountChildProps } from "../../AccountParent";
import "./ProgramPanel.css";
interface ProgramPanelProps extends AccountChildProps{
	program: typeof defaultProgram
	orgId: string|undefined;
}

//Todo: Change name to organization name
const ProgramPanel = (props: ProgramPanelProps) => {
	const signedUp = props.accountData.account.programs.includes(parseInt(props.program.id));
	const activeColour = {
		backgroundColor: signedUp?"#6ec6f933":"white"
	}
	const colorDiv = {backgroundColor: "#3FBAFF"};
	const greyText = {color: "#848484"};
	const navigate = useNavigate();
	const startDate = (new Date(props.program.start_date)).toDateString();
	const endDate = (new Date(props.program.end_date)).toDateString();
	const orgName = props.orgNames.set?( props.orgNames.names.find(org => org.id.toString() == props.program.org)?.nickname ||null ):null;

	return (
		<div onClick={() => navigate(`/programdetails/${props.program.id}/${props.org?`org/${props.orgId}`:"user"}`)} style={activeColour} className={`programPanel`}>
			<div className="programPanelHeader">
				<div className="horizontal">
					<p>{orgName} | {props.program.category}</p>
				</div>
				{signedUp?<div  style={colorDiv} className={"programBubble"}>Signed Up</div>:<div></div>}
			</div>
			<h6>{props.program.name}</h6>
			<p style={greyText}>For Ages {props.program.age_group}</p>
			<p style={greyText}>{startDate}, {props.program.start_time} to {endDate}, {props.program.end_time}</p>
		</div>
	)
}	

export default ProgramPanel;