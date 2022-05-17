import pool from "../database";
import fs from "fs";
import path from "path";

const migrateDB = async (to: number) => {
	let versionObj = await pool.query(`SELECT number FROM version LIMIT 1`);
	let from:number = 0;
	if (versionObj.rows && versionObj.rows.length) {
		from = versionObj.rows[0].number;
	} else throw Error("Previous version not found");
	

	if (from == to) return console.log("DB up to date with migration");

	if (from < to) {
		for (let i=from+1; i<=to; i++) {
			const filePath = path.resolve(__dirname, `./${i}up.sql`);
			if (fs.existsSync(filePath)) {
				const query = fs.readFileSync(filePath).toString();
				console.log(await pool.query(query));
			} else throw Error(`File <${filePath}> not found`)
		}
	} else {
		for (let i=from; i>to; i--) {
			const filePath = path.resolve(__dirname, `./${i}down.sql`);
			if (fs.existsSync(filePath)) {
				const query = fs.readFileSync(filePath).toString();
				console.log(await pool.query(query));
			} else throw Error(`File <${filePath}> not found`);
		}
	}
	await pool.query("TRUNCATE TABLE version;");
	await pool.query(`INSERT INTO version (number) VALUES($1) RETURNING id`,[to]);
	console.log(`DB VERSION: ${from} --> ${to}`)
}

export {migrateDB}