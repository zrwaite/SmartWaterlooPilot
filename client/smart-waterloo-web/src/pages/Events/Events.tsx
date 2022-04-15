import { MobileContext } from "../../App";
import { useContext } from "react";
import "./Events.css";
import EventPanel from "./EventPanel";
import cookies from "../../modules/cookies";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {AccountChildProps} from "../AccountParent"
const Events = (props: AccountChildProps) => {
	const { mobile } = useContext(MobileContext);
	// let { address } = useContext(AddressContext);
	let {orgId} = useParams();
	const navigate = useNavigate();
	cookies.set("back", `/events/${props.org?`org/${orgId}`:"user"}`);
	return (
		<div className={"besideAside"}>
			<div className={mobile ? "" : "fullScreenPanel"}>
				<h4>Events 🎟️</h4>
				<hr />
				<p>A brief description about what the events listed here are and any other info that is required.</p>
				<div className={"eventGrid"}>
					{props.org && props.verified ? <div className={"addEventSection"}>
						<button onClick={() => navigate(`/createevent/${props.orgId}`)} className={"blackButton addEventButton"}>Add Event</button>
					</div> : null}
					{
						props.eventsData.set ?
							props.eventsData.events.map((event, i) => {
								return (
									<EventPanel isOrg={props.org} orgId={props.orgId} index={i} key={i} {...event} />
								);
							}):
							[1, 2, 3, 4, 5].map((_,i) => { return <div key={i} className={"center"}> <ClipLoader color={"black"} loading={true} css={""} size={100} /> </div> })
					}
				</div>
			</div>
		</div>
	)
}

export default Events;