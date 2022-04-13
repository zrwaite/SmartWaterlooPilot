import { getUserInfo } from "./getDatabaseInfo"

const parseOrgEvent = async (event: any) => {
	for (let i=0; i<event.user_info.length; i++) {
		const {status, userInfo, errors} = await getUserInfo(event.user_info[i]);
		if (userInfo) {
			event.user_info[i] = userInfo;
		} else return {status: status, event: {}, errors: errors};
	}
	return {status: 200, event: event, errors: []}
}

export {parseOrgEvent}