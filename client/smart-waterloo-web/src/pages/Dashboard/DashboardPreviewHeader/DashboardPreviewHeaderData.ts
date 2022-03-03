import ticketImg from "../../../images/ticket.png";
import dataImg from "../../../images/data.png";
import clipboardImg from "../../../images/clipboard.png";
import calenderImg from "../../../images/calender.png";

const DashboardPreviewHeaderData =  {
	upcoming: {
		title: "Upcoming Events",
		short: "Events you are going to",
		long: "See the events that are coming up for you.",
		icon: calenderImg
	},
	events: {
		title: "Events",
		short: "See events list",
		long: "See all the events that are available to you.",
		icon: ticketImg
	},
	data: {
		title: "My Data", 
		short: "See my data log",
		long: "See the most relevant information about your data.",
		icon: dataImg
	},
	surveys: {
		title: "Surveys",
		short: "See surveys list.",
		long: "See all the surveys that are published by your city.",
		icon: clipboardImg
	}
}
export default DashboardPreviewHeaderData;