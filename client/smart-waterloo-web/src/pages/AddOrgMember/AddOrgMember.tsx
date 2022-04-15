import Navbar from "../../components/Navbar";
import { useParams} from "react-router-dom";
import QRDesktopPNG from "../../images/QRDesktop.png";
import QRMobilePNG from "../../images/QRMobile.png";
import "./AddOrgMember.css";
import {Html5Qrcode} from "html5-qrcode";
import {useContext} from "react";
import {MobileContext} from "../../App";
import {accountExists} from "../../data/account";
import { addUserToOrg } from "../../data/addData";
import { AccountChildProps } from "../AccountParent";
const ScanQR = (props:AccountChildProps) => {
	let {mobile} = useContext(MobileContext);
	let {orgId} = useParams();

	const scan = () => {
		Html5Qrcode.getCameras()
			.then((devices) => {
				if (devices && devices.length) {
					var cameraId = devices[0].id;
					const html5QrCode = new Html5Qrcode("qr-reader");
					html5QrCode
						.start(
							cameraId,
							{fps: 10, qrbox: {width: 250, height: 250}},
							async (decodedText, decodedResult) => {
								html5QrCode.stop().catch((err) => {
									alert("Failed to close camera");
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
							},
							(errorMessage) => {}
						)
						.catch((err) => alert("Failed to open camera"));
				}
			})
			.catch((err) => alert("camera error"));
	};

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
						<button onClick={scan} className={"blackButton scanCardButton"}>Scan Card</button>
						<div id="qr-reader" style={{width:"500px"}}></div>
						<div id="qr-reader-results"></div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ScanQR;