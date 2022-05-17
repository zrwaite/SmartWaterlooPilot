import env from "dotenv";
import app from "./server";
import pool from "./database/database"
import {initializeDB} from "./database/init/init";
import { DEV } from "./settings";
import {migrateDB} from "./database/migration/migrate";

env.config();

const port = process.env.PORT || 2000;
if (process.env.ENV_INSTALLED !== "Yep") throw Error("Environment variable not properly defined");



const forceQuery = async () => {
	// console.log(await pool.query("SELECT * from surveys;"));
}

if (process.env.PRODUCTION && DEV) throw Error("PRODUCTION AND DEV MODE INVALID!");

app.listen(port, () => {
	// initializeDB();
	// forceQuery();
	// migrateDB(1); 
	if (DEV) console.log("DEV MODE - DEVELOPMENT ONLY");
	else console.log("PROD MODE - PRODUCTION ONLY");
	console.log(`Listening on port ${port}`);
});