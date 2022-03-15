const defaultOrg = {
	userid: "",
	password: "",
}
const defaultOrgData = {
	nickname: "",
	business_number: "",
	avatar_string: "",
}
const orgKeys = Object.keys(defaultOrg) as (keyof typeof defaultOrg)[];
const orgDataKeys = Object.keys(defaultOrgData) as (keyof typeof defaultOrgData)[];
const orgData = {
	orgKeys: orgKeys,
	dataKeys: orgDataKeys,
}
export {orgData, defaultOrgData}