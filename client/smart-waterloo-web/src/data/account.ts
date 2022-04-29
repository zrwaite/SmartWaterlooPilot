import { USE_WEB3, userContract } from "./dataConstants";
import {
  web2Login,
  web2AccountExists,
  web2IsSignedIn,
  web2logout,
} from "./web2/web2Account";
import Web3 from "web3";
import { forceNavigate } from "../modules/navigate";
import {web2Login, web2AccountExists, web2IsSignedIn, web2logout} from "./web2/web2Account";

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

let web3 = new Web3(Web3.givenProvider);
declare var window: any;

const isSignedIn = async (): Promise<boolean> => {
  return USE_WEB3 ? metamaskConnected() : web2IsSignedIn();
};
const metamaskConnected = async (): Promise<boolean> => {
  if (typeof window.ethereum !== "undefined") {
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
    console.log(web3.eth.defaultAccount);
    const userData = await userContract.methods
      .getInfo(web3.eth.defaultAccount)
      .call();
    console.log(userData);
    if (!userData) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};
const web3AccountExists = async (userId: number): Promise<boolean> => {
  //return if user exists with that userId, so whether they sign in or sign up\const accounts = await web3.eth.getAccounts();
  const accounts = await web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];
  console.log(web3.eth.defaultAccount);
  const userData = await userContract.methods
    .getInfo(web3.eth.defaultAccount)
    .call();
  console.log(userData);
  if (!userData) {
    return true;
  } else {
    return false;
  }
};

const web3IsSignedIn = (): boolean => {
	return false;
}


export {hasWeb3Account, metaMaskInstalled, logout, isSignedIn, accountExists, web2Login};
