import {icons } from "../../images/icons";

const topElements = [
	{
		pageName: "dashboard",
		title: "Dashboard",
		link: "/dashboard",
		icon: icons.rightArrow
	},
	{
		pageName: "data",
		title: "My Data",
		link: "/data",
		icon: icons.rightArrow

	},
	{
		pageName: "events",
		title: "Events",
		link: "/events",
		icon: icons.rightArrow

	},
	{
		pageName: "surveys",
		title: "Surveys",
		link: "/surveys",
		icon: icons.rightArrow

	}
]

const bottomElements = [
	{
		modalName: "settings",
		title: "Settings",
		action:() => {},
		icon: icons.settings
	},
	{
		modalName: "logout",
		title: "Logout",
		action: () => {},
		icon: icons.logout
	}
]

export {topElements, bottomElements}