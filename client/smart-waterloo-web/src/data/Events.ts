type defaultEventsDataType = {
	eventsDataSet: boolean;
	events: {
		id: string;
		name: string;
		organization: string;
		age_range: string;
		start_date: string;
		end_date: string;
		category: string;
		signed_up: boolean;
		description: string;
		image: string;
	}[]
}
const defaultEventsData: defaultEventsDataType = {eventsDataSet: false, events:[]};
const defaultEvent = {
	id: "",
	name: "",
	organization: "",
	age_range: "",
	start_date: "",
	end_date: "",
	category: "",
	signed_up: false,
	description: "",
	image: "",
}

const exampleEvents = [
	{
		"id": "basketball-skills",
		"name": "Basketball Skills",
		"organization": "Kinbrdige Community Association",
		"age_range": "8-12",
		"start_date": "March 15 2022",
		"end_date": "June 15 2022",
		"category": "Outdoor",
		"signed_up": true,
		"description": "At KW YBA we believe all sports are a gateway for children, at any age, to learn about teamwork, leadership and life's skills. Both our house league and rep teams introduce your sons and daughters to these concepts and more. There are two main areas of focus for the YBA program: to have FUN, and to develop basketball skills and knowledge. Our youngest age group does not keep score for most of the season, focusing on the play on the court, not on who may have won or lost. We are developing young players, coaches and officials at that level. We offer coaching clinics to all our coaches.",
		"image": "/images/event_basketball_skills.jpg"
	},
	{
		"id": "afterschool-program",
		"name": "Afterschool Program",
		"organization": "Fiddlesticks Community Centre",
		"age_range": "6-12",
		"start_date": "September 6 2021",
		"end_date": "June 30 2022",
		"category": "After School",
		"signed_up": false,
		"description": "Keep your kids safe and extend their learning by signing up for an after-school program with Oakville’s best martial arts school. Dragon Taekwondo offers high-quality after-school karate classes, including a wide variety of program offerings to meet your child’s needs. Our carefully designed program will strengthen your child’s mind, body, and spirit.",
		"image": "/images/event_afterschool_program.jpg"
	},
	{
		"id": "march-break-camp",
		"name": "March Break Camp",
		"organization": "Greenway-Chaplin Community Centre",
		"age_range": "4-12",
		"start_date": "March 9 2022",
		"end_date": "March 15 2022",
		"category": "Camp",
		"signed_up": false,
		"description": "​Join us for a jam-packed week of musical theatre fun! Each day we will explore new drama exercises and hone in on your performance skills through acting, vocal, and dance class (plus games and craft sessions)! Spend your March Break on stage with a new group of friends!",
		"image": "/images/event_march_break_camp.jpg"
	}
]

export {exampleEvents, defaultEvent, defaultEventsData}