const baseUser = {
	user_id: "",
	nickname:"",
	birth_day: "",
	birth_month: "",
	birth_year: "",
	gender: "",
	height: "",
	weight: "",
	grade: "",
	postal_code: "",
	avatar_string: "",
}
const nullableUser = {
	religion: "",
	sexuality: "",
	race: "",
}
const postUser = {
	...baseUser,
	...nullableUser
}
const getUser = {
	...postUser,
	answers: []
}
const userData = {
	baseKeys: Object.keys(baseUser) as (keyof typeof baseUser)[],
	nullableKeys: Object.keys(nullableUser) as (keyof typeof nullableUser)[],
	postKeys: Object.keys(postUser) as (keyof typeof postUser)[],
	getKeys: Object.keys(getUser) as (keyof typeof getUser)[],
}
export {userData, postUser}