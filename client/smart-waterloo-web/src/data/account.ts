import { USE_WEB3, userContract } from "./dataConstants";
import {
  web2Login,
  web2AccountExists,
  web2IsSignedIn,
  web2logout,
} from "./web2/web2Account";
import Web3 from "web3";

const isSignedIn = (): boolean => {
  return USE_WEB3 ? web3IsSignedIn() : web2IsSignedIn();
};
const accountExists = async (userId: number): Promise<boolean> => {
  return USE_WEB3
    ? await web3AccountExists(userId)
    : await web2AccountExists(userId);
};
const logout = () => {
  USE_WEB3 ? web3logout() : web2logout();
};

let web3 = new Web3(Web3.givenProvider);
declare var window: any;

const web3logout = () => {};
const web3IsSignedIn = (): boolean => {
  const accounts:any =  web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];
  console.log(web3.eth.defaultAccount);
  if(typeof window.ethereum !== 'undefined' && userContract.methods.getInfo(web3.eth.defaultAccount).call() !== null) {
    return true;
  }
  return false;
};
const web3AccountExists = async (userId: number): Promise<boolean> => {
  //return if user exists with that userId, so whether they sign in or sign up
  const userData = await userContract.methods
    .getUser(web3.eth.defaultAccount)
    .call();
  if (userData[0] == userId) {
    return true;
  } else {
    return false;
  }
};

export { logout, isSignedIn, accountExists, web2Login };
