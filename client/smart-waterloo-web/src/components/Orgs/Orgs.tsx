
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import {icons} from "../../images/icons";
import "./Orgs.css";

interface orgsProps {
	open: boolean;
	closeModal: () => void;
}

const OrgsModal = (props: orgsProps) => {
	const navigate = useNavigate();
	const logout = () => {
		console.log("IMPLEMENT LOGOUT");
	}
	const customStyles = {
		content: {
			width: '80%',
			maxWidth: '30rem',
			left: "50%",
			bottom: "auto",
			transform: "translateX(-50%)",
		},
	};
	return (
		<Modal isOpen={props.open} onRequestClose={props.closeModal} style={customStyles} contentLabel="Example Modal">
			<div className="orgsModal">
				<div className="orgsModalHeader">
					<h2>Orgs</h2>
					<img className="h4 imageButton" onClick={props.closeModal} src={icons.close} alt="close"></img>
				</div>
				<div>
					<button className={"blackButton orgsButton"} onClick={logout}>Logout</button>
					<button className={"blackButton orgsButton"} onClick={() => navigate("/createorg")}>Create Organization</button>
				</div>
			</div>
		</Modal>
	)
}

export default OrgsModal;