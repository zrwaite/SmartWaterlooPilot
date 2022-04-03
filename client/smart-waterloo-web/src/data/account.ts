import {USE_WEB3} from "./dataConstants";
import {web2Login, web2onCardScan, web2IsSignedIn, web2logout} from "./web2/web2Account";

const defaultAccountData = {
	accountDataSet: false,
	nickname: "--------",
	avatarString: ""
}

const isSignedIn = ():boolean => {
	return USE_WEB3?web3IsSignedIn():web2IsSignedIn()
}
const onCardScan = async (userId: string):Promise<boolean> => {
	return USE_WEB3?(await web3onCardScan(userId)):(await web2onCardScan(userId));
}
const logout = () => {
	USE_WEB3?web3logout():web2logout();
}





const web3logout = () => {};
const web3IsSignedIn = (): boolean => {
	return false;
}
const web3onCardScan = async (userId: string):Promise<boolean> => {
	//return if user exists with that userId, so wether they sign in or sign up
 	return false;
}


export {logout, isSignedIn, onCardScan, web2Login, defaultAccountData};