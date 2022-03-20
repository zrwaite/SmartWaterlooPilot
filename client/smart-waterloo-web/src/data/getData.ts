import { exampleUsers } from "./Users";
import { exampleEvents, defaultEventsData } from "./Events";
import userABI from "../pages/SignUp/utils/SmartUser.json";
import { AbiItem } from "web3-utils";
import Web3 from "web3";
import orgABI from "../pages/SignUp/utils/SmartOrganisation.json";
import eventABI from "../pages/SignUp/utils/OrganisationEvents.json";

let web3 = new Web3(Web3.givenProvider);
declare var window: any;

const getUserData = async () => {
  return await getWeb3UserData();
}

const getWeb3UserData = async () => {
  // let {org} = useContext(OrgContext);
  // await new Promise(resolve => setTimeout(resolve, 1000)); //Just an artificial delay for mock data
  try {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    web3.eth.defaultAccount = accounts[0];
  } catch (err: any) {
    console.log(err);
  }
  const userAddress = web3.eth.defaultAccount;
  let contractAddress;
  let contractABI;
  contractAddress = "0x584Bfa8354673eF5f9Ab17a3d041D8E2537b4dD8";
  contractABI = userABI;
  let org: boolean = false;
  const userContract = await new web3.eth.Contract(
    contractABI as AbiItem[],
    contractAddress
  );
  await userContract.methods
    .getInfo(userAddress)
    .call()
    .then(() => (org = false))
    .catch(() => (org = true));
  console.log(org);
  if (org === false) {
    const userData = await userContract.methods.getInfo(userAddress).call();

    if (userAddress === "") {
      alert("Invalid user!");
      return undefined;
    }
    return {
      userDataSet: true,
      // nickname: userData.avatarName,
      // avatarString: user.avatarString
      nickname: userData[9].substring(0,userData[9].length-8),
      avatarString: userData[9].substring(-8),
    };
  } else {
    const orgAddress = userAddress;
    contractAddress = "0x2656D9bB68FCB5F56Ebe8CC50C5a2D61c86cB6b0";
    contractABI = orgABI;
    console.log(orgAddress);
    const orgContract = await new web3.eth.Contract(
      contractABI as AbiItem[],
      contractAddress
    );
    console.log(orgContract);

    const userData = await orgContract.methods.getOrgInfo(orgAddress).call();
    if (orgAddress === "") {
      alert("Invalid user!");
      return undefined;
    }
    return {
      userDataSet: true,
      // nickname: userData.avatarName,
      // avatarString: user.avatarString
      nickname: userData[2],
      avatarString: userData.avatarName,
    };
  }
};
const getEventsData = async () => {
    return getWeb3EventsData();
}
const getWeb3EventsData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); //Just an artificial delay for mock data
  let newEvents: typeof defaultEventsData.events = [];
  let accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  web3.eth.defaultAccount = accounts[0];
  const contractABI = eventABI;
  const contractAddress = "0xdc8b9aE001e2730862F3F16d16Ed4cC1fec82996";

  const eventContract = await new web3.eth.Contract(
    contractABI as AbiItem[],
    contractAddress
  );
  console.log(eventContract);
  const eve = await eventContract.methods
    .getAllEvents()
    .call()
    .then(() => console.log("Things work"))
    .catch((err: any) => console.log(err));

  // console.log(eve);
  //EDIT TO NOT BE EXAMPLE EVENTS
  exampleEvents.forEach((event) => {
    newEvents.push({
      name: event.name,
      title: event.title,
      organization: event.organization,
      age_range: event.age_range,
      start_date: event.start_date,
      end_date: event.end_date,
      category: event.category,
      signed_up: event.signed_up,
      description: event.description,
      image: event.image,
    });
  });
  if (!newEvents) {
    alert("Events not found");
    return undefined;
  }
  return newEvents;
};

export { getUserData, getEventsData };
