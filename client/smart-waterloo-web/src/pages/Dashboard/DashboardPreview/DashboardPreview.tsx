import {useContext} from "react";
import { MobileContext } from "../../../App";
import arrowIcon from "../../../images/arrow.png";
import Data from "./DashboardPreviewData";
import "./DashboardPreviewHeader.css";
import { defaultEvent } from "../../../data/types/events";
import {defaultSurvey} from "../../../data/types/surveys"
import { userDataPanels, orgDataPanels } from "../../MyData/MyDataPanel/MyDataPanels";
import MyDataPanel from "../../MyData/MyDataPanel";
import EventPanel from "../../Events/EventPanel"
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
	events: typeof defaultEvent[];
	eventsSet: boolean;
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
		case "events": panelList = (<> 
			{
				props.eventsSet?
				props.events.map((event, i) => {return (
					i<5?<EventPanel isOrg={props.org} orgId={props.orgId} key={i} index={i} {...event}/>:null
				);}):
				[1,2,3,4,5].map((_, i) => {return <div key={i} className={"center"}> <ClipLoader color={"black"} loading={true} css={""} size={100} /> </div>})
			}
			{props.org && props.verified?<div className={"dashboardPreviewAddSection"}>
				<button onClick={() => navigate(`/createevent/${props.orgId}`)} className={"blackButton dashboardPreviewAddButton"}>Add Event</button>
			</div>:null}
		</>
		); break; case "data": panelList = (<DataPanels orgId={props.orgId} org={props.org} />
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
		// 	{exampleEvents.map((event, i) => {
		// 		if (event.signed_up) return (
		// 			numUpcoming<5?<EventPanel index={i} key={i} upcoming={true} {...event}/>:null
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