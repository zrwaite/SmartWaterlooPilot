import pool from "../database/db";

const updateUser = async (userid:string, nickname: string) => {
	let user;
	let status;
	try {
		user = await pool.query(
			"UPDATE users SET nickname = $1 WHERE userid = $2",
			[nickname, userid]
		);
		if (user) {
			status = 201;
		}
		else status = 404;
	} catch (_) {
		status = 400;
	}
	return {status: status, user: user};
}

export {updateUser}