import { userInfo } from "./account"

interface defaultOrgType {
	nickname: string,
	business_number: string,
	avatar_string: string,
	owner_id: number,
	verified: number,
	id: number,
	members: number[],
	user_info: userInfo[]
}

const defaultOrg:defaultOrgType = {
	nickname: "",
	business_number: "",
	avatar_string: "",
	owner_id: 0,
	verified: 0,
	id: 0,
	members: [],
	user_info: []
}

const defaultOrgsState:{orgs: typeof defaultOrg[], set: boolean} = {
	orgs: [],
	set: false
}

interface defaultNameObject {
	id: number,
	nickname: string
}

const defaultOrgNamesState:{names:defaultNameObject[], set: boolean} = {
	names: [],
	set: false
}

interface postOrgType {
	avatar_string:string, 
	nickname: string, 
	businessNumber: string
}
type postOrgReturn = {success:boolean, errors: string[], orgId:string}

export {defaultOrg, defaultOrgsState, defaultOrgNamesState};
export type {postOrgType, postOrgReturn}