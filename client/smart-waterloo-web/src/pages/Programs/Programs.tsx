import { MobileContext } from "../../App";
import { useContext } from "react";
import "./Programs.css";
import ProgramPanel from "./ProgramPanel";
import cookies from "../../modules/cookies";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {AccountChildProps} from "../AccountParent"
const Programs = (props: AccountChildProps) => {
	const { mobile } = useContext(MobileContext);
	let {orgId} = useParams();
	const navigate = useNavigate();
	cookies.set("back", `/programs/${props.org?`org/${orgId}`:"user"}`);
	return (
		<div className={"besideAside"}>
			<div className={mobile ? "" : "fullScreenPanel"}>
				<h4>Programs 🎟️</h4>
				<hr />
				<p>A brief description about what the programs listed here are and any other info that is required.</p>
				<div className={"programGrid"}>
					{props.org && props.verified ? <div className={"addProgramSection"}>
						<button onClick={() => navigate(`/createprogram/${props.orgId}`)} className={"blackButton addProgramButton"}>Add Program</button>
					</div> : null}
					{
						props.programsData.set ?
							props.programsData.programs.map((program, i) => {
								return (
									<ProgramPanel {...props} orgId={props.orgId} key={i} program={program} />
								);
							}):
							[1, 2, 3, 4, 5].map((_,i) => { return <div key={i} className={"center"}> <ClipLoader color={"black"} loading={true} css={""} size={100} /> </div> })
					}
				</div>
			</div>
		</div>
	)
}

export default Programs;