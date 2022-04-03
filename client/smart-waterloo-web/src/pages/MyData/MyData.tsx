import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext, AddressContext } from "../../App";
import {useContext, useState} from "react";
import { userDataPanels, orgDataPanels } from "./MyDataPanel/MyDataPanels";
import MyDataPanel from "./MyDataPanel";
import "./MyData.css";
import Cookies from "universal-cookie";
import { defaultAccountData} from "../../data/account";
import { getBasicUserData, getUserOrgs} from "../../data/getData"
import Settings from "../../components/Settings";
import { defaultOrgsState } from "../../data/orgs";
import OrgsModal from "../../components/OrgsModal";
import { useParams } from "react-router-dom";


const MyData = (props: {org: boolean}) => {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [orgsData, setOrgsData] = useState(defaultOrgsState);
	const [accountData, setAccountData] = useState(defaultAccountData);
	const [dataCalled, setDataCalled] = useState(false);
	const [orgsModalOpen, setOrgsModalOpen] = useState(false);
	const { orgId } = useParams();
	const {mobile} = useContext(MobileContext);
	const {address} = useContext(AddressContext);
	const cookies = new Cookies();
	cookies.set("back", `/data/${props.org?`org/${orgId}`:"user"}`);
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
			<Navbar root={true} org={props.org} orgId={orgId} orgs={orgsData.orgs} signedIn={true}/>
			<Settings open={settingsOpen} closeModal={() => setSettingsOpen(false)}/>
			<OrgsModal orgs={orgsData.orgs} open={orgsModalOpen} closeModal={() => setOrgsModalOpen(false)}/>
			<div className={mobile?"PageContainer":"asideContainer"}>
				{mobile?null:<Sidebar org={props.org} orgId={orgId} orgs={orgsData.orgs} {...accountData} openOrgsModal={() => setOrgsModalOpen(true)} openSettings={() => setSettingsOpen(true)} page="data"/>}
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