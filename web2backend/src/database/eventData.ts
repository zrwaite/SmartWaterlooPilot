const postEvent = {
	org: "",
	name: "",
	age_group: "",
	start_date: "",
	end_date: "",
	category: "",
	description: "",
	image: "",
}
const nullableEventParams = {
	linked_survey_id: ""
}
const defaultEvent = {
	...postEvent,
	...nullableEventParams,
}

const eventData = {
	nullableEventKeys: Object.keys(nullableEventParams) as (keyof typeof nullableEventParams)[],
	postEventKeys: Object.keys(postEvent) as (keyof typeof postEvent)[],
	allEventKeys: Object.keys(defaultEvent) as (keyof typeof defaultEvent)[],
}
export {eventData, defaultEvent}