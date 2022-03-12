CREATE TABLE IF NOT EXISTS "users"(
	id SERIAL PRIMARY KEY,
	userid INT UNIQUE,
	password_hash varchar(80),
	nickname VARCHAR(40),
	nickname_iv VARCHAR(80)
);