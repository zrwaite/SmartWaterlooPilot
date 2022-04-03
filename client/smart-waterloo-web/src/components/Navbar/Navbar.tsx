import "./Navbar.css";
// import{Link} from "react-router-dom";
import {icons} from "../../images/icons";
import React from "react";
import Modal from "react-modal";
import {primaryNavItems} from "./navItems";
import {topElements as primarySidebarItems} from "../Sidebar/SidebarOptions";
import BackNav from "./BackNav";
import {Link} from "react-router-dom";
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
}
type NavbarState = { open: boolean };
class Navbar extends React.Component<NavbarProps, NavbarState> {
	customStyles = {
		content: {
			width: '80%',
			maxWidth: '30rem',
			left: "50%",
			bottom: "auto",
			transform: "translateX(-50%)",
		},
	};
	allNavItems = primaryNavItems
	constructor(props:NavbarProps) {
		super(props);
		this.state = {
			open: false
		}
		Modal.setAppElement("#root");
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		if (this.props.root && this.props.signedIn) {
			this.allNavItems = [...primaryNavItems, ...primarySidebarItems];
		}

	}

	openModal() {
		this.setState({...this.state, open:true});
	}

	closeModal() {
		this.setState({...this.state, open:false});
	}
	render() {
		if (this.props.root)
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
								<img className="h3 imageButton" onClick={this.openModal} src={icons.menu} alt="menu" />
								:
								primaryNavItems.map((item,i) => 
								<Link key={i} to={item.link} className={"removeLinkStyles"}>
									{item.title}
								</Link> 
								)
							}
						</div>
						<Modal isOpen={this.state.open} onRequestClose={this.closeModal} style={this.customStyles} contentLabel="Example Modal">
							<div className="navModal">
								<div className="navModalHeader">
									<img className="h4 imageButton" onClick={this.closeModal} src={icons.close} alt="close"></img>
								</div>
								{primaryNavItems.map((item,i) => 
									<MobileNavItem {...item} i={i} key={i}/>
								)}
								{
									(this.props.root && this.props.signedIn) && 
									primarySidebarItems.map((item,i) => 
										<MobileNavItem {...item} link={`${item.link}${this.props.org?`org/${this.props.orgId}`:"user"}`} i={1} key={i}/>
									)
									// 	this.allNavItems = [...primaryNavItems, ...primarySidebarItems];
									// 
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
}

export default Navbar;
