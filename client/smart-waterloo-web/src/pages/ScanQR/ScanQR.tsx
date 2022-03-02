import Navbar from "../../components/Navbar";
import {Link} from "react-router-dom";
import QRDesktopPNG from "../../images/QRDesktop.png";
import QRMobilePNG from "../../images/QRMobile.png";
import "./ScanQR.css";
import React from "react";
import Cookies from "universal-cookie";
import {useContext} from "react";
import {MobileContext} from "../../App";
const ScanQR = () => {
	let {mobile} = useContext(MobileContext);
	const cookies = new Cookies()
	cookies.set("back", "/qr");
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
						<button className={"blackButton scanCardButton"}>Scan Card</button>

					</div>
				</div>
			</div>
		</>
	);
}

export default ScanQR;