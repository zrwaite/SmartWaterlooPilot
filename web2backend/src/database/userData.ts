const defaultUser = {
	u_id: "",
	password: "",
	answers: []
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
const userData = {
	userKeys: Object.keys(defaultUser) as (keyof typeof defaultUser)[],
	dataKeys: Object.keys(defaultUserData) as (keyof typeof defaultUserData)[],
}
export {userData, defaultUserData}