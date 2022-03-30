const postOrg = {
	nickname: "",
	business_number: "",
	avatar_string: "",
	owner_id: "",
}
const nullableOrgParams = {
	verified: ""
}
const defaultOrg = {
	...postOrg,
	...nullableOrgParams,
	nickname: "",
	id: ""
}
const orgData = {
	orgKeys: Object.keys(defaultOrg) as (keyof typeof defaultOrg)[],
	postKeys: Object.keys(postOrg) as (keyof typeof postOrg)[],
	nullablePostKeys: Object.keys(nullableOrgParams) as (keyof typeof nullableOrgParams)[],
}
export {orgData, defaultOrg}