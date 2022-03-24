const defaultPostOrg = {
	nickname: "",
	business_number: "",
	avatar_string: "",
	owner_id: "",
	verified: ""
}
const defaultOrg = {
	...defaultPostOrg,
	nickname: ""
}
const orgData = {
	orgKeys: Object.keys(defaultOrg) as (keyof typeof defaultOrg)[],
	postKeys: Object.keys(defaultPostOrg) as (keyof typeof defaultPostOrg)[],
}
export {orgData, defaultOrg}