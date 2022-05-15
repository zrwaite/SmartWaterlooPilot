import { useState } from 'react';
import { getDefaultUserInfoLists, userInfo } from '../../data/types/account';
interface UserInfoProps {
	userInfo:userInfo[]
}

const UserInfo = (props: UserInfoProps) => {
	const [userInfoLists, setUserInfoLists] = useState(getDefaultUserInfoLists())
	const [userInfoParsed, setUserInfoParsed] = useState(false);

	const incrementMap = (map: Map<string, number>, key:string) => {
		let numValues = map.get(key)||0;
		map.set(key, numValues+1);
	}
	
	const parseUserInfoLists = () => {
		const newUserInfoLists = getDefaultUserInfoLists();
		props.userInfo.forEach((user) => {
			const age = Math.floor(((new Date()).getTime() - (new Date(user.birth_day)).getTime()) / (1000*60*60*24*365));
			incrementMap(newUserInfoLists.ages, age.toString());
			incrementMap(newUserInfoLists.genders, user.gender);
			incrementMap(newUserInfoLists.races, user.race);
			incrementMap(newUserInfoLists.religions, user.religion);
			incrementMap(newUserInfoLists.sexualities, user.sexuality);
			incrementMap(newUserInfoLists.cities, user.city);
			incrementMap(newUserInfoLists.grades, user.grade);
			incrementMap(newUserInfoLists.heights, user.height);
			incrementMap(newUserInfoLists.weights, user.weight);
			incrementMap(newUserInfoLists.household_compositions, user.household_composition);
		})
		setUserInfoLists(newUserInfoLists);
	}

	let dataList = [
		{name:"Ages", key: "ages"} as const,
		{name:"Genders", key: "genders"} as const,
		{name:"Religions", key: "religions"} as const,
		{name:"Sexual Orientations", key: "sexualities"} as const,
		{name:"Races", key: "races"} as const,
		{name:"Cities", key: "cities"} as const,
		{name:"Grades", key: "grades"} as const,
		{name:"Heights", key: "heights"} as const,
		{name:"Weights", key: "weights"} as const,
		{name:"Household Compositions", key: "household_compositions"} as const,
	] as const;

	let componentsList:JSX.Element[] = [];

	dataList.forEach(data => {
		let elementList:JSX.Element[] = [];
		userInfoLists[data.key].forEach((value, key) => 
			elementList.push(<p>{key}: {value}</p>)
		)
		componentsList.push(<div key={componentsList.length}>
			<p>{data.name}</p>
			<ul>
				{elementList.map((component, key) => <li key={key}>{component}</li>)}
			</ul>
		</div>)
	})

	if (!userInfoParsed) {
		parseUserInfoLists();
		setUserInfoParsed(true);	
	}
	return (
		<>
			<h6>User info:</h6>
			{componentsList}
		</>
	);
}

export default UserInfo;