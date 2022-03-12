import bcrypt from "bcrypt";
import pool from "../database/db";
import {encrypt} from "./encryption";
const postUser = async (userid:string, password:string, nickname:string) => {
	let errors:string[] = [];
	let success = false;
	let newUser:any = {};
	const password_hash = bcrypt.hashSync(password, 10);
	if (password_hash=="0") errors.push("invalid hashing");
	else {
		const encrypted_nickname = encrypt(nickname);
		try {
			newUser = await pool.query(
				"INSERT INTO users (userid, password_hash, nickname, nickname_iv) VALUES($1, $2, $3, $4) RETURNING *",
				[userid, password_hash, encrypted_nickname.content, encrypted_nickname.iv]
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