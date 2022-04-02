import {USE_WEB3} from "./dataConstants";
import Cookies from "universal-cookie";
import {httpReq} from "./web2/httpRequest";
const cookies = new Cookies();

const isSignedIn = ():boolean => {
	return USE_WEB3?web3IsSignedIn():web2IsSignedIn()
}

const web3IsSignedIn = (): boolean => {
	return false;
}

const web2IsSignedIn = ():boolean => {
	if (cookies.get("token") && cookies.get("userId")) return true;
	cookies.remove("token");
	cookies.remove("userId");
	return false;
}

const onCardScan = async (userId: string):Promise<boolean> => {
	return USE_WEB3?(await web3onCardScan(userId)):(await web2onCardScan(userId));
}
const web3onCardScan = async (userId: string):Promise<boolean> => {
	//return if user exists with that userId, so wether they sign in or sign up
 	return false;
}

const web2onCardScan = async (userId: string):Promise<boolean> => {
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

export {isSignedIn, onCardScan, web2Login};