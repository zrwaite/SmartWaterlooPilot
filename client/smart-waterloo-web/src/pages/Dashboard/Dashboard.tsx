// import {Link} from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";

//Todo change buttons to links
import avatarImg from "../../images/avatar.png";
import calenderImg from "../../images/calender.png";
import dataImg from "../../images/data.png";
import ticketImg from "../../images/ticket.png";
import clipboardImg from "../../images/clipboard.png";
import settingsIcon from "../../images/settings.svg";
import arrowIcon from "../../images/arrow.png";
function Account() {
    return (
		<>
			<Navbar root={true}/>
			<header className="centre">
				<h4>Dashboard 📌</h4>
				<img className="avatarProfile" src={avatarImg} alt="avatarImage"/>
				<div className="horizontal">
					<h5>Tyragreenex</h5>
					<img className="h5 imageButton" src={settingsIcon} alt="settingsIcon"/>
				</div>
			</header>
			<main>
				<button className="dashboardLinkSection pink">
					<img className="dashboardLinkIcon" src={calenderImg} alt="calender"/>
					<div>
						<h5>Coming Up</h5>
						<hr/>
						<p>See my events</p>
					</div>
					<img className="dashboardLinkArrow" src={arrowIcon} alt="arrow"/>
				</button>
				<button className="dashboardLinkSection purple">
					<img className="dashboardLinkIcon" src={dataImg} alt="data"/>
					<div>
						<h5>My Data</h5>
						<hr/>
						<p>See my data</p>
					</div>
					<img className="dashboardLinkArrow" src={arrowIcon} alt="arrow"/>
				</button>
				<button className="dashboardLinkSection blue">
					<img className="dashboardLinkIcon" src={ticketImg} alt="ticket"/>
					<div>
						<h5>Events</h5>
						<hr/>
						<p>See events list</p>
					</div>
					<img className="dashboardLinkArrow" src={arrowIcon} alt="arrow"/>
				</button>
				<button className="dashboardLinkSection green">
					<img className="dashboardLinkIcon" src={clipboardImg} alt="clipboard"/>
					<div>
						<h5>Surveys</h5>
						<hr/>
						<p>See surveys list</p>
					</div>
					<img className="dashboardLinkArrow" src={arrowIcon} alt="arrow"/>
				</button>
			</main>
		</>
    );
}

export default Account;