import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext, OrgContext } from "../../App";
import {useContext} from "react";
import { userDataPanels, orgDataPanels } from "./MyDataPanel/MyDataPanels";
import MyDataPanel from "./MyDataPanel";
import "./MyData.css";
import Cookies from "universal-cookie";
const MyData = () => {
	const {mobile} = useContext(MobileContext);
	const {org} = useContext(OrgContext);
	const cookies = new Cookies();
	cookies.set("back", "/data");
	const dataPanelsData = org?orgDataPanels:userDataPanels;
	return (
		<>
			<Navbar root={true}/>
			<div className={mobile?"PageContainer":"asideContainer"}>
				{mobile?null:<Sidebar page="data"/>}
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
			</div>
		</>
	)
}

export default MyData;