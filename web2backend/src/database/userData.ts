const defaultUser = {
	userid: "",
	password: "",
	events: [],
	surveys: []
}

const userDataPairs = [
	{iv: "nickname_iv", name: "nickname"},
	{iv: "birth_day_iv", name: "birth_day"},
	{iv: "birth_month_iv", name: "birth_month"},
	{iv: "birth_year_iv", name: "birth_year"},
	{iv: "gender_iv", name: "gender"},
	{iv: "height_iv", name: "height"},
	{iv: "weight_iv", name: "weight"},
	{iv: "religion_iv", name: "religion"},
	{iv: "sexuality_iv", name: "sexuality"},
	{iv: "race_iv", name: "race"},
	{iv: "grade_iv", name: "grade"},
	{iv: "postal_code_iv", name: "postal_code"},
	{iv: "avatar_string_iv", name: "avatar_string"},
]
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
const userDataIVKeys = userDataKeys.map((key) => key + "_iv");
const userData = {
	userKeys: userKeys,
	dataKeys: userDataKeys,
	ivKeys: userDataIVKeys,
}
export {userData, defaultUserData, userDataPairs}