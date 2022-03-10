import UserBarGraph from "./Graphs/UserBarGraph"
import UserPiGraph from "./Graphs/UserPiGraph"
import UserTimeGraph from "./Graphs/UserTimeGraph"
import OrgBarGraph from "./Graphs/OrgBarGraph"
import OrgBubbleGraph from "./Graphs/OrgBubbleGraph"
import OrgPiGraph from "./Graphs/OrgPiGraph"

const userDataPanels = [
	{
		title: "What is being shared?",
		learnMore: "/sharedData",
		component: UserBarGraph,
		description: "Any other details that are related to this section. Any other details that are related to this section. Any other details that are related to this sect..."
	},
	{
		title: "See who had access",
		learnMore: "/accessedData",
		component: UserTimeGraph,
		description: "Any other details that are related to this section. Any other details that are related to this section. Any other details that are related to this sect..."
	},
	{
		title: "Event Participation",
		learnMore: "/eventData",
		component: UserPiGraph,
		description: "Any other details that are related to this section. Any other details that are related to this section. Any other details that are related to this sect..."
	},
]
const orgDataPanels = [
	{
		title: "Demographics",
		learnMore: "/demographicsData",
		component: OrgPiGraph,
		description: "Any other details that are related to this section. Any other details that are related to this section. Any other details that are related to this sect..."
	},
	{
		title: "Participation",
		learnMore: "/participationData",
		component: OrgBubbleGraph,
		description: "Any other details that are related to this section. Any other details that are related to this section. Any other details that are related to this sect..."
	},
	{
		title: "Engagement",
		learnMore: "/engagementData",
		component: OrgBarGraph,
		description: "Any other details that are related to this section. Any other details that are related to this section. Any other details that are related to this sect..."
	},
]

export {userDataPanels, orgDataPanels}