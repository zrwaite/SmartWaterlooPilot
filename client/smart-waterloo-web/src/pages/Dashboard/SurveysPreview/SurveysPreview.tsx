import {useContext} from "react";
import { MobileContext } from "../../../App";
import DashboardPreviewHeader from "../DashboardPreviewHeader/DashboardpPreviewHeader";

const MyDataPreview = () => {
	const {mobile} = useContext(MobileContext);
	if (mobile) return (
		<button className="dashboardLinkSection green">
			<DashboardPreviewHeader mobile={true} name={"surveys"}/>
		</button>
	)
	return (
		<div className={"panel"}>
			<DashboardPreviewHeader mobile={false} name={"surveys"}/>
		</div>
	)
}

export default MyDataPreview;