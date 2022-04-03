import { MobileContext } from "../../App";
import {useContext} from "react";
import { userDataPanels, orgDataPanels } from "./MyDataPanel/MyDataPanels";
import MyDataPanel from "./MyDataPanel";
import "./MyData.css";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import {AccountChildProps} from "../AccountParent"
const MyData = (props: AccountChildProps) => {
	const { orgId } = useParams();
	const {mobile} = useContext(MobileContext);
	const cookies = new Cookies();
	cookies.set("back", `/data/${props.org?`org/${orgId}`:"user"}`);
	const dataPanelsData = props.org?orgDataPanels:userDataPanels;
	return (
		<div className={"besideAside"}>
			<div className={mobile? "":"fullScreenPanel"}>
				<h4>My Data 📊</h4>
				<hr/>
				<p>A brief description about what the events listed here are and any other info that is required.</p>
				<div className={"myDataGrid"}>
					{dataPanelsData.map((panel, i) => {return (
						<MyDataPanel index={i} key={i} {...panel}/>
					);})}
				</div>
			</div>
		</div>
	)
}

export default MyData;