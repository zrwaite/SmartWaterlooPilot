import Navbar from "../../components/Navbar";
import {Link, useNavigate, useParams} from "react-router-dom";
import QRDesktopPNG from "../../images/QRDesktop.png";
import QRMobilePNG from "../../images/QRMobile.png";
import "./AddOrgMember.css";
import { useEffect, useState } from "react";
import {Html5QrcodeScanner} from "html5-qrcode";
import Cookies from "universal-cookie";
import {useContext} from "react";
import {MobileContext} from "../../App";
import {accountExists} from "../../data/account";
import { defaultAccountState } from "../../data/types/account";
import { getBasicOrgData, getUserOrgs } from "../../data/getData";
import { addUserToOrg } from "../../data/addData";
import { defaultOrgsState } from "../../data/types/orgs";
const ScanQR = () => {
	const [accountData, setAccountData] = useState(defaultAccountState);
	const [functions, setFunctions] = useState({scan: () => {}});
	const [orgsData, setOrgsData] = useState(defaultOrgsState);
	const [dataPulled, setDataPulled] = useState(false);
	let {mobile} = useContext(MobileContext);
	const cookies = new Cookies();
	cookies.set("back", "/qr");
	const navigate = useNavigate();
	let {orgId} = useParams();

	const getSetOrgsData = async () => {
		let {success, orgs, errors} = await getUserOrgs(cookies.get("userId"));
		if (!success) {
			if (errors.length) alert(JSON.stringify(errors));
		}
		else setOrgsData({orgs: orgs, set: true })
	}
	const getSetOrgData = async () => {
		let {success, org, errors} = await getBasicOrgData(orgId);
		if (!success) {
			alert(JSON.stringify(errors));
			console.error("GetsetOrgData failure");
		}
		else if ('nickname' in org) {
			setAccountData({
				account: {avatarString: org.avatar_string, nickname: org.nickname}, 
				set: true
			});
		}
		else console.error("invalid userData response");
	}


	useEffect(() => {
		const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 }, undefined);
		const onScanSuccess = async (decodedText:any, decodedResult:any) => {
			await scanner.clear().catch((error : any) => {
				console.error("Failed to clear html5QrcodeScanner. ", error);
			});
			let scannedId = parseInt(decodedText);
			if (typeof decodedText === "string" && scannedId>0 && scannedId<10000) {
				let exists = await accountExists(scannedId);
				if (exists) {
					if (orgId){
						let {success, errors} = await addUserToOrg(scannedId, parseInt(orgId));
						if (success) {
							alert("Member added!");
						} else {
							alert(JSON.stringify(errors));
						}
					}
					else alert("invalid orgId");
				} else alert("User has not created an account");
			} else alert("invalid qr code");
		}
		setFunctions({scan: () => scanner.render(onScanSuccess, ()=>{})})
	}, [navigate]);

	if (!dataPulled) {
		getSetOrgData();
		getSetOrgsData();
		setDataPulled(true);
	}

	return (
		<>
			<Navbar org={true} orgs={orgsData.orgs} orgId={orgId}  signedIn={true} root={true}/>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanel"}>
					<div className={"QRInfoPanel"}>
						<h2>Add Member to {accountData.account.nickname}</h2>
						<p>
							Scan user's id to add them to your org
						</p>
						<div className={mobile?"center":"horizontal"}>
							<img className={"avatarImg"} src={accountData.account.avatarString===""?"":`https://avatars.dicebear.com/api/bottts/${accountData.account.avatarString}.svg`} alt=""/>
							<img className={"qrCodePNG"} src={mobile?QRMobilePNG:QRDesktopPNG} alt="QRCode Scanner"/>
						</div>
						<button onClick={() => functions.scan()} className={"blackButton scanCardButton"}>Scan Card</button>
						<div id="qr-reader" style={{width:"500px"}}></div>
						<div id="qr-reader-results"></div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ScanQR;