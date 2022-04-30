const baseProgram = {
	questions: "",
	org: "",
	name: "",
	min_age: "",
	max_age: "",
	start_date: "",
	end_date: "",
	start_time: "",
	end_time: "",
	location: "",
	category: "",
	description: "",
}
const postProgram = {
	...baseProgram,
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
	baseProgramKeys: Object.keys(baseProgram) as (keyof typeof baseProgram)[],
	postProgramKeys: Object.keys(postProgram) as (keyof typeof postProgram)[],
	allProgramKeys: Object.keys(defaultProgram) as (keyof typeof defaultProgram)[]
}
export {postProgram, programData, defaultProgram}