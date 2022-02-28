import React from "react";
// import {Link} from "react-router-dom";
import ProfileFormGrid from "./FormGrid/FormGrid"

import "./Profile.css";
//Todo change buttons to links

type ProfileProps = { 
	updateStep: Function;
};
type ProfileState = { };
class Profile extends React.Component<ProfileProps, ProfileState> {
	// constructor(props:ProfileProps) {
	// 	super(props);
	// }
	render() {
		return (
			<>
				<header>
					<h3>Complete Profile 📝</h3>
					<p>
						Explanation of why this information is being collected and how and why it will be used.
					</p>
					<p className="redtext">
						Fields marked with a red * are required.
					</p>
				</header>
				<ProfileFormGrid updateStep={this.props.updateStep}/>
			</>
		);
	}
}

export default Profile;