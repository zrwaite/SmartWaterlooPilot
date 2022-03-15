const defaultOrg = {
	userid: "",
	password: "",
}
const defaultOrgData = {
	nickname: "",
	business_number: "",
	avatar_string: "",
}
const orgData = {
	orgKeys: Object.keys(defaultOrg) as (keyof typeof defaultOrg)[],
	dataKeys: Object.keys(defaultOrgData) as (keyof typeof defaultOrgData)[],
}
export {orgData, defaultOrgData}