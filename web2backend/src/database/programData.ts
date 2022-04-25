const baseProgram = {
	org: "",
	name: "",
	min_age: "",
	max_age: "",
	start_date: "",
	end_date: "",
	location: "",
	category: "",
	description: "",
}
const nullableProgram = {
	linked_survey_id: ""
}
const postProgram = {
	...baseProgram,
	...nullableProgram
}
const getProgramParams = {
	id: "",
	attendees: "",
	user_info: []
}
const defaultProgram = {
	...postProgram,
	...getProgramParams,
}

const programData = {
	nullableProgramKeys: Object.keys(nullableProgram) as (keyof typeof nullableProgram)[],
	baseProgramKeys: Object.keys(baseProgram) as (keyof typeof baseProgram)[],
	postProgramKeys: Object.keys(postProgram) as (keyof typeof postProgram)[],
	allProgramKeys: Object.keys(defaultProgram) as (keyof typeof defaultProgram)[]
}
export {postProgram, programData, defaultProgram}