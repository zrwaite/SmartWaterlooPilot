import { useState } from 'react';
import { getDefaultUserInfoLists, userInfo } from '../../data/types/account';
interface UserInfoProps {
	userInfo:userInfo[],
	dataParsed: boolean
}

const UserInfo = (props: UserInfoProps) => {
	const [userInfoLists, setUserInfoLists] = useState(getDefaultUserInfoLists())
	const [userInfoParsed, setUserInfoParsed] = useState(false);

	const incrementMap = (map: Map<string, number>, key:string) => {
		if (key!=="" && key!==null && key!==undefined){
			let numValues = map.get(key)||0;
			map.set(key, numValues+1);
		}
	}

	let dataList = [
		{name:"Ages", key: "ages", singleKey:"age"} as const,
		{name:"Genders", key: "genders", singleKey:"gender"} as const,
		{name:"Religions", key: "religions", singleKey:"religion"} as const,
		{name:"Sexual Orientations", key: "sexualities", singleKey:"sexuality"} as const,
		{name:"Races", key: "races", singleKey:"race"} as const,
		{name:"Cities", key: "cities", singleKey:"city"} as const,
		{name:"Grades", key: "grades", singleKey:"grade"} as const,
		{name:"Heights", key: "heights", singleKey:"height"} as const,
		{name:"Weights", key: "weights", singleKey:"weight"} as const,
		{name:"Household Compositions", key: "household_compositions", singleKey:"household_composition"} as const,
		{name:"Household Income", key: "household_incomes", singleKey:"household_income"} as const,
		{name:"Primary Language", key: "primary_languages", singleKey:"primary_language"} as const,
		{name:"Secondary Language", key: "secondary_languages", singleKey:"secondary_language"} as const,
	] as const;
	
	const parseUserInfoLists = () => {
		const newUserInfoLists = getDefaultUserInfoLists();
		props.userInfo.forEach((user) => {
			dataList.forEach((data) => {
				incrementMap(newUserInfoLists[data.key], user[data.singleKey]);
			});
		})
		setUserInfoLists(newUserInfoLists);
	}


	let componentsList:JSX.Element[] = [];

	dataList.forEach(data => {
		let elementList:JSX.Element[] = [];
		userInfoLists[data.key].forEach((value, key) => 
			elementList.push(<p>{key}: {value}</p>)
		)
		componentsList.push(<div key={componentsList.length}>
			{elementList.length?(<>
				<p>{data.name}</p>
				<ul>
					{elementList.map((component, key) => <li key={key}>{component}</li>)}
				</ul>
			</>):null
			}
		</div>)
	})
	console.log(props.userInfo);
	if (!userInfoParsed && props.dataParsed) {
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