import {exampleUsers} from "./Users";
import {exampleEvents, defaultEventsData} from "./Events";

const getUserData = async (id:string) => {
	await new Promise(resolve => setTimeout(resolve, 1000)); //Just an artificial delay for mock data
	//EDIT TO NOT BE EXAMPLE USERS
	const user = exampleUsers.find(user => user.userId === id);
	if (!user) {
		alert("Invalid user!");
		return undefined;
	}
	return {
		userDataSet: true,
		nickname: user.nickname,
		avatarString: user.avatarString
	}
}
const getEventsData = async () => {
	await new Promise(resolve => setTimeout(resolve, 1000)); //Just an artificial delay for mock data
	let newEvents:typeof defaultEventsData.events = [];
	//EDIT TO NOT BE EXAMPLE EVENTS
	exampleEvents.forEach((event) => {
		newEvents.push({
			name: event.name,
			title: event.title,
			organization: event.organization,
			age_range: event.age_range,
			start_date: event.start_date,
			end_date: event.end_date,
			category: event.category,
			signed_up: event.signed_up,
			description: event.description,
			image: event.image,
		})
	})
	if (!newEvents) {
		alert("Events not found");
		return undefined;
	}
	return newEvents;
}

export {getUserData, getEventsData};