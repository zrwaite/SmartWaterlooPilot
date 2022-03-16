import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext, OrgContext, IdContext, AddressContext } from "../../App";
import {useContext, useState} from "react";
import { userDataPanels, orgDataPanels } from "./MyDataPanel/MyDataPanels";
import MyDataPanel from "./MyDataPanel";
import "./MyData.css";
import Cookies from "universal-cookie";
import { defaultUserData} from "../data/Users";
import { getUserData} from "../data/getData"


const MyData = () => {
	const {mobile} = useContext(MobileContext);
	const {org} = useContext(OrgContext);
	const {address} = useContext(AddressContext);
	const {id} = useContext(IdContext);
	const cookies = new Cookies();
	cookies.set("back", "/data");
	const dataPanelsData = org?orgDataPanels:userDataPanels;

	const [userData, setUserData] = useState(defaultUserData);
	const getSetUserData = async () => {
		let users = await getUserData();
		if (!users) return;
		setUserData(users)
	}
	const [dataCalled, setDataCalled] = useState(false);
	if (!dataCalled) {
		getSetUserData();
		setDataCalled(true);
	}
	return (
		<>
			<Navbar root={true}/>
			<div className={mobile?"PageContainer":"asideContainer"}>
				{mobile?null:<Sidebar {...userData} page="data"/>}
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