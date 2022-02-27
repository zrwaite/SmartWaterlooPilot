import React from "react";
import {mobileWidth} from "../../constants";
// import {Link} from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ProfileFormGrid from "./ProfileFormGrid/ProfileFormGrid"

import "./Profile.css";
//Todo change buttons to links

type ProfileProps = { };
type ProfileState = {mobileView:boolean};
class Profile extends React.Component<ProfileProps, ProfileState> {
	constructor(props:ProfileProps) {
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
				<Navbar root={true}/>
				<div className="PageContainer">
					<div className={this.state.mobileView? "":"DesktopPanel"}>
						<section className="progressBubbles">
							<hr className="bubblesLine"/>
							<div className="bubbles">
								<div className="bubbleItem">
									<div className="bubble">1</div>
									<p>Password</p>
								</div>
								<div className="bubbleItem">
									<div className="bubble selectedBubble">2</div>
									<p>Profile</p>
								</div>
								<div className="bubbleItem">
									<div className="bubble">3</div>
									<p>Avatar</p>
								</div>
							</div>
						</section>
						<header>
							<h3>Complete Profile 📝</h3>
							<p>
								Explanation of why this information is being collected and how and why it will be used.
							</p>
							<p className="redtext">
								Fields marked with a red * are required.
							</p>
						</header>
						<ProfileFormGrid/>
					</div>
				</div>
			</>
		);
	}
}

export default Profile;