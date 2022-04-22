import { userInfo } from "./account";

interface defaultProgramType {
	id: string,
	name: string,
	org: string,
	age_group: string,
	start_date: string,
	end_date: string,
	category: string,
	signed_up: boolean,
	description: string,
	image: string,
	attendees: string,
	user_info: userInfo[]
}
const defaultProgram:defaultProgramType = {
	id: "",
	name: "",
	org: "",
	age_group: "",
	start_date: "",
	end_date: "",
	category: "",
	signed_up: false,
	description: "",
	image: "",
	attendees: "",
	user_info: []
}

const defaultProgramsState: {
	set: boolean;
	programs: defaultProgramType[]
} = {set: false, programs:[]};

interface postProgramType {
	name:string, age:string, 
	start_day:string, start_month:string, start_year:string,
	end_day:string, end_month:string, end_year:string,
	category:string, description: string
}

type postProgramReturn = {success:boolean, errors: string[], programId:string}

export { defaultProgram, defaultProgramsState}
export type {postProgramType, postProgramReturn}