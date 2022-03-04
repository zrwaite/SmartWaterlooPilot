import "./Navbar.css";
// import{Link} from "react-router-dom";
import {icons} from "../../images/icons";
import React from "react";
import Modal from "react-modal";
import {primaryNavItems} from "./navItems";
import BackNav from "./BackNav";
import {Link} from "react-router-dom";
import {MobileContext} from "../../App";

type NavbarProps = {
	root:boolean;
};
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
	constructor(props:NavbarProps) {
		super(props);
		this.state = {
			open: false
		}
		Modal.setAppElement("#root");
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
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
							<div className="grey circle h6"></div>
							<h6>Name of the Project</h6>
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
								{
									primaryNavItems.map((item,i) => 
										<Link key={i} to={item.link} className={"removeLinkStyles"}>
											{i?<hr></hr>:null}
											<div className="navModalItem">
												<h6>{item.title}</h6>
												<img className="h5" src={icons.rightArrow} alt="arrow"></img>
											</div>
										</Link>
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
}

export default Navbar;
