import pg from "pg";
import env from "dotenv";
env.config();

const pool = new pg.Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	port: 5432,
	ssl: { rejectUnauthorized: false }
});
export default pool;