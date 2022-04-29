import { USE_WEB3, userContract } from "./dataConstants";
import {
  web2Login,
  web2AccountExists,
  web2IsSignedIn,
  web2logout,
} from "./web2/web2Account";
import Web3 from "web3";
import { forceNavigate } from "../modules/navigate";

const accountExists = async (userId: number):Promise<boolean> => {
	return await web2AccountExists(userId);
}
const logout = () => {
	web2logout();
	forceNavigate("/");
}


let web3 = new Web3(Web3.givenProvider);
declare var window: any;

const isSignedIn = (): boolean => {
  return web2IsSignedIn();
};
const metaMaskInstalled = ():boolean => {
    if (typeof window.ethereum !== 'undefined') {
      return true;
    } 
    else {
      return false;
    }
};
const hasWeb3Account = async (): Promise<boolean> => {
  const accounts = await web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];
  console.log(web3.eth.defaultAccount);
  const userData = await userContract.methods
    .getInfo(web3.eth.defaultAccount)
    .call();
  console.log(userData);
  if (parseInt(userData[0]) >= 0) {
    return true;
  } else {
    return false;
  }
};


export {hasWeb3Account, metaMaskInstalled, logout, isSignedIn, accountExists, web2Login};
