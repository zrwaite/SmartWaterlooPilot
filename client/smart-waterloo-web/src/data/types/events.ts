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

interface postEventType {
	name:string, age:string, 
	start_day:string, start_month:string, start_year:string,
	end_day:string, end_month:string, end_year:string,
	category:string, description: string
}

type postEventReturn = {success:boolean, errors: string[], eventId:string}

export { defaultEvent, defaultEventsState}
export type {postEventType, postEventReturn}