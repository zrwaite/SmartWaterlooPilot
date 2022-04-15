import { userInfo } from "./account";

interface defaultEventType {
	id: string,
	name: string,
	org: string,
	age_range: string,
	start_date: string,
	end_date: string,
	category: string,
	signed_up: boolean,
	description: string,
	image: string,
	attendees: string,
	user_info: userInfo[]
}
const defaultEvent:defaultEventType = {
	id: "",
	name: "",
	org: "",
	age_range: "",
	start_date: "",
	end_date: "",
	category: "",
	signed_up: false,
	description: "",
	image: "",
	attendees: "",
	user_info: []
}

const defaultEventsState: {
	set: boolean;
	events: defaultEventType[]
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