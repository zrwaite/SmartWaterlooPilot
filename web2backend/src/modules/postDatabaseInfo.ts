import bcrypt from "bcrypt";
import pool from "../database/db";
import {encrypt} from "./encryption";
import {userData} from "../database/userData";
import {orgData} from "../database/orgData";
import {defaultEvent, eventData} from "../database/eventData";
const postUser = async (userId:string, password:string, userDataParams: string[]) => {
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
		let userQueryKeysString = "u_id, password_hash, user_data_id" ;
		userQueryValues.push(userId);
		const password_hash = bcrypt.hashSync(password, 10);
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

const postOrg = async (orgDataParams: string[]) => {
	let errors:string[] = [];
	let success = false;
	let newOrg:any = {};
	let orgDataValuesString = "";
	for (let i=0; i<orgDataParams.length; i++) {
		if (i) orgDataValuesString += ", ";
		orgDataValuesString += `$${i+1}`;
	}

	// let orgDataQueryValues:string[] = [...orgDataParams];
	// orgDataParams.forEach(key => orgDataQueryValues.push(encrypt(key)))
	const orgDataQueryKeysString = orgData.postKeys.join(", ");
	try {
		let newOrgDataId = await pool.query(
			"INSERT INTO orgs ("+ orgDataQueryKeysString +") VALUES("+orgDataValuesString+") RETURNING id",
			[...orgDataParams]
		);
		newOrg = newOrgDataId.rows[0].id;
		success = true;
	} catch (e: any) {
		if (e.code == 23505) {
			errors.push(e.detail);
		} else if (e.code == 23503) {
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