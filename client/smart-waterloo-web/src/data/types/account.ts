interface userInfo {
	birth_day: string,
	gender: string,
	religion: string,
	sexuality: string,
	race: string,
	grade: string,
	postal_code: string,
}

const getDefaultUserInfoLists = (): {
	religions: Map<string, number>,
	sexualities: Map<string, number>,
	genders: Map<string, number>,
	races: Map<string, number>
	birthdays: Map<string, number>
} => {
	return{
		religions: new Map(),
		sexualities: new Map(),
		genders: new Map(),
		races: new Map(),
		birthdays: new Map()
	} as const;
}

interface defaultAccountType extends userInfo {
	nickname: string;
	avatar_string: string;
	birth_month: string,
	birth_year: string,
	answers: number[]
	surveys: number[];
	events: number[];
	orgs: string[];	
}

const defaultAccount:defaultAccountType = {
	nickname: "--------",
	avatar_string: "",
	birth_day: "",
	birth_month: "",
	birth_year: "",
	gender: "",
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
export {getDefaultUserInfoLists, defaultAccountState, defaultAccount}
export type {postUserType, userInfo}