import ticketImg from "../../../images/ticket.png";
import dataImg from "../../../images/data.png";
import clipboardImg from "../../../images/clipboard.png";
import calenderImg from "../../../images/calender.png";

const DashboardPreviewData =  {
	upcoming: {
		title: "Upcoming Events",
		short: "Events you are going to",
		long: "See the events that are coming up for you.",
		icon: calenderImg,
		iconName: "calendar",
		color: "pink"
	},
	events: {
		title: "Events",
		short: "See events list",
		long: "See all the events that are available to you.",
		icon: ticketImg,
		iconName: "ticket",
		color: "blue"
	},
	data: {
		title: "My Data", 
		short: "See my data log",
		long: "See the most relevant information about your data.",
		icon: dataImg,
		iconName: "data",
		color: "purple"
	},
	surveys: {
		title: "Surveys",
		short: "See surveys list.",
		long: "See all the surveys that are published by your city.",
		icon: clipboardImg,
		iconName: "clipboard",
		color: "green"
	}
}
export default DashboardPreviewData;