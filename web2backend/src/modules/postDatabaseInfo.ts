import bcrypt from "bcrypt";
import pool from "../database/db";
import {encrypt} from "./encryption";
import {userData, defaultUserData} from "../database/userData";
const postUser = async (userParams:string[], userDataParams: string[]) => {
	let errors:string[] = [];
	let success = false;
	let newUser:any = {};
	const numDataParams = userDataParams.length*2;
	let userDataValuesString = "";
	for (let i=0; i<numDataParams; i++) {
		if (i) userDataValuesString += ", ";
		userDataValuesString += `$${i+1}`;
	}
	// let postUser = {...defaultUserData};
	let userDataQueryValues:string[] = [];
	let userDataQueryKeys:string[] = [];
	[...userData.dataKeys].forEach((key, i) => {
		let encryptedValue = encrypt(userDataParams[i]);
		userDataQueryValues.push(encryptedValue.content, encryptedValue.iv);
		userDataQueryKeys.push(key, `${key}_iv`);
	})
	const userDataQueryKeysString = userDataQueryKeys.join(", ");
	try {
		let newUserDataId = await pool.query(
			"INSERT INTO user_data ("+ userDataQueryKeysString +") VALUES("+userDataValuesString+") RETURNING id",
			[...userDataQueryValues]
		);
		let userQueryValues:string[] = [];
		let userQueryKeysString = "userid, password_hash, user_data_id" ;
		userQueryValues.push(userParams[0]);
		const password_hash = bcrypt.hashSync(userParams[1], 10);
		if (password_hash=="0") errors.push("invalid hashing");
		else userQueryValues.push(password_hash);
		userQueryValues.push(newUserDataId.rows[0].id.toString());
		let newUserId = await pool.query(
			"INSERT INTO users ("+ userQueryKeysString +") VALUES($1, $2, $3) RETURNING id",
			[...userQueryValues]
		);
		newUser = newUserId.rows[0].id;
		success = true;
	} catch (e: any) {
		if (e.code == 23505) {
			errors.push(e.detail);
		} else {
			errors.push("database error");
		}
		console.log(e);
	}
	return {success: success, errors: errors, newUser: newUser};
}

export {postUser}