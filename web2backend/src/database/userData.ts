const defaultUnencryptedUserKeys = {
	userid: "",
	password: ""
}
const defaultEncryptedUserData = {
	nickname: "",
	birth_day: "",
	birth_month: "",
	birth_year: "",
	gender: "",
	height: "",
	weight: "",
	religion: "",
	sexuality: "",
	race: "",
	grade: "",
	postal_code: "",
	avatar_string: ""
}
const defaultEncryptedUserArrays = {
	events: [],
	surveys: []
}
const defaultUserData = {
	...defaultEncryptedUserData,
	...defaultUnencryptedUserKeys,
	...defaultEncryptedUserArrays,
}
const unencyptedUserKeys = Object.keys(defaultUnencryptedUserKeys) as (keyof typeof defaultUnencryptedUserKeys)[];
const encryptedUserKeys = Object.keys(defaultEncryptedUserData) as (keyof typeof defaultEncryptedUserData)[];
const encryptedUserArrays = Object.keys(defaultEncryptedUserArrays) as (keyof typeof defaultEncryptedUserArrays)[];
const ivUserKeys = encryptedUserKeys.map((key) => key + "_iv");
const userData = {
	unencryptedKeys: unencyptedUserKeys,
	encryptedKeys: encryptedUserKeys,
	ivKeys: ivUserKeys,
	encryptedArrays: encryptedUserArrays
}
export {userData, defaultUserData}