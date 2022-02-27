import "./Navbar.css";
// import{Link} from "react-router-dom";
import {icons} from "../../images/icons";
import React from "react";
import Modal from "react-modal";
import {navItems} from "./navItems";
import {mobileWidth} from "../../constants";

type NavbarProps = { };
type NavbarState = { open: boolean, mobileView: boolean };
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
			open: false,
			mobileView: false
		}
	
		Modal.setAppElement("#root");
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.updatePredicate = this.updatePredicate.bind(this);
	}
	// let subtitle:HTMLElement|null;

	openModal() {
		this.setState({...this.state, open:true});
	}

	afterOpenModal() {
		// if (subtitle) subtitle.style.color = '#f00';
	}

	closeModal() {
		this.setState({...this.state, open:false});
	}

	componentDidMount() {
		this.updatePredicate();
		window.addEventListener("resize", this.updatePredicate);
	}
	
	componentWillUnmount() {
		window.removeEventListener("resize", this.updatePredicate);
	}
	
	updatePredicate() {
		this.setState({ ...this.state, mobileView: window.innerWidth < mobileWidth });
	}
	render() {
		return (
			<div className="navbar">
				<div className="leftNav">
					<div className="grey circle h6"></div>
					<h6>Name of the Project</h6>
				</div>
				<div className="rightNav">
					{this.state.mobileView?
						<img className="h3 imageButton" onClick={this.openModal} src={icons.menu} alt="menu" />
						:
						navItems.map((item,i) => <div key={i}>{item.title}</div>)
					}
				</div>
				<Modal isOpen={this.state.open} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={this.customStyles} contentLabel="Example Modal">
					<div className="navModal">
						<div className="navModalHeader">
							<img className="h4 imageButton" onClick={this.closeModal} src={icons.close} alt="close"></img>
						</div>
						{
							navItems.map((item,i) => 
								<div key={i}>
									{i?<hr></hr>:null}
									<div className="navModalItem">
										<h6>{item.title}</h6>
										<img className="h5" src={icons.rightArrow} alt="arrow"></img>
									</div>
								</div>
							)
						}
					</div>
				</Modal>
			</div>
		);
	}
}

export default Navbar;
