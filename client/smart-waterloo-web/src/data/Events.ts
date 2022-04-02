type defaultEventsDataType = {
	eventsDataSet: boolean;
	events: {
		id: string;
		name: string;
		organization: string;
		age_range: string;
		start_date: string;
		end_date: string;
		category: string;
		signed_up: boolean;
		description: string;
		image: string;
	}[]
}
const defaultEventsData: defaultEventsDataType = {eventsDataSet: false, events:[]};
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

export { defaultEvent, defaultEventsData}