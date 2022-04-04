import Navbar from "../../components/Navbar";
import { useNavigate, useParams} from "react-router-dom";
import QRDesktopPNG from "../../images/QRDesktop.png";
import QRMobilePNG from "../../images/QRMobile.png";
import "./AddOrgMember.css";
import { useEffect, useState } from "react";
import {Html5QrcodeScanner} from "html5-qrcode";
import {useContext} from "react";
import {MobileContext} from "../../App";
import {accountExists} from "../../data/account";
import { addUserToOrg } from "../../data/addData";
import { AccountChildProps } from "../AccountParent";
const ScanQR = (props:AccountChildProps) => {
	const [functions, setFunctions] = useState({scan: () => {}});
	let {mobile} = useContext(MobileContext);
	const navigate = useNavigate();
	let {orgId} = useParams();

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
	}, [navigate, orgId]);

	return (
		<>
			<Navbar root={false}/>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanel"}>
					<div className={"QRInfoPanel"}>
						<h2>Add Member to {props.accountData.account.nickname}</h2>
						<p>
							Scan user's id to add them to your org
						</p>
						<div className={mobile?"center":"horizontal"}>
							<img className={"avatarImg"} src={props.accountData.account.avatar_string===""?"":`https://avatars.dicebear.com/api/bottts/${props.accountData.account.avatar_string}.svg`} alt=""/>
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