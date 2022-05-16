import { defaultAccountType } from "../types/account"

const parseAge = (user:defaultAccountType) => {
	user.age = Math.floor(((new Date()).getTime() - (new Date(user.birth_day)).getTime()) / (1000*60*60*24*365.25)).toString();
}

export {parseAge}