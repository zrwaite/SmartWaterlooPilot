import {useContext} from "react";
import { MobileContext } from "../../../App";
import arrowIcon from "../../../images/arrow.png";
import Data from "./DashboardPreviewData";
import "./DashboardPreviewHeader.css";
interface DashboardPreviewHeaderProps {
	name: keyof typeof Data;
	mobile: boolean
}
const DashboardPreviewHeader = (props:DashboardPreviewHeaderProps) => {
	const dataset = Data[props.name];
	return (
		<div className ={"previewHeaderContainer"}>
			<img className="dashboardLinkIcon" src={dataset.icon} alt={dataset.iconName}/>
			<div>
				<h5>{dataset.title}</h5>
				<hr/>
				<p>{props.mobile?dataset.short:dataset.long}</p>
			</div>
			<img className="dashboardLinkArrow" src={arrowIcon} alt="arrow"/>
		</div>
	)
}

interface DashboardPreviewProps {
	name: keyof typeof Data;
}
const DashboardPreview = (props:DashboardPreviewProps) => {
	const {mobile} = useContext(MobileContext);
	const color = Data[props.name].color;
	if (mobile) return (
		<button className={`dashboardLinkSection ${color}`}>
			<DashboardPreviewHeader mobile={true} name={props.name}/>
		</button>
	);
	return (
		<div className={"panel"}>
			<DashboardPreviewHeader mobile={false} name={props.name}/>
		</div>
	)
}

export default DashboardPreview;