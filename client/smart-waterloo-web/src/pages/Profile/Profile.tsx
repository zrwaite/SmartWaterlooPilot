// import {Link} from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ProfileFormGrid from "./ProfileFormGrid/ProfileFormGrid"

import "./Profile.css";
//Todo change buttons to links
function Profile() {
    return (
		<>
			<Navbar root={true}/>
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
		</>
    );
}

export default Profile;