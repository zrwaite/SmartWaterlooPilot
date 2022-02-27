import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import {mobileWidth} from "../../constants";
import "./Privacy.css";
// import {Link} from "react-router-dom";
//Todo change buttons to links
type PrivacyProps = {};
type PrivacyState = {mobileView: boolean};
class Privacy extends React.Component<PrivacyProps, PrivacyState> {
	constructor(props:PrivacyProps) {
		super(props);
		this.updateSize = this.updateSize.bind(this);
		this.state = {
			mobileView:false
		}
	}
	componentDidMount() {
		this.updateSize();
		window.addEventListener("resize", this.updateSize);
	}
	
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateSize);
	}
	
	updateSize() {
		this.setState({ ...this.state, mobileView: window.innerWidth < mobileWidth });
	}
	render() {

		return (
			<>
				<Navbar root={false}/>
				<div className={"PageContainer"}>
					<div className={this.state.mobileView? "":"DesktopPanel"}>
						{this.state.mobileView?<h6 className={"PrivacyMobileHeader"}>Privacy Policy 😎</h6>:<h4 className={"PrivacyDesktopHeader"}>Privacy Policy 😎</h4>}
						<p>
							Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. 
							<br/>
							<br/>
							Explanation of the project in a brief and simple way. nd simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. nd simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. nd simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. 
							<br/>
							<br/>
							Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. nd simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. Explanation of the project in a brief and simple way. 
						</p>
					</div>
				</div>	
			</>
		);
	}
}

export default Privacy;