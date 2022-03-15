import bcrypt from "bcrypt";
import pool from "../database/db";
import {encrypt} from "./encryption";
import {userData} from "../database/userData";
import {orgData} from "../database/orgData";
import {defaultEvent, eventData} from "../database/eventData";
const postUser = async (accountId:string, password:string, userDataParams: string[]) => {
	let errors:string[] = [];
	let success = false;
	let newUser:any = {};
	let userDataValuesString = "";
	for (let i=0; i<userDataParams.length; i++) {
		if (i) userDataValuesString += ", ";
		userDataValuesString += `$${i+1}`;
	}
	// let postUser = {...defaultUserData};
	let userDataQueryValues:string[] = [];
	userDataParams.forEach(key => userDataQueryValues.push(encrypt(key)))
	const userDataQueryKeysString = userData.dataKeys.join(", ");
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
	let orgDataValuesString = "";
	for (let i=0; i<orgDataParams.length; i++) {
		if (i) orgDataValuesString += ", ";
		orgDataValuesString += `$${i+1}`;
	}

	let orgDataQueryValues:string[] = [];
	orgDataParams.forEach(key => orgDataQueryValues.push(encrypt(key)))
	const orgDataQueryKeysString = orgData.dataKeys.join(", ");
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

const postEvent = async (eventParams:string[]) => {
	let errors:string[] = [];
	let success = false;
	let newEvent = {...defaultEvent};
	let eventDataValuesString = "";
	for (let i=0; i<eventParams.length; i++) {
		if (i) eventDataValuesString += ", ";
		eventDataValuesString += `$${i+1}`;
	}
	const eventDataQueryKeysString = eventData.eventKeys.join(", ");
	try {
		console.log("INSERT INTO events ("+ eventDataQueryKeysString +") VALUES("+eventDataValuesString+") RETURNING id",);
		console.log(eventParams);
		let newEventId = await pool.query(
			"INSERT INTO events ("+ eventDataQueryKeysString +") VALUES("+eventDataValuesString+") RETURNING id",
			eventParams
		);
		newEvent = newEventId.rows[0].id;
		success = true;
	} catch (e: any) {
		if (e.code == 23505) {
			errors.push(e.detail);
		} else {
			errors.push("database error");
		}
		console.log(e);
	}
	return {success: success, errors: errors, newEvent: newEvent};
}


export {postUser, postOrg, postEvent}