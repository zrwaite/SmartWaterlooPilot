import { USE_WEB3 } from "./dataConstants";
import { addMemberReturn } from "./types/orgs";
import { web2AddUserToOrg } from "./web2/web2AddData";

const addUserToOrg = async (userId: number, orgId: number):Promise<addMemberReturn> => {
	return USE_WEB3?(await web3AddUserToOrg(userId, orgId)):(await web2AddUserToOrg(userId, orgId));
}

const web3AddUserToOrg = async (userId: number, orgId: number):Promise<addMemberReturn> => {
	return {success: false, errors: ["not implemented"]}
}

export {addUserToOrg}