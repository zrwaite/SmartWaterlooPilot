import { forceNavigate } from "../modules/navigate";
import {USE_WEB3} from "./dataConstants";
import {web2Login, web2AccountExists, web2IsSignedIn, web2logout} from "./web2/web2Account";

const isSignedIn = ():boolean => {
	return USE_WEB3?web3IsSignedIn():web2IsSignedIn()
}
const accountExists = async (userId: number):Promise<boolean> => {
	return await web2AccountExists(userId);
}
const logout = () => {
	USE_WEB3?web3logout():web2logout();
	forceNavigate("/");
}

const metaMaskInstalled = ():boolean => {
	return false;
}

const hasWeb3Account = ():boolean => {
	return false;
}



const web3logout = () => {};
const web3IsSignedIn = (): boolean => {
	return false;
}


export {hasWeb3Account, metaMaskInstalled, logout, isSignedIn, accountExists, web2Login};