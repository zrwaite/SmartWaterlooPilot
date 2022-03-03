import {useContext} from "react";
import { MobileContext } from "../../../App";
import DashboardPreviewHeader from "../DashboardPreviewHeader/DashboardpPreviewHeader";
const EventPreview = () => {
	const {mobile} = useContext(MobileContext);
	if (mobile) return (
		<button className="dashboardLinkSection blue">
			<DashboardPreviewHeader mobile={true} name={"events"}/>
		</button>
	);
	return (
		<div className={"panel"}>
			<DashboardPreviewHeader mobile={false} name={"events"}/>
		</div>
	)
}

export default EventPreview;