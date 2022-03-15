-- drop table accounts;
-- drop table user_data;
-- drop table org_data;

CREATE TABLE IF NOT EXISTS "accounts"(
	id SERIAL PRIMARY KEY,
	account_id INT UNIQUE,
	account_type varchar(10),
	password_hash varchar(80),
	user_data_id INT default null,
	org_data_id INT default null
);
create table if not exists "events"(
	id serial primary key,
	name varchar(80),
	age_group varchar(80),
	start_date varchar(80),
	end_date varchar(80),
	category varchar(80),
	description varchar(400),
	owner int,
	FOREIGN KEY (owner) REFERENCES accounts(account_id),
	image varchar(80)
);

create table if not exists "user_data"(
	id SERIAL PRIMARY KEY,
	nickname VARCHAR(100),
	birth_day varchar(100),
	birth_month varchar(100),
	birth_year varchar(100),
	gender varchar(100),
	height varchar(100),
	weight varchar(100),
	religion varchar(100),
	sexuality varchar(100),
	race varchar(100),
	grade varchar(100),
	postal_code varchar(100),
	avatar_string varchar(100)
);

create table if not exists "org_data"(
	id serial primary key,
	nickname varchar(100),
	business_number varchar(100),
	avatar_string varchar(100)
)