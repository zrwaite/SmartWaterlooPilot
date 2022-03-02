import Navbar from "../../components/Navbar";
import {mobileWidth} from "../../constants";
// import {Link} from "react-router-dom";
import QRDesktopPNG from "../../images/QRDesktop.png";
import QRMobilePNG from "../../images/QRMobile.png";
import "./ScanQR.css";
import React from "react";
import Cookies from "universal-cookie";
//Todo change buttons to links
type ScanQRProps = { };
type ScanQRState = { mobileView: boolean };
class ScanQR extends React.Component<ScanQRProps, ScanQRState> {
	cookies = new Cookies()
	constructor(props:ScanQRProps) {
		super(props);
		this.cookies.set("back", "/qr");
		this.updatePredicate = this.updatePredicate.bind(this);
		this.state = {
			mobileView:false
		}
	}
	componentDidMount() {
		this.updatePredicate();
		window.addEventListener("resize", this.updatePredicate);
	}
	
	componentWillUnmount() {
		window.removeEventListener("resize", this.updatePredicate);
	}
	
	updatePredicate() {
		this.setState({ ...this.state, mobileView: window.innerWidth < mobileWidth });
	}
	render () {

		return (
			<>
				<Navbar root={true}/>
				<div className={"PageContainer"}>
					<div className={this.state.mobileView? "":"DesktopPanel"}>
						<div className={"QRInfoPanel"}>
							<h1>Welcome! 🎉</h1>
							<p>
								Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Want to learn more about it? 
								<a>Read More</a>
							</p>
							<a>Privacy Policy</a>
							<img className={"qrCodePNG"} src={this.state.mobileView?QRMobilePNG:QRDesktopPNG} alt="QRCode Scanner"/>
							<button className={"blackButton scanCardButton"}>Scan Card</button>

						</div>
					</div>
				</div>
			</>
		);
	}
}

export default ScanQR;