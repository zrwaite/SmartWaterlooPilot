import bcrypt from "bcrypt";
import pool from "../database/db";
import {encrypt} from "./encryption";
import {userData, defaultUserData} from "../database/userData";
const postUser = async (params:string[]) => {
	let errors:string[] = [];
	let success = false;
	let newUser:any = {};
	let valuesString = "";
	const numParams = userData.unencryptedKeys.length + userData.encryptedKeys.length*2;
	for (let i=0; i<numParams; i++) {
		if (i) valuesString += ", ";
		valuesString += `$${i+1}`;
	}
	// let postUser = {...defaultUserData};
	let queryValues:string[] = [];
	const queryKeys = [...userData.unencryptedKeys].join(", ");
	[...userData.unencryptedKeys].forEach((key, i) => {
		if (key==="password") {
			const password_hash = bcrypt.hashSync(params[i], 10);
			if (password_hash=="0") errors.push("invalid hashing");
			else queryValues.push(password_hash);
		} else {
			queryValues.push(params[i]);
		}
	});
	[...userData.encryptedKeys].forEach((key, i) => {
		let encryptedValue = encrypt(params[i]);
		queryValues.push(encryptedValue.content, encryptedValue.iv);
		queryValues.push(key, `${key}_iv`);
	})

	
	if (errors.length===0) {
		console.log("INSERT INTO users ("+ queryKeys +") VALUES("+valuesString+") RETURNING id");
		try {
			newUser = await pool.query(
				"INSERT INTO users ("+ queryKeys +") VALUES("+valuesString+") RETURNING id",
				[...queryValues]
			);
			success = true;
			newUser = newUser.rows[0].id;
		} catch (e: any) {
			if (e.code == 23505) {
				errors.push(e.detail);
			} else {
				errors.push("database error");
			}
			console.log(e);
		}
	}
	return {success: success, errors: errors, newUser: newUser};
}

export {postUser}