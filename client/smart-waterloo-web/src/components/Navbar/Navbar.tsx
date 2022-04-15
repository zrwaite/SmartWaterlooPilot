import "./Navbar.css";
// import{Link} from "react-router-dom";
import {icons} from "../../images/icons";
import React, { useState } from "react";
import Modal from "react-modal";
import {primaryNavItems} from "./navItems";
import {topElements, orgElements, bottomElements} from "../Sidebar/SidebarOptions";
import BackNav from "./BackNav";
import {Link, useNavigate} from "react-router-dom";
import {MobileContext} from "../../App";
import MobileNavItem from "./MobileNavItem";
import SWRLogo from "../../images/SWRLogo.png"
import { defaultOrg } from "../../data/types/orgs";


type NavbarProps = {
	root:false;
	org?: boolean;
	orgs?: typeof defaultOrg[];
	orgId?: string|undefined;
}|{
	root: true;
	org?: boolean;
	orgs?: typeof defaultOrg[];
	orgId?: string|undefined;
	signedIn: false;
}|{
	root: true;
	org: boolean;
	orgs: typeof defaultOrg[];
	orgId: string|undefined;
	signedIn: true;
	openSettings: () => void;
	openOrgsModal: ()=>void;
}
const NavbarState = { open: false };
const Navbar = (props:NavbarProps) => {
	let [state, setState] = useState(NavbarState);
	const navigate = useNavigate();
	const customStyles = {
		content: {
			width: '80%',
			maxWidth: '30rem',
			left: "50%",
			bottom: "auto",
			transform: "translateX(-50%)",
		},
	};
	// allNavItems = primaryNavItems
	Modal.setAppElement("#root");
	// if (props.root && props.signedIn) {
	// 	allNavItems = [...primaryNavItems, ...primarySidebarItems];
	// }

	const openModal = () => {
		setState({...state, open:true});
	}

	const closeModal = () => {
		setState({...state, open:false});
	}
	if (props.root)
	return (
		<MobileContext.Consumer>
			{({mobile}) => (
				<div className="navbar">
					<div className="leftNav">
						<img src={SWRLogo} alt={"SWR Logo"} className={"navbarLogo"}/>
						{/* <h4 onClick={() => setOrg(!org)}>{org?"Org":"User"}</h4> */}
					</div>
					<div className="rightNav">
						{mobile?
							<img className="h3 imageButton" onClick={openModal} src={icons.menu} alt="menu" />
							:
							primaryNavItems.map((item,i) => 
							<Link key={i} to={item.link} className={"removeLinkStyles"}>
								{item.title}
							</Link> 
							)
						}
					</div>
					<Modal isOpen={state.open} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
						<div className="navModal">
							<div className="navModalHeader">
								<img className="h4 imageButton" onClick={closeModal} src={icons.close} alt="close"></img>
							</div>
							{primaryNavItems.map((item,i) => {
								let onClick = () => navigate(item.link)
								return <MobileNavItem onClick={onClick} {...item} i={i} key={i}/>
							})}
							{
								(props.root && props.signedIn) && (
									topElements.map((item,i) =>{
										let onClick = () => navigate(`${item.link}${props.org?`org/${props.orgId}`:"user"}`)
										return <MobileNavItem onClick={onClick} {...item}  i={1} key={i}/>
									})
								)
							}
							{
								(props.root && props.signedIn && props.orgs.length) && (
									orgElements.map((item,i) =>{
										let onClick = () => { closeModal(); props.openOrgsModal();}
										return <MobileNavItem onClick={onClick} {...item}  i={1} key={i}/>
									})
								)
							}
							{
								(props.root && props.signedIn) && (
									bottomElements.map((item,i) =>{
										let onClick = () => { closeModal(); props.openSettings()};
										return <MobileNavItem onClick={onClick} {...item}  i={1} key={i}/>
									})
								)
							}
							
						</div>
					</Modal>
				</div>
			)}
		</MobileContext.Consumer>
	);
	else return (
		<div className="navbar">
			<BackNav />
		</div>	
	);

}

export default Navbar;
