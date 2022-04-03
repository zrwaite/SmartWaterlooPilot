const defaultEvent = {
	id: "",
	name: "",
	organization: "",
	age_range: "",
	start_date: "",
	end_date: "",
	category: "",
	signed_up: false,
	description: "",
	image: "",
}

const defaultEventsState: {
	set: boolean;
	events: typeof defaultEvent[]
} = {set: false, events:[]};

export { defaultEvent, defaultEventsState}