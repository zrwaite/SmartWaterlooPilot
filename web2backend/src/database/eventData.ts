const defaultEvent = {
	name: "",
	age_group: "",
	start_date: "",
	end_date: "",
	category: "",
	description: "",
	owner: "",
	image: ""
}
const eventData = {
	eventKeys: Object.keys(defaultEvent) as (keyof typeof defaultEvent)[],
}
export {eventData, defaultEvent}