import BarGraph from "./Graphs/BarGraph"
import PiGraph from "./Graphs/PiGraph"
import TimeGraph from "./Graphs/TimeGraph"

const dataPanels = [
	{
		title: "What is being shared?",
		learnMore: "/sharedData",
		component: BarGraph
	},
	{
		title: "See who had access",
		learnMore: "/accessedData",
		component: TimeGraph
	},
	{
		title: "Event Participation",
		learnMore: "/eventData",
		component: PiGraph
	},
]

export {dataPanels}