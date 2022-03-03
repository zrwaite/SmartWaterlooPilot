import {useContext} from "react";
import { MobileContext } from "../../../App";
import DashboardPreviewHeader from "../DashboardPreviewHeader/DashboardpPreviewHeader";


const MyDataPreview = () => {
	const {mobile} = useContext(MobileContext);
	if (mobile) return (
		<button className="dashboardLinkSection purple">
			<DashboardPreviewHeader mobile={true} name={"data"}/>
		</button>
	)
	return (
		<div className={"panel"}>
			<DashboardPreviewHeader mobile={false} name={"data"}/>
		</div>
	)
}

export default MyDataPreview;