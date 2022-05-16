import { defaultProgramType } from "../types/programs";

const sortProgramsByDate = (programs: defaultProgramType[]) => {
	// const sortedPrograms: defaultProgramType[] = [];
	programs.sort((a,b) => {
		if (a.start_date>b.start_date) return 1;
		if (a.start_date<b.start_date) return -1;
		if (a.start_time>b.start_time) return 1;
		if (a.start_time<b.start_time) return -1;
		if (a.end_date>b.end_date) return 1;
		if (a.end_date<b.end_date) return -1;
		if (a.end_time>b.end_time) return 1;
		if (a.end_time<b.end_time) return -1;
		return 0
	})
}

export {sortProgramsByDate}