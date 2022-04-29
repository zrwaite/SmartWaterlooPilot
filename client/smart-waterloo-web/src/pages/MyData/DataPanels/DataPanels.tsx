import OrgDataPanel from "./OrgData";
import OrgProgramsPanel from "./OrgPrograms";
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
				<OrgProgramsPanel orgId={props.orgId} />
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