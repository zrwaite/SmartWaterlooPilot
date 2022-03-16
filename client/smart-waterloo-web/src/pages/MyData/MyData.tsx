import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext, OrgContext, IdContext, AddressContext } from "../../App";
import {useContext, useState} from "react";
import { userDataPanels, orgDataPanels } from "./MyDataPanel/MyDataPanels";
import MyDataPanel from "./MyDataPanel";
import "./MyData.css";
import Cookies from "universal-cookie";
import {exampleUsers, defaultUserData} from "../../data/Users";

const MyData = () => {
	const {mobile} = useContext(MobileContext);
	const {org} = useContext(OrgContext);
	const {address} = useContext(AddressContext);
	const {id} = useContext(IdContext);
	const cookies = new Cookies();
	cookies.set("back", "/data");
	const dataPanelsData = org?orgDataPanels:userDataPanels;

	const [userData, setUserData] = useState(defaultUserData);
	const getUserData = async () => {
		await new Promise(resolve => setTimeout(resolve, 1000)); //Just an artificial delay for mock data
		const user = exampleUsers.find(user => user.userId === id);
		if (!user) {
			alert("Invalid user!");
			return;
		}
		setUserData({
			userDataSet: true,
			nickname: user.nickname,
			avatarString: user.avatarString
		})
	}
	const [dataCalled, setDataCalled] = useState(false);
	if (!dataCalled) {
		getUserData();
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