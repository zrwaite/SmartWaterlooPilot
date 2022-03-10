import Navbar from "../../components/Navbar";
import {Link, useNavigate} from "react-router-dom";
import QRDesktopPNG from "../../images/QRDesktop.png";
import QRMobilePNG from "../../images/QRMobile.png";
import "./ScanQR.css";
import { useEffect, useState } from "react";
import {Html5QrcodeScanner} from "html5-qrcode";
import Cookies from "universal-cookie";
import {useContext} from "react";
import {MobileContext} from "../../App";
const ScanQR = () => {
	let {mobile} = useContext(MobileContext);
	const cookies = new Cookies()
	cookies.set("back", "/qr");
	const [functions, setFunctions] = useState({scan: () => {}});
	const navigate = useNavigate()
	useEffect(() => {
		const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 }, undefined)
		const onScanSuccess = (decodedText:any, decodedResult:any) => {
			alert(`Scan result ${decodedText}`);
			scanner.clear().catch(error => {
				console.error("Failed to clear html5QrcodeScanner. ", error);
			});
			navigate("/signup");
		}
		setFunctions({scan: () => scanner.render(onScanSuccess, ()=>{})})
	}, [navigate])
	return (
		<>
			<Navbar root={true}/>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanel"}>
					<div className={"QRInfoPanel"}>
						<h1>Welcome! 🎉</h1>
						<p>
							Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Want to learn more about it? 
							<Link to={"/about"}>Read More</Link>
						</p>
						<Link to={"/privacy"} >Privacy Policy</Link>
						<img className={"qrCodePNG"} src={mobile?QRMobilePNG:QRDesktopPNG} alt="QRCode Scanner"/>
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