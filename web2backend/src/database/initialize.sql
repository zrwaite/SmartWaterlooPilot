drop table answers;
drop table events;
drop table surveys;
drop table questions;
drop table orgs;
drop table users;
drop table user_info;


CREATE TABLE IF NOT EXISTS "user_info"(
	id SERIAL primary key,
	birth_day date not null,
	gender varchar(100) not null,
	religion varchar(100),
	sexuality varchar(100),
	race varchar(100),
	grade varchar(100),
	postal_code varchar(100)
);

CREATE TABLE IF NOT EXISTS "users"(
	id SERIAL PRIMARY KEY,
	user_id INT UNIQUE,
	password_hash varchar(80) not null,
	nickname VARCHAR(100) not null,
	avatar_string varchar(100) not null,
	user_info_id int not null,
	FOREIGN KEY (user_info_id) REFERENCES user_info(id),
	-- height varchar(100),
	-- weight varchar(100),
	answers integer[] default array[]::integer[],
	events integer[] default array[]::integer[],
	surveys integer[] default array[]::integer[],
	orgs text[] default array[]::text[]
);

create table if not exists "orgs"(
	id serial primary key,
	owner_id INT,
	FOREIGN KEY (owner_id) REFERENCES users(user_id),
	nickname varchar(100),
	business_number varchar(100),
	verified bit default '0',
	avatar_string varchar(100),
	members int[] default array[]::integer[],
	user_info int[] default array[]::integer[]
);

create table if not exists "surveys"(
	id serial primary key,
	name TEXT,
	org int,
	FOREIGN KEY (org) REFERENCES orgs(id),
	linked bit default '0',
	description TEXT,
	questions integer[],
	user_info int[] default array[]::integer[]
);

-- CREATE TYPE type_choices AS ENUM ('short', 'long', 'mc', 'check');

create table if not exists "questions"(
	id serial primary key,
	prompt TEXT,
	answer_type type_choices,
	choices TEXT[] default array[]::text[]
);

create table if not exists "answers"(
	id serial primary key,
	answer TEXT,
	question_id int,
	FOREIGN KEY (question_id) REFERENCES questions(id)
);

create table if not exists "events"(
	id serial primary key,
	name varchar(80),
	org int,
	FOREIGN KEY (org) REFERENCES orgs(id),
	age_group varchar(80),
	start_date varchar(80),
	end_date varchar(80),
	category varchar(80),
	description TEXT,
	linked_survey_id int null,
	FOREIGN KEY (linked_survey_id) REFERENCES surveys(id),
	image varchar(80),
	user_info int[] default array[]::integer[],
	attendees int default 0
);