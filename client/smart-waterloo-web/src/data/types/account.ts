const defaultAccount:{
	nickname: string;
	avatar_string: string;
	surveys: number[];
	events: number[];
	orgs: string[];	
} = {
	nickname: "--------",
	avatar_string: "",
	surveys: [],
	events: [],
	orgs: []
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