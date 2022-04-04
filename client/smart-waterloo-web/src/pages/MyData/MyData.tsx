import { MobileContext } from "../../App";
import {useContext} from "react";
import "./MyData.css";
import Cookies from "universal-cookie";
import {AccountChildProps} from "../AccountParent"
import DataPanels from "./DataPanels/DataPanels";
const MyData = (props: AccountChildProps) => {
	const {mobile} = useContext(MobileContext);
	const cookies = new Cookies();
	cookies.set("back", `/data/${props.org?`org/${props.orgId}`:"user"}`);
	return (
		<div className={"besideAside"}>
			<div className={mobile? "":"fullScreenPanel"}>
				<h4>My Data 📊</h4>
				<hr/>
				<p>A brief description about what the events listed here are and any other info that is required.</p>
				<div className="myDataGrid">
					<DataPanels orgId={props.orgId} org={props.org}/>
				</div>
			</div>
		</div>
	)
}

export default MyData;