import arrowIcon from "../../../images/arrow.png";
import Data from "./DashboardPreviewHeaderData";
import "./DashboardPreviewHeader.css";
type DashboardPreviewHeaderProps = {
	name: keyof typeof Data;
	mobile: boolean
}
const DashboardPreviewHeader = (props:DashboardPreviewHeaderProps) => {
	const dataset = Data[props.name];
	return (
		<div className ={"previewHeaderContainer"}>
			<img className="dashboardLinkIcon" src={dataset.icon} alt="ticket"/>
			<div>
				<h5>{dataset.title}</h5>
				<hr/>
				<p>{props.mobile?dataset.short:dataset.long}</p>
			</div>
			<img className="dashboardLinkArrow" src={arrowIcon} alt="arrow"/>
		</div>
	)
}

export default DashboardPreviewHeader;