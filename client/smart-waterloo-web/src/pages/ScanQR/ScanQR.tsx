import Navbar from "../../components/Navbar";
import {Link, useNavigate} from "react-router-dom";
import QRDesktopPNG from "../../images/QRDesktop.png";
import QRMobilePNG from "../../images/QRMobile.png";
import "./ScanQR.css";
import {useEffect, useState} from "react";
import {Html5QrcodeScanner, Html5Qrcode} from "html5-qrcode";
import cookies from "../../modules/cookies";
import {useContext} from "react";
import {MobileContext, IdContext} from "../../App";
import {accountExists} from "../../data/account";
const ScanQR = () => {
	let {mobile} = useContext(MobileContext);
	let {setId} = useContext(IdContext);
	const [camOpen, setCamOpen] = useState(false);
	const [closeCam, setCloseCam] = useState({close: ()=>{console.log("hi")}});
	cookies.set("back", "/qr");
	// const [functions, setFunctions] = useState({scan: () => {}});
	const navigate = useNavigate();
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
								setId(decodedText);
								let scannedId = parseInt(decodedText);
								if (typeof decodedText === "string" && scannedId > 0 && scannedId < 10000) {
									let login = await accountExists(scannedId);
									if (login) navigate("/login");
									else navigate("/signup");
								} else alert("invalid qr code");
							},
							(errorMessage) => {}
						)
						.catch((err) => alert("Failed to open camera"))
						.finally(() => {
							setCloseCam({close: () => {
								html5QrCode.stop().catch((err) => {
									alert("Failed to close camera");
								})
								setCamOpen(false);
							}})
						})
				}
			})
			.catch((err) => alert("camera error"))
			
	};
	useEffect(() => {
		// const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 }, undefined);
		// const onScanSuccess = async (decodedText:any, decodedResult:any) => {
		//
		// }
		// setFunctions({scan: () => scanner.render(onScanSuccess, ()=>{})})
	}, [navigate, setId]);

	return (
		<>
			<Navbar signedIn={false} root={true} />
			<div className={"PageContainer"}>
				<div className={mobile ? "" : "DesktopPanel"}>
					<div className={"QRInfoPanel"}>
						<h1>Welcome! 🎉</h1>
						<p>
							{"Want to learn more about it?  "}
							<Link to={"/about"}>Read More</Link>
						</p>
						<Link to={"/privacy"}>Privacy Policy</Link>
						<div className="qrScannerContainer">
							<div id="qr-reader" style={{width: "500px"}}></div>
							<img className={"qrCodePNG"} src={mobile ? QRMobilePNG : QRDesktopPNG} alt="QRCode Scanner" />
						</div>
						<button
							onClick={camOpen?()=>{closeCam.close();}:() => {setCamOpen(true); scan();}}
							className={"blackButton scanCardButton"}
						>{camOpen?"Close Camera":"Scan Card"}</button>
						{/* <div id="qr-reader-results"></div> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default ScanQR;
