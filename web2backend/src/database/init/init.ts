import path from "path";
import fs from "fs";
import pool from "../database";

const initializeDB = async () => {
	const filePath = path.resolve(__dirname, "./initialize.sql");
	const initializeSQL = fs.readFileSync(filePath).toString();
	console.log(await pool.query(initializeSQL));
}

export {initializeDB}