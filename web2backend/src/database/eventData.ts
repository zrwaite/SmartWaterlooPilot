const baseEvent = {
	org: "",
	name: "",
	min_age: "",
	max_age: "",
	start_date: "",
	end_date: "",
	place: "",
	category: "",
	description: "",
	image: ""
}
const nullableEvent = {
	linked_survey_id: ""
}
const postEvent = {
	...baseEvent,
	...nullableEvent
}
const getEventParams = {
	id: "",
	attendees: "",
	user_info: []
}
const defaultEvent = {
	...postEvent,
	...getEventParams,
}

const eventData = {
	nullableEventKeys: Object.keys(nullableEvent) as (keyof typeof nullableEvent)[],
	baseEventKeys: Object.keys(baseEvent) as (keyof typeof baseEvent)[],
	postEventKeys: Object.keys(postEvent) as (keyof typeof postEvent)[],
	allEventKeys: Object.keys(defaultEvent) as (keyof typeof defaultEvent)[]
}
export {postEvent, eventData, defaultEvent}