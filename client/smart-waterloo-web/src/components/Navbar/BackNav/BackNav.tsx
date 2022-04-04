import { useNavigate } from "react-router-dom";
import {icons} from "../../../images/icons";
import cookies from "../../../modules/cookies";
import "./BackNav.css";

const BackNav = () => {
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate(cookies.get("back")||"/")} className="backButton">
			<img src={icons.leftArrow} alt="back" className="h5"/>
			<h6>Back</h6>
		</div>
	)
}

export default BackNav;