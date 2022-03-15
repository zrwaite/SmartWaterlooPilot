const defaultUser = {
	userid: "",
	password: "",
}
const defaultUserData = {
	nickname:"",
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
	avatar_string: "",
}
const userKeys = Object.keys(defaultUser) as (keyof typeof defaultUser)[];
const userDataKeys = Object.keys(defaultUserData) as (keyof typeof defaultUserData)[];
const userData = {
	userKeys: userKeys,
	dataKeys: userDataKeys,
}
export {userData, defaultUserData}