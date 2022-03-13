const defaultUser = {
	userid: "",
	password: "",
	events: [],
	surveys: []
}
const defaultUserData = {
	nickname: "",
	birth_day: "",
	birth_month: "",
	birth_year: "",
	gender: "",
	height: "",
	weight: "",
	religion: "",
	sexuality: "",
	race: "",
	grade: "",
	postal_code: "",
	avatar_string: ""
}
const userKeys = Object.keys(defaultUser) as (keyof typeof defaultUser)[];
const userDataKeys = Object.keys(defaultUserData) as (keyof typeof defaultUserData)[];
const userDataIVKeys = userDataKeys.map((key) => key + "_iv");
const userData = {
	userKeys: userKeys,
	dataKeys: userDataKeys,
	ivKeys: userDataIVKeys,
}
export {userData, defaultUserData}