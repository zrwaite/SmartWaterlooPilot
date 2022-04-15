import OrgDataPanel from "./OrgData";
import OrgEventsPanel from "./OrgEvents";
import OrgSurveysPanel from "./OrgSurveys";
import UserAccessPanel from "./UserAccess";
import UserAnswersPanel from "./UserAnswers";
import UserDataPanel from "./UserData";

const DataPanels = (props: {org: boolean, orgId: string|undefined}) => {
	return (
		<>{
			props.org?(<>
				<OrgDataPanel/>
				<OrgEventsPanel orgId={props.orgId} />
				<OrgSurveysPanel orgId={props.orgId} />
			</>):(<>
				<UserDataPanel/>
				<UserAnswersPanel/>
				<UserAccessPanel/>
			</>)
		}</>
	)
}
export default DataPanels;