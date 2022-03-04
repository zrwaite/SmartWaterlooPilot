import "./MyDataPanel.css";
import { dataPanels } from "./MyDataPanels";
type MyDataPanelProps = typeof dataPanels[number];

const MyDataPanel = (props: MyDataPanelProps) => {
	return (
		<div className={`myDataPanel`}>
			<h5>{props.title}</h5>
			<props.component/>
			<p>Learn more</p>
		</div>
	)
}	

export default MyDataPanel;