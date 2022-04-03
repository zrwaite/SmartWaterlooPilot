import "./Sidebar.css"
import {topElements, bottomElements, orgElements} from "./SidebarOptions"; 
import {useNavigate} from "react-router-dom";
import {defaultOrg} from "../../data/orgs";
interface SidebarProps {
	page: string;
	accountDataSet:boolean;
	nickname: string;
	avatarString: string;
	openSettings: () => void;
	orgs: (typeof defaultOrg)[];
}
const Sidebar = (props:SidebarProps) => {
	const navigate = useNavigate()
	const selectedElement = {
		backgroundColor: "black",
		color: "white"
	}
	const allBottomElements = props.orgs.length?[...orgElements, ...bottomElements]:bottomElements;
	return (
		<aside className={"sidebarContainer"}>
			<div className="center sidebarAvatar">
				<img src={props.avatarString===""?"":`https://avatars.dicebear.com/api/bottts/${props.avatarString}.svg`} alt=""/>
				<h5>{props.nickname}</h5>
			</div>
			<div className="topSidebar">
				{topElements.map((elem,i) => {
					return (
						<div key={i} onClick={()=>navigate(elem.link)} className={"topSidebarElement"} style={elem.pageName===props.page?selectedElement:{}}>
							<h6>{elem.title}</h6>
							<img src={elem.icon} alt={elem.title}/>
						</div>
					)
				})}
			</div>
			<div className={"bottomSidebar"}>
				{allBottomElements.map((elem,i) => {
					let action = ()=>{};
					if (elem.modalName==="settings"){
						action = props.openSettings;
					}
					return (
						<div key={i} className={"bottomSidebarElement"} onClick={action} >
							<h6>{elem.title}</h6>
							<img src={elem.icon} alt={elem.title}/>
						</div>
					)
				})}
			</div>
		</aside>
	);
}

export default Sidebar;