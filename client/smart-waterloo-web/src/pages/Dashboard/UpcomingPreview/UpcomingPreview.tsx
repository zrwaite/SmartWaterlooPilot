import {useContext} from "react";
import { MobileContext } from "../../../App";
import DashboardPreviewHeader from "../DashboardPreviewHeader/DashboardpPreviewHeader";

const UpcomingPreview = () => {
	const {mobile} = useContext(MobileContext);
	if (mobile) return (
		<button className="dashboardLinkSection pink">
			<DashboardPreviewHeader mobile={true} name={"upcoming"}/>
		</button>
	)
	return (
		<div className={"panel"}>
			<DashboardPreviewHeader mobile={false} name={"upcoming"}/>
		</div>
	)
}

export default UpcomingPreview;