import env from "dotenv";
import app from "./server";
import pool from "./database/database"
import fs from "fs";
import path from "path";
import { DEV } from "./settings";

env.config();

const port = process.env.PORT || 2000;
if (process.env.ENV_INSTALLED !== "Yep") throw Error("Environment variable not properly defined");
const initializeDB = async () => {
	const filePath = path.resolve(__dirname, "./database/initialize.sql");
	const initializeSQL = fs.readFileSync(filePath).toString();
	console.log(await pool.query(initializeSQL));
}

const deleteData = async () => {
	console.log(await pool.query("DELETE FROM users WHERE user_id=023"));
}

if (process.env.PRODUCTION && DEV) throw Error("PRODUCTION AND DEV MODE INVALID!");

app.listen(port, () => {
	// initializeDB();
	// deleteData();
	if (DEV) console.log("DEV MODE - DEVELOPMENT ONLY");
	else console.log("PROD MODE - PRODUCTION ONLY");
	console.log(`Listening on port ${port}`);
});