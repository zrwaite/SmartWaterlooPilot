import { userInfo } from "./account";
import {Question} from "./surveys";

interface defaultProgramType {
	id: string,
	name: string,
	org: string,
	age_group: string,
	start_date: string,
	end_date: string,
	start_time: string,
	end_time: string,
	category: string,
	signedUp: boolean,
	description: string,
	min_age: string,
	max_age: string,
	location: string,
	image: string,
	questions: Question[],
	attendees: string,
	feedback_survey_id: number|null,
	user_info: userInfo[]
}
const defaultProgram:defaultProgramType = {
	id: "",
	name: "",
	org: "",
	age_group: "",
	start_date: "",
	end_date: "",
	start_time: "",
	end_time: "",
	min_age: "",
	max_age: "",
	location: "",
	category: "",
	signedUp: false,
	description: "",
	image: "",
	attendees: "",
	feedback_survey_id: null,
	questions: [],
	user_info: []
}

const defaultProgramsState: {
	set: boolean;
	programs: defaultProgramType[]
} = {set: false, programs:[]};

interface postProgramType {
	name:string, 
	min_age:string, 
	max_age:string, 
	start_date:string,
	end_date:string,
	start_time: string,
	end_time: string,
	location:string,
	category:string, 
	description: string
}

type postProgramReturn = {success:boolean, errors: string[], programId:string}

export { defaultProgram, defaultProgramsState}
export type {postProgramType, postProgramReturn, defaultProgramType}