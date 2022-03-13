import bcrypt from "bcrypt";
import pool from "../database/db";
import {encrypt} from "./encryption";
import {userData} from "../database/userData";
import {orgData} from "../database/orgData";
const postUser = async (accountId:string, password:string, userDataParams: string[]) => {
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
		let userQueryKeysString = "account_id, password_hash, user_data_id, account_type" ;
		userQueryValues.push(accountId);
		const password_hash = bcrypt.hashSync(password, 10);
		if (password_hash=="0") errors.push("invalid hashing");
		else userQueryValues.push(password_hash);
		userQueryValues.push(newUserDataId.rows[0].id.toString());
		userQueryValues.push("user")
		let newUserId = await pool.query(
			"INSERT INTO accounts ("+ userQueryKeysString +") VALUES($1, $2, $3, $4) RETURNING id",
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

const postOrg = async (accountId:string, password:string, orgDataParams: string[]) => {
	let errors:string[] = [];
	let success = false;
	let newOrg:any = {};
	const numDataParams = orgDataParams.length*2;
	let orgDataValuesString = "";
	for (let i=0; i<numDataParams; i++) {
		if (i) orgDataValuesString += ", ";
		orgDataValuesString += `$${i+1}`;
	}
	// let postUser = {...defaultUserData};
	let orgDataQueryValues:string[] = [];
	let orgDataQueryKeys:string[] = [];
	[...orgData.dataKeys].forEach((key, i) => {
		let encryptedValue = encrypt(orgDataParams[i]);
		orgDataQueryValues.push(encryptedValue.content, encryptedValue.iv);
		orgDataQueryKeys.push(key, `${key}_iv`);
	})
	const orgDataQueryKeysString = orgDataQueryKeys.join(", ");
	try {
		let newUserDataId = await pool.query(
			"INSERT INTO org_data ("+ orgDataQueryKeysString +") VALUES("+orgDataValuesString+") RETURNING id",
			[...orgDataQueryValues]
		);
		let orgQueryValues:string[] = [];
		let orgQueryKeysString = "account_id, password_hash, org_data_id, account_type" ;
		orgQueryValues.push(accountId);
		const password_hash = bcrypt.hashSync(password, 10);
		if (password_hash=="0") errors.push("invalid hashing");
		else orgQueryValues.push(password_hash);
		orgQueryValues.push(newUserDataId.rows[0].id.toString());
		orgQueryValues.push("org")
		let newOrgId = await pool.query(
			"INSERT INTO accounts ("+ orgQueryKeysString +") VALUES($1, $2, $3, $4) RETURNING id",
			[...orgQueryValues]
		);
		newOrg = newOrgId.rows[0].id;
		success = true;
	} catch (e: any) {
		if (e.code == 23505) {
			errors.push(e.detail);
		} else {
			errors.push("database error");
		}
		console.log(e);
	}
	return {success: success, errors: errors, newOrg: newOrg};
}


export {postUser, postOrg}