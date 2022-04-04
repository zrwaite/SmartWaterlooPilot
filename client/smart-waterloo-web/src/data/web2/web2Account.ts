import cookies from "../../modules/cookies";
import {httpReq} from "./httpRequest";

const web2logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const web2IsSignedIn = ():boolean => {
	if (cookies.get("token") && cookies.get("userId")) return true;
	web2logout();
	return false;
}

const web2AccountExists = async (userId: number):Promise<boolean> => {
	let json = await httpReq("/api/user/?user_id=" + userId, "GET")
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			return true;
		} else if (response.status === 404) {
			return false;
		} else {
			console.error(response.errors);
		}
		//else if (response.errors.length > 0)
		return false;
	} else return false;
}

const web2Login = async (id:string, password:string):Promise<any[]> => {
	let json = await httpReq("/auth/signin/", "POST", {
		user_id: id,
		password: password
	})
	if (json) {
		let response = JSON.parse(json);
		if (response.success) {
			cookies.set("token", response.response.token);
			cookies.set("userId", id);
		} else {
			return response.errors;
		}
		//else if (response.errors.length > 0)
		return [];
	} else return ["request failed"];
}

export {web2logout, web2Login, web2AccountExists, web2IsSignedIn}