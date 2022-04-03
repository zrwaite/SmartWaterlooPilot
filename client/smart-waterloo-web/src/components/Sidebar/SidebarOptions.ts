import {icons } from "../../images/icons";

const topElements = [
	{
		pageName: "dashboard",
		title: "Dashboard",
		link: "/dashboard/user",
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

const orgElements = [
	{
		modalName: "orgs",
		title: "Orgs",
		icon: icons.group
	},
]

const bottomElements = [
	{
		modalName: "settings",
		title: "Settings",
		icon: icons.settings
	}
]

export {topElements, orgElements, bottomElements}