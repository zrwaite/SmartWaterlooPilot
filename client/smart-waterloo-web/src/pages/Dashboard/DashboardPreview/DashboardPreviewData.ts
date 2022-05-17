import ticketImg from "../../../images/ticket.png";
import dataImg from "../../../images/data.png";
import clipboardImg from "../../../images/clipboard.png";
import calendarImg from "../../../images/calender.png";

const DashboardPreviewData =  {
	programs: {
		title: "Programs",
		short: "See programs list",
		long: "See all the programs that are available to you.",
		icon: ticketImg,
		iconName: "ticket",
		color: "blue",
		link: "/programs/"
	},
	data: {
		title: "My Data", 
		short: "See my data log",
		long: "See the most relevant information about your data.",
		icon: dataImg,
		iconName: "data",
		color: "purple",
		link: "/data/"
	},
	surveys: {
		title: "Surveys",
		short: "See surveys list.",
		long: "See all the surveys that are published by your city.",
		icon: clipboardImg,
		iconName: "clipboard",
		color: "green",
		link: "/surveys/"
	},
	upcoming: {
		title: "My Programs",
		short: "Your signed up programs",
		long: "See all the programs you have signed up for.",
		icon: calendarImg,
		iconName: "calendar",
		color: "pink",
		link: "/programs/"
	}
}
export default DashboardPreviewData;