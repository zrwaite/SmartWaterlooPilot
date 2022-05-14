import pg from "pg";
import env from "dotenv";
import { DEV } from "../settings";
env.config();

const databaseCredentials = DEV?{
	user: process.env.DEV_DB_USER,
	password: process.env.DEV_DB_PASSWORD,
	host: process.env.DEV_DB_HOST,
	database: process.env.DEV_DB_DATABASE,
	port: 5432,
	ssl: { rejectUnauthorized: false }
}:{
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	port: 5432,
	ssl: { rejectUnauthorized: false }
}

const pool = new pg.Pool(databaseCredentials);
export default pool;