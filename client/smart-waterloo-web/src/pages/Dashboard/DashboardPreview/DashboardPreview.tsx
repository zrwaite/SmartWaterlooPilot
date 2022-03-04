import {useContext} from "react";
import { MobileContext } from "../../../App";
import arrowIcon from "../../../images/arrow.png";
import Data from "./DashboardPreviewData";
import "./DashboardPreviewHeader.css";
import eventsList from "../../Events/Events.json"
import surveysList from "../../Surveys/Surveys.json"
import { dataPanels } from "../../MyData/MyDataPanel/MyDataPanels";
import MyDataPanel from "../../MyData/MyDataPanel";
import EventPanel from "../../Events/EventPanel"
import SurveyPanel from "../../Surveys/SurveyPanel"
import { useNavigate } from "react-router-dom";
interface DashboardPreviewHeaderProps {
	name: keyof typeof Data;
	mobile: boolean
}
const DashboardPreviewHeader = (props:DashboardPreviewHeaderProps) => {
	const dataset = Data[props.name];
	return (
		<div className ={"previewHeaderContainer"}>
			<img className="dashboardLinkIcon" src={dataset.icon} alt={dataset.iconName}/>
			<div>
				<h5>{dataset.title}</h5>
				<hr/>
				<p>{props.mobile?dataset.short:dataset.long}</p>
			</div>
			<img className="dashboardLinkArrow" src={arrowIcon} alt="arrow"/>
		</div>
	)
}

interface DashboardPreviewProps {
	name: keyof typeof Data;
}
const DashboardPreview = (props:DashboardPreviewProps) => {
	const navigate = useNavigate();
	const {mobile} = useContext(MobileContext);
	const color = Data[props.name].color;
	const linkTo = Data[props.name].link;
	if (mobile) return (
		<button onClick={()=> navigate(linkTo)}className={`dashboardLinkSection ${color}`}>
			<DashboardPreviewHeader mobile={true} name={props.name}/>
		</button>
	);
	let panelList;
	let numUpcoming = 0;
	switch (props.name) {
		case "events": panelList = (<> 
				{eventsList.map((event, i) => {return (
					i<5?<EventPanel key={i} {...event}/>:null
				);})}
			</>
		); break; case "data": panelList = (<>
				{dataPanels.map((panel, i) => {return (
					i<5?<MyDataPanel key={i} {...panel}/>:null
				);})}
			</>
		);break; case "surveys": panelList = (<>
			{surveysList.map((panel, i) => {return (
				i<5?<SurveyPanel key={i} {...panel}/>:null
			);})}
		</>
	); break; case "upcoming": panelList = (<>
				{eventsList.map((event, i) => {
					if (event.signed_up) return (
						numUpcoming<5?<EventPanel key={i} upcoming={true} {...event}/>:null
					);
					else return null;
				})}
			</>
		);
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