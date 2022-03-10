import { useNavigate } from "react-router-dom";
import "./MyDataPanel.css";
import {MobileContext} from "../../../App";
import { useContext } from "react";

interface MyDataPanelProps {
	title: string;
    learnMore: string;
    component: () => JSX.Element;
	index: Number
}


const MyDataPanel = (props: MyDataPanelProps) => {
	const mobile = useContext(MobileContext);
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate("/shareddata")} className={`myDataPanel`}>
			<div className="myDataPanelHeader">
				<h5>{props.title}</h5>
				{mobile?null:<p>Learn more</p>}
			</div>
			<props.component/>
			{mobile?<p>Learn more</p>:null}
		</div>
	)
}	

export default MyDataPanel;