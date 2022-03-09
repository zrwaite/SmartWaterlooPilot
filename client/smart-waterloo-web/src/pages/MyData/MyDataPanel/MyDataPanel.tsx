import { useNavigate } from "react-router-dom";
import "./MyDataPanel.css";

interface MyDataPanelProps {
	title: string;
    learnMore: string;
    component: () => JSX.Element;
	index: Number
}


const MyDataPanel = (props: MyDataPanelProps) => {
	const navigate = useNavigate();
	return (
		<div onClick={() => navigate("/data")}className={`myDataPanel`}>
			<h5>{props.title}</h5>
			<props.component/>
			<p>Learn more</p>
		</div>
	)
}	

export default MyDataPanel;