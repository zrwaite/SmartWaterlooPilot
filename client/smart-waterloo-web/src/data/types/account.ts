const defaultAccount = {
	nickname: "--------",
	avatarString: ""
}
const defaultAccountState = {
	set: false,
	account: defaultAccount
}

interface postUserType {
	day:string, month:string, year:string,
	gender:string, height:string, weight:string,
	qrId:string, grade:string, postalCode:string,
	race:string, religion:string, sexuality:string,
	nickname:string, avatarString:string, password:string
}
export {defaultAccountState, defaultAccount}
export type {postUserType}