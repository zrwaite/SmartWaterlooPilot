interface userInfo {
	birth_day: string,
	gender: string,
	religion: string,
	sexuality: string,
	race: string,
	grade: string,
	postal_code: string,
	household_income: string,
	household_composition: string,
	height: string,
	weight: string,
	primary_language: string,
	secondary_language: string,
	city: string
	heard: string,
	contact: string,
	age: string;
}

const getDefaultUserInfoLists = (): {
	religions: Map<string, number>,
	sexualities: Map<string, number>,
	genders: Map<string, number>,
	races: Map<string, number>,
	ages: Map<string, number>,
	cities: Map<string, number>,
	grades: Map<string, number>,
	heights: Map<string, number>,
	weights: Map<string, number>,
	household_compositions: Map<string, number>,
	household_incomes: Map<string, number>,
	primary_languages: Map<string, number>,
	secondary_languages: Map<string, number>,
} => {
	return{
		religions: new Map(),
		sexualities: new Map(),
		genders: new Map(),
		races: new Map(),
		ages: new Map(),
		cities: new Map(),
		grades: new Map(),
		heights: new Map(),
		weights: new Map(),
		household_compositions: new Map(),
		household_incomes: new Map(),
		primary_languages: new Map(),
		secondary_languages: new Map(),
	} as const;
}

interface defaultAccountType extends userInfo {
	nickname: string;
	avatar_string: string;
	answers: number[]
	surveys: number[];
	programs: number[];
	orgs: string[];	
}

const defaultAccount:defaultAccountType = {
	nickname: "--------",
	avatar_string: "",
	birth_day: "",
	gender: "",
	grade: "",
	postal_code: "",
	religion: "",
	sexuality: "",
	race: "",
	household_income: "",
	household_composition: "",
	primary_language: "",
	secondary_language: "",
	city: "",
	heard: "",
	contact: "",
	height: "",
	age: "",
	weight: "",
	answers: [],
	surveys: [],
	programs: [],
	orgs: [],
}
const defaultAccountState = {
	set: false,
	account: defaultAccount
}

interface postUserType {
	birth_day: string,
	gender:string, 
	height:string, 
	weight:string,
	qrId:string, 
	grade:string, 
	postalCode:string,
	race:string, 
	religion:string, 
	sexuality:string,
	nickname:string, 
	avatar_string:string, 
	password:string,
	household_income: string,
	household_composition: string,
	primary_language: string,
	secondary_language: string,
	heard: string,
	contact: string,
	city: string,
	contact_info: string
}
export {getDefaultUserInfoLists, defaultAccountState, defaultAccount}
export type { postUserType, userInfo, defaultAccountType }