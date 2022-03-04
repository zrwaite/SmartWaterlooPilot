import "./Sidebar.css"
import avatarImg from "../../images/avatar.png"
import {topElements, bottomElements} from "./SidebarOptions"; 
import {Link} from "react-router-dom";
interface SidebarProps {
	page: string;
}
const Sidebar = (props:SidebarProps) => {
	const selectedElement = {
		backgroundColor: "black",
		color: "white"
	}
	return (
		<aside className={"sidebarContainer"}>
			<div className="center sidebarAvatar">
				<img src={avatarImg} alt="avatarImage"/>
				<h5>Tyragreenex</h5>
			</div>
			<div className="topSidebar">
				{topElements.map((elem,i) => {
					return (
						<Link to={elem.link} key={i} className={"removeLinkStyles"} >
							<div className={"topSidebarElement"} style={elem.pageName===props.page?selectedElement:{}}>
								<h6>{elem.title}</h6>
								<img src={elem.icon} alt={elem.title}/>
							</div>
						</Link>
					)
				})}
			</div>
			<div className={"bottomSidebar"}>
				{bottomElements.map((elem,i) => {
					return (
						<div key={i} className={"bottomSidebarElement"} >
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