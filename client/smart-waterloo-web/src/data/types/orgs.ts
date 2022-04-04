const defaultOrg = {
	nickname: "",
	business_number: "",
	avatar_string: "",
	owner_id: 0,
	verified: 0,
	id: 0,
	members: []
}

const defaultOrgsState:{orgs: typeof defaultOrg[], set: boolean} = {
	orgs: [],
	set: false
}

interface postOrgType {
	avatarString:string, 
	nickname: string, 
	businessNumber: string
}
type postOrgReturn = {success:boolean, errors: string[], orgId:string}

export {defaultOrg, defaultOrgsState};
export type {postOrgType, postOrgReturn}