import {icons } from "../../images/icons";

const topElements = [
	{
		pageName: "dashboard",
		title: "Dashboard",
		link: "/dashboard/",
		icon: icons.rightArrow
	},
	{
		pageName: "data",
		title: "My Data",
		link: "/data/",
		icon: icons.rightArrow

	},
	{
		pageName: "programs",
		title: "Programs",
		link: "/programs/",
		icon: icons.rightArrow

	},
	{
		pageName: "surveys",
		title: "Surveys",
		link: "/surveys/",
		icon: icons.rightArrow

	}
]

const orgElements = [
	{
		modalName: "orgs",
		title: "Accounts",
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