import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext, IdContext, AddressContext } from "../../App";
import {useContext, useState} from "react";
import { userDataPanels, orgDataPanels } from "./MyDataPanel/MyDataPanels";
import MyDataPanel from "./MyDataPanel";
import "./MyData.css";
import Cookies from "universal-cookie";
import { defaultAccountData} from "../../data/account";
import { getBasicUserData, getUserOrgs} from "../../data/getData"
import Settings from "../../components/Settings";
import { defaultOrgsState } from "../../data/orgs";


const MyData = (props: {org: boolean}) => {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [orgsData, setOrgsData] = useState(defaultOrgsState);
	const [accountData, setAccountData] = useState(defaultAccountData);
	const [dataCalled, setDataCalled] = useState(false);

	const {mobile} = useContext(MobileContext);
	const {address} = useContext(AddressContext);
	const {id} = useContext(IdContext);
	const cookies = new Cookies();
	cookies.set("back", "/data");
	const dataPanelsData = props.org?orgDataPanels:userDataPanels;

	const getSetUserData = async () => {
		let {success, response} = await getBasicUserData();
		if (!success) alert(JSON.stringify(response));	
		else setAccountData(response);
	}
	const getSetOrgsData = async () => {
		let {success, orgs, errors} = await getUserOrgs(cookies.get("userId"));
		if (!success) alert(JSON.stringify(errors));
		else setOrgsData({orgs: orgs, set: true })
	}
	if (!dataCalled) {
		getSetOrgsData();
		getSetUserData();
		setDataCalled(true);
	}
	return (
		<>
			<Navbar root={true}/>
			<Settings open={settingsOpen} closeModal={() => setSettingsOpen(false)}/>
			<div className={mobile?"PageContainer":"asideContainer"}>
				{mobile?null:<Sidebar orgs={orgsData.orgs} {...accountData} openSettings={() => setSettingsOpen(true)} page="data"/>}
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