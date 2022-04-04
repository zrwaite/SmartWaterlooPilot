import { addMemberReturn } from "../types/orgs"
import { httpReq } from "./httpRequest";

const web2AddUserToOrg = async (userId: number, orgId: number):Promise<addMemberReturn> => {
	let json = await httpReq("/api/org/", "PUT", {
		org_id: orgId,
		user_id: userId
	})
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			console.log(response.response);
			return {success: true, errors: []}
		} else {
			return {success: false, errors: response.errors}
		}
	} else return {success: false, errors: ["request failed"]};
}

export {web2AddUserToOrg}