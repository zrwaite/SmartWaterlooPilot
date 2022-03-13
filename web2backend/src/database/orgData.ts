const defaultOrg = {
	userid: "",
	password: "",
	events: [],
	surveys: [],
}
const defaultOrgData = {
	nickname: "",
	business_number: "",
	avatar_string: "",
}
const orgDataPairs = [
	{iv: "nickname_iv", name: "nickname"},
	{iv: "business_number_iv", name: "business_number"},
	{iv: "avatar_string_iv", name: "avatar_string"},
]
const orgKeys = Object.keys(defaultOrg) as (keyof typeof defaultOrg)[];
const orgDataKeys = Object.keys(defaultOrgData) as (keyof typeof defaultOrgData)[];
const orgDataIVKeys = orgDataKeys.map((key) => key + "_iv");
const orgData = {
	orgKeys: orgKeys,
	dataKeys: orgDataKeys,
	ivKeys: orgDataIVKeys,
}
export {orgData, defaultOrgData, orgDataPairs}