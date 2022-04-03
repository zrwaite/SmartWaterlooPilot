const baseOrg = {
	nickname: "",
	business_number: "",
	avatar_string: "",
	owner_id: "",
}
const nullableOrgParams = {
	verified: ""
}
const postOrg = {
	...baseOrg,
	...nullableOrgParams
}
const getOrgParams = {
	nickname: "",
	id: "",
	members: []
}
const defaultOrg = {
	...postOrg,
	...getOrgParams
}
const orgData = {
	orgKeys: Object.keys(defaultOrg) as (keyof typeof defaultOrg)[],
	postKeys: Object.keys(postOrg) as (keyof typeof postOrg)[],
	nullablePostKeys: Object.keys(nullableOrgParams) as (keyof typeof nullableOrgParams)[],
	baseKeys: Object.keys(baseOrg) as (keyof typeof baseOrg)[],
}
export {orgData, defaultOrg, postOrg}