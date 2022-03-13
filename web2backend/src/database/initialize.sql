-- drop table accounts;
-- drop table user_data;
drop table org_data;

CREATE TABLE IF NOT EXISTS "accounts"(
	id SERIAL PRIMARY KEY,
	account_id INT UNIQUE,
	account_type varchar(10),
	password_hash varchar(80),
	user_data_id INT default null,
	org_data_id INT default null,
	events varchar(80)[] default array[]::varchar[],
	events_iv varchar(80)[] default array[]::varchar[],
	surveys varchar(80)[] default array[]::varchar[],
	surveys_iv varchar(80)[] default array[]::varchar[]
);

create table if not exists "user_data"(
	id SERIAL PRIMARY KEY,
	nickname VARCHAR(40),
	nickname_iv VARCHAR(80),
	birth_day varchar(80),
	birth_day_iv VARCHAR(80),
	birth_month varchar(80),
	birth_month_iv VARCHAR(80),
	birth_year varchar(80),
	birth_year_iv VARCHAR(80),
	gender varchar(80),
	gender_iv varchar(80),
	height varchar(80),
	height_iv varchar(80),
	weight varchar(80),
	weight_iv varchar(80),
	religion varchar(80),
	religion_iv varchar(80),
	sexuality varchar(80),
	sexuality_iv varchar(80),
	race varchar(80),
	race_iv varchar(80),
	grade varchar(80),
	grade_iv varchar(80),
	postal_code varchar(80),
	postal_code_iv varchar(80),
	avatar_string varchar(80),
	avatar_string_iv varchar(80)
);

create table if not exists "org_data"(
	id serial primary key,
	nickname varchar(40),
	nickname_iv VARCHAR(80),
	business_number varchar(80),
	business_number_iv VARCHAR(80),
	avatar_string varchar(80),
	avatar_string_iv varchar(80),
	owned_events varchar(80)[] DEFAULT array[]::varchar[],
	owned_events_iv varchar(80)[] DEFAULT array[]::varchar[],
	owned_surveys varchar(80)[] DEFAULT array[]::varchar[],
	owned_surveys_iv varchar(80)[] DEFAULT array[]::varchar[]
)