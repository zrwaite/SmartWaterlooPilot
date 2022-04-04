import { useNavigate } from "react-router-dom";
import "./DataPanel.css";
// import {MobileContext} from "../../../App";
// import { useContext } from "react";

interface MyDataPanelProps {
}


const UserDataPanel = (props: MyDataPanelProps) => {
	// const mobile = useContext(MobileContext);
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate("/userdata")} className={`dataPanel`}>
			<div className="dataPanelInfo">
				<h5>User Data</h5>
				<p>Your data from the signup process</p>
			</div>
			<div className="dataPanelPreview">
				<ul>
					<li>Age</li>
					<li>Gender</li>
					<li>Race</li>
					<li>...</li>
				</ul>
			</div>
		</div>
	)
}	

export default UserDataPanel;