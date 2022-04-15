import {icons} from "../../../images/icons";
import "./MobileNavItem.css";
type MovileNavItemProps = {
	onClick: () => void,
	title: string,
	i: number;
}
const MovileNavItem = (props:MovileNavItemProps) => {
	return (
		<div onClick={props.onClick}>
			{props.i?<hr></hr>:null}
			<div className="navModalItem">
				<h6>{props.title}</h6>
				<img className="h5" src={icons.rightArrow} alt="arrow"></img>
			</div>
		</div>
	)
}

export default MovileNavItem;