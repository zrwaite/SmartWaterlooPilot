import OrgDataPanel from "./OrgData";
import OrgEventsPanel from "./OrgEvents";
import OrgSurveysPanel from "./OrgSurveys";
import UserAccessPanel from "./UserAccess";
import UserAnswersPanel from "./UserAnswers";
import UserDataPanel, { MyDataPanelProps } from "./UserData";

interface DataPanelsProps extends MyDataPanelProps {
	org: boolean, 
	orgId: string|undefined
}

const DataPanels = (props: DataPanelsProps) => {
	return (
		<>{
			props.org?(<>
				<OrgDataPanel/>
				<OrgEventsPanel orgId={props.orgId} />
				<OrgSurveysPanel orgId={props.orgId} />
			</>):(<>
				<UserDataPanel religion={props.religion} gender={props.gender} race={props.race} />
				<UserAnswersPanel/>
				<UserAccessPanel/>
			</>)
		}</>
	)
}
export default DataPanels;