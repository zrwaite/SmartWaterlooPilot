import Navbar from "../../components/Navbar";
import { useParams} from "react-router-dom";
import QRDesktopPNG from "../../images/QRDesktop.png";
import QRMobilePNG from "../../images/QRMobile.png";
import "./AddOrgMember.css";
import {Html5Qrcode} from "html5-qrcode";
import {useContext, useState} from "react";
import {MobileContext} from "../../App";
import {accountExists} from "../../data/account";
import { addUserToOrg } from "../../data/addData";
import { AccountChildProps } from "../AccountParent";
import { forceNavigate } from "../../modules/navigate";
const ScanQR = (props:AccountChildProps) => {
	let {mobile} = useContext(MobileContext);
	let {orgId} = useParams();
	const [camOpen, setCamOpen] = useState(false);
	const [closeCam, setCloseCam] = useState({close: ()=>{console.log("hi")}});
	const scan = () => {
		Html5Qrcode.getCameras()
			.then((devices) => {
				if (devices && devices.length) {
					let cameraId = devices[0].id;
					const html5QrCode = new Html5Qrcode("qr-reader");
					html5QrCode
						.start(
							cameraId,
							{fps: 10, qrbox: {width: 250, height: 250}},
							async (decodedText) => {
								html5QrCode.stop().catch((err) => {
									alert("Failed to close camera");
									console.error(err);
								});
								let scannedId = parseInt(decodedText);
								if (scannedId>0 && scannedId<10000) {
									let exists = await accountExists(scannedId);
									if (exists) {
										if (orgId){
											let {success, errors} = await addUserToOrg(scannedId, parseInt(orgId));
											if (success) {
												alert("Member added!");
												forceNavigate(`/dashboard/org/${orgId}`);
											} else {
												alert(JSON.stringify(errors));
											}
										}
										else alert("invalid orgId");
									} else alert("User has not created an account");
								} else alert("invalid qr code");
							},
							() => {}
						)
						.catch((err) => {
							alert("Failed to open camera");
							console.error(err);
						})
						.finally(() => {
							setCloseCam({close: () => {
								html5QrCode.stop().catch((err) => {
									alert("Failed to close camera");
									console.error(err);
								})
								setCamOpen(false);
							}})
						})
					// 
				}
			})
			.catch((err) => {
				alert("camera error");
				console.error(err);
			});
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
						<button onClick={!camOpen?(() => {setCamOpen(true); scan();}):(()=>{closeCam.close()})} className={`blackButton scanCardButton`}>{camOpen?"Close Camera":"Scan Card"}</button>
						<div id="qr-reader" style={{width:"500px"}}></div>
						<div id="qr-reader-results"></div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ScanQR;