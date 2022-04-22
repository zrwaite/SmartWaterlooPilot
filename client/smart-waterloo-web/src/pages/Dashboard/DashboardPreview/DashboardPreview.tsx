import {useContext} from "react";
import { MobileContext } from "../../../App";
import arrowIcon from "../../../images/arrow.png";
import Data from "./DashboardPreviewData";
import "./DashboardPreviewHeader.css";
import { defaultProgram } from "../../../data/types/programs";
import {defaultSurvey} from "../../../data/types/surveys"
import { userDataPanels, orgDataPanels } from "../../MyData/MyDataPanel/MyDataPanels";
import MyDataPanel from "../../MyData/MyDataPanel";
import ProgramPanel from "../../Programs/ProgramPanel"
import SurveyPanel from "../../Surveys/SurveyPanel"
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { defaultAccount } from "../../../data/types/account";
import DataPanels from "../../MyData/DataPanels/DataPanels";

interface DashboardPreviewHeaderProps {
	name: keyof typeof Data;
	mobile: boolean
}
const DashboardPreviewHeader = (props:DashboardPreviewHeaderProps) => {
	const {mobile} = useContext(MobileContext);
	const dataset = Data[props.name];
	return (
		<div className ={"previewHeaderContainer"}>
			<img className="dashboardLinkIcon" src={dataset.icon} alt={dataset.iconName}/>
			<div className={"previewHeaderText"}>
				<h5>{dataset.title}</h5>
				<hr/>
				<p>{props.mobile?dataset.short:dataset.long}</p>
			</div>
			{mobile?<img className="dashboardLinkArrow" src={arrowIcon} alt="arrow"/>:null}
		</div>
	)
}

interface DashboardPreviewProps {
	name: keyof typeof Data;
	programs: typeof defaultProgram[];
	programsSet: boolean;
	surveys: typeof defaultSurvey[];
	surveysSet: boolean;
	account: typeof defaultAccount;
	org: boolean;
	orgId: string|undefined;
	verified: boolean;
}
const DashboardPreview = (props:DashboardPreviewProps) => {
	const navigate = useNavigate();
	const {mobile} = useContext(MobileContext);
	const color = Data[props.name].color;
	const linkTo = `${Data[props.name].link}${props.org?`org/${props.orgId}`:"user"}`;
	const dataPanelsData = props.org?orgDataPanels:userDataPanels;
	if (mobile) return (
		<button onClick={()=> navigate(linkTo)}className={`dashboardLinkSection ${color}`}>
			<DashboardPreviewHeader mobile={true} name={props.name}/>
		</button>
	);
	let panelList;
	switch (props.name) {
		case "programs": panelList = (<> 
			{
				props.programsSet?
				props.programs.map((program, i) => {return (
					i<5?<ProgramPanel isOrg={props.org} orgId={props.orgId} key={i} index={i} {...program}/>:null
				);}):
				[1,2,3,4,5].map((_, i) => {return <div key={i} className={"center"}> <ClipLoader color={"black"} loading={true} css={""} size={100} /> </div>})
			}
			{props.org && props.verified?<div className={"dashboardPreviewAddSection"}>
				<button onClick={() => navigate(`/createprogram/${props.orgId}`)} className={"blackButton dashboardPreviewAddButton"}>Add Program</button>
			</div>:null}
		</>
		); break; case "data": panelList = (<DataPanels {...props.account} orgId={props.orgId} org={props.org} />
		);break; case "surveys": 
			panelList = (<>
			{
				props.surveysSet?
				props.surveys.map((survey, i) => {
					const surveyCompleted = props.account.surveys.includes(parseInt(survey.id));
					return (
					i<5?<SurveyPanel completed={surveyCompleted} numQuestions={survey.questions.length} orgId={props.orgId} isOrg={props.org} key={i} index={i} {...survey}/>:null
				);}):
				[1,2,3,4,5].map((_, i) => {return <div key={i} className={"center"}> <ClipLoader color={"black"} loading={true} css={""} size={100} /> </div>})
			} 
			{props.org && props.verified?<div className={"dashboardPreviewAddSection"}>
				<button onClick={() => navigate(`/createsurvey/${props.orgId}`)} className={"blackButton dashboardPreviewAddButton"}>Add Survey</button>
			</div>:null}
		</>
		); break; 
		// case "upcoming": panelList = (<>
		// 	{examplePrograms.map((program, i) => {
		// 		if (program.signed_up) return (
		// 			numUpcoming<5?<ProgramPanel index={i} key={i} upcoming={true} {...program}/>:null
		// 		);
		// 		else return null;
		// 	})}
		// </>
		// );
	}
	return (
		<div className={"panel"}>
			<DashboardPreviewHeader mobile={false} name={props.name}/>
			<div className="subPanelFlex">
				{panelList}
			</div>
		</div>
	)
}

export default DashboardPreview;