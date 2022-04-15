
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { defaultOrg } from "../../data/types/orgs";
import {icons} from "../../images/icons";
import "./OrgsModal.css";

interface orgsProps {
	open: boolean;
	closeModal: () => void;
	orgs: typeof defaultOrg[];
	org: false|string;
}

const OrgsModal = (props: orgsProps) => {
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
	return (
		<Modal isOpen={props.open} onRequestClose={props.closeModal} style={customStyles} contentLabel="Example Modal">
			<div className="orgsModal">
				<div className="orgsModalHeader">
					<h2>Orgs</h2>
					<img className="h4 imageButton" onClick={props.closeModal} src={icons.close} alt="close"></img>
				</div>
				<div>
					{
						props.orgs.map((org, i) => {
							return props.org!==org.id.toString()?(
								<div key={i} className={"orgPreview"}>
									<h3>"{org.nickname}" | ID:{org.id}</h3>
									<button className={"blackButton orgsModalButton"} onClick={() => {navigate(`/dashboard/org/${org.id}`); props.closeModal();}}>Open "{org.nickname}"</button>
								</div>
							):null;
						})
					}
				</div>
				{props.org&&(<>
					<hr/>
					<button className={"blackButton orgsModalButton"} onClick={() => {navigate(`/dashboard/user`); props.closeModal();}}>Open User Account</button>
				</>)}
				
			</div>
		</Modal>
	)
}

export default OrgsModal;