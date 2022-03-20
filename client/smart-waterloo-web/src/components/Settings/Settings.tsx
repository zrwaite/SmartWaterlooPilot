
import Modal from "react-modal";
import {icons} from "../../images/icons";

interface settingsProps {
	open: boolean;
	closeModal: () => void;
}

const Settings = (props: settingsProps) => {
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
			<div className="settingsModal">
				<div className="settingsModalHeader">
					<img className="h4 imageButton" onClick={props.closeModal} src={icons.close} alt="close"></img>
				</div>
			</div>
		</Modal>
	)
}

export default Settings;