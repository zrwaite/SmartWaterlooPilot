import env from "dotenv";
import app from "./server";
import pool from "./database/database"
import fs from "fs";
import path from "path";

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

app.listen(port, () => {
	// initializeDB();
	// deleteData();
	console.log(`listening on port ${port}`);
});