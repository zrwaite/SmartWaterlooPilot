import { useNavigate } from "react-router-dom";
import "./DataPanel.css";
// import {MobileContext} from "../../../App";
// import { useContext } from "react";

interface MyDataPanelProps {
	religion: string,
	gender:string,
	race: string
}


const UserDataPanel = (props: MyDataPanelProps) => {
	// const mobile = useContext(MobileContext);
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate("/userdata")} className={`dataPanel`}>
			<div className="dataPanelInfo">
				<h5>Your Data</h5>
			</div>
			<div className="dataPanelPreview">
				<ul>
					<li>Religion: {props.religion}</li>
					<li>Gender: {props.gender}</li>
					<li>Race: {props.race}</li>
					<li>...</li>
				</ul>
			</div>
		</div>
	)
}	

export default UserDataPanel;
export type {MyDataPanelProps}