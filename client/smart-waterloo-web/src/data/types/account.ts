const defaultAccount:{
	nickname: string;
	avatar_string: string;
	birth_day: string,
	birth_month: string,
	birth_year: string,
	gender: string,
	height: string,
	weight: string,
	grade: string,
	postal_code: string,
	religion: string,
	sexuality: string,
	race: string,
	answers: number[]
	surveys: number[];
	events: number[];
	orgs: string[];	
} = {
	nickname: "--------",
	avatar_string: "",
	birth_day: "",
	birth_month: "",
	birth_year: "",
	gender: "",
	height: "",
	weight: "",
	grade: "",
	postal_code: "",
	religion: "",
	sexuality: "",
	race: "",
	answers: [],
	surveys: [],
	events: [],
	orgs: [],
}
const defaultAccountState = {
	set: false,
	account: defaultAccount
}

interface postUserType {
	day:string, month:string, year:string,
	gender:string, height:string, weight:string,
	qrId:string, grade:string, postalCode:string,
	race:string, religion:string, sexuality:string,
	nickname:string, avatar_string:string, password:string
}
export {defaultAccountState, defaultAccount}
export type {postUserType}