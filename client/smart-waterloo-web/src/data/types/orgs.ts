const defaultOrg = {
	nickname: "",
	business_number: "",
	avatar_string: "",
	owner_id: 0,
	verified: 0,
	id: 0
}

const defaultOrgsState:{orgs: typeof defaultOrg[], set: boolean} = {
	orgs: [],
	set: false
}

export {defaultOrg, defaultOrgsState};