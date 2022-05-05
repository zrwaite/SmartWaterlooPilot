import { AccountChildProps } from "../../AccountParent";
import OrgDataPanel from "./OrgData";
import OrgProgramsPanel from "./OrgPrograms";
import OrgSurveysPanel from "./OrgSurveys";
import UserAccessPanel from "./UserAccess";
import UserAnswersPanel from "./UserAnswers";
import UserDataPanel from "./UserData";

const DataPanels = (props: AccountChildProps) => {
	return (
		<>{
			props.org?(<>
				<OrgDataPanel/>
				<OrgProgramsPanel orgId={props.orgId} />
				<OrgSurveysPanel orgId={props.orgId} />
			</>):(<>
				<UserDataPanel religion={props.accountData.account.religion} gender={props.accountData.account.gender} race={props.accountData.account.race} />
				<UserAnswersPanel {...props}/>
				<UserAccessPanel {...props}/>
			</>)
		}</>
	)
}
export default DataPanels;