import { useNavigate } from "react-router-dom"
import {icons} from "../../../images/icons";
import "./MobileNavItem.css";
type MovileNavItemProps = {
	link: string,
	title: string,
	i: number;
}
const MovileNavItem = (props:MovileNavItemProps) => {
	const navigate = useNavigate()
	return (
		<div onClick={() => navigate(props.link)}>
			{props.i?<hr></hr>:null}
			<div className="navModalItem">
				<h6>{props.title}</h6>
				<img className="h5" src={icons.rightArrow} alt="arrow"></img>
			</div>
		</div>
	)
}

export default MovileNavItem;