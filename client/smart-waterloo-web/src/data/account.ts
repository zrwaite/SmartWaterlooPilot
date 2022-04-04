import {USE_WEB3} from "./dataConstants";
import {web2Login, web2AccountExists, web2IsSignedIn, web2logout} from "./web2/web2Account";

const isSignedIn = ():boolean => {
	return USE_WEB3?web3IsSignedIn():web2IsSignedIn()
}
const accountExists = async (userId: number):Promise<boolean> => {
	return USE_WEB3?(await web3AccountExists(userId)):(await web2AccountExists(userId));
}
const logout = () => {
	USE_WEB3?web3logout():web2logout();
}



const web3logout = () => {};
const web3IsSignedIn = (): boolean => {
	return false;
}
const web3AccountExists = async (userId: number):Promise<boolean> => {
	//return if user exists with that userId, so wether they sign in or sign up
 	return false;
}


export {logout, isSignedIn, accountExists, web2Login};