const baseUser = {
	user_id: "",
	nickname:"",
	avatar_string: "",
}
const baseUserInfo = {
	birth_day: "",
	gender: "",
	grade: "",
	postal_code: "",
	household_income: "",
	num_family_members: "",
	height: "",
	weight: "",
	medical_concerns: "",
	medication: "",
	disability: "",
	behavioural_support: "",
	school_system_support: "",
}
const nullableUserInfo = {
	religion: "",
	sexuality: "",
	race: "",
	primary_language: "",
	secondary_language: "",
}
const postUserInfo = {
	...baseUserInfo,
	...nullableUserInfo
}
const getUserInfo = {
	...postUserInfo,
}
const postUser = {
	...baseUser,
}
const getUser = {
	...postUser,
	user_info_id: "",
	answers: [],
	events: [],
	surveys: [],
	orgs: []
}
const userData = {
	baseKeys: Object.keys(baseUser) as (keyof typeof baseUser)[],
	postKeys: Object.keys(postUser) as (keyof typeof postUser)[],
	getKeys: Object.keys(getUser) as (keyof typeof getUser)[],
}
const userInfoData = {
	baseKeys: Object.keys(baseUserInfo) as (keyof typeof baseUserInfo)[],
	postKeys: Object.keys(postUserInfo) as (keyof typeof postUserInfo)[],
	nullableKeys:Object.keys(nullableUserInfo) as (keyof typeof postUserInfo)[],
	getKeys: Object.keys(getUserInfo) as (keyof typeof getUserInfo)[]
}
export {userData, postUser,userInfoData, postUserInfo}