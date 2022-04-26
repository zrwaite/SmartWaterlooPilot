import env from "dotenv";
import app from "./server";
import pool from "./database/database"
import fs from "fs";
import path from "path";

env.config();

const port = process.env.PORT || 2000;
const initializeDB = async () => {
	const filePath = path.resolve(__dirname, "./database/initialize.sql");
	const initializeSQL = fs.readFileSync(filePath).toString();
	console.log(await pool.query(initializeSQL));
}

app.listen(port, () => {
	// initializeDB();
	console.log(`listening on port ${port}`);
});
