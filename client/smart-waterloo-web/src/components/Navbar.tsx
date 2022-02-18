import "../styles/navbar.css";
import menuIcon from "../images/menu.svg";

function Navbar() {
    return (
		<div className="navbar">
			<div className="leftNav">
				<div className="grey circle h6"></div>
				<h6>Name of the Project</h6>
			</div>
			<div className="rightNav">
				<img className="h6 imageButton" src={menuIcon} alt="menu"/>
			</div>
		</div>
    );
}

export default Navbar;