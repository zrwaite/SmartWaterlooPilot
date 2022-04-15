import Navbar from "../../components/Navbar";
import "./OrgData.css";
import {useContext, useState} from "react";
import {MobileContext} from "../../App";
import { AccountChildProps } from "../AccountParent";
import { defaultOrg } from "../../data/types/orgs";
import { useParams } from "react-router-dom";
import { getDefaultUserInfoLists } from "../../data/types/account";
const OrgData = (props:AccountChildProps) => {
	let {orgId} = useParams();
	let {mobile} = useContext(MobileContext);
	const [orgData, setOrgData] = useState({org: defaultOrg, set: false});
	const [userInfoParsed, setUserInfoParsed] = useState(false);
	const [userInfoLists, setUserInfoLists] = useState(getDefaultUserInfoLists())

	if (!orgData.set) {
		const newOrgData = props.orgsData.orgs.find(org => org.id.toString() === orgId)
		if (newOrgData) setOrgData({org:newOrgData, set: true});
	}

	const incrementMap = (map: Map<string, number>, key:string) => {
		let numValues = map.get(key)||0;
		map.set(key, numValues+1);
	}

	const parseUserInfoLists = () => {
		const newUserInfoLists = getDefaultUserInfoLists();
		console.log(orgData.org.user_info);
		orgData.org.user_info.forEach((user) => {
			incrementMap(newUserInfoLists.birthdays, user.birth_day);
			incrementMap(newUserInfoLists.genders, user.gender);
			incrementMap(newUserInfoLists.races, user.race);
			incrementMap(newUserInfoLists.religions, user.religion);
			incrementMap(newUserInfoLists.sexualities, user.sexuality);
		})
		setUserInfoLists(newUserInfoLists);
	}

	if (!orgData.set) {
		const newOrgData = props.orgsData.orgs.find(org => org.id.toString() === orgId)
		if (newOrgData) setOrgData({org:newOrgData, set: true});
	}else if (!userInfoParsed) {
		parseUserInfoLists();
		setUserInfoParsed(true);
	}

	let userInfoComponents:{
		religions: JSX.Element[]
		genders: JSX.Element[]
		races: JSX.Element[]
		birthdays: JSX.Element[]
		sexualities: JSX.Element[]
	}= {
		religions: [],
		genders: [],
		races: [],
		birthdays: [],
		sexualities: []
	}
	userInfoLists.birthdays.forEach((value, key) => {
		userInfoComponents.birthdays.push(<p>{key}: {value}</p>)
	})
	userInfoLists.religions.forEach((value, key) => {
		userInfoComponents.religions.push(<p>{key}: {value}</p>)
	})
	userInfoLists.sexualities.forEach((value, key) => {
		userInfoComponents.sexualities.push(<p>{key}: {value}</p>)
	})
	userInfoLists.races.forEach((value, key) => {
		userInfoComponents.races.push(<p>{key}: {value}</p>)
	})
	userInfoLists.genders.forEach((value, key) => {
		userInfoComponents.genders.push(<p>{key}: {value}</p>)
	})
	return (
		<>
			<Navbar root={false}/>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanel"}>
					{mobile?<h6>Org Data</h6>:<h4 className={"OrgDataHeader"}>Org Data</h4>}
					<p>Org Nickname: {orgData.org.nickname}</p>
					<p>Business Number: {orgData.org.business_number}</p>
					<p>Verified: {Boolean(orgData.org.verified).toString()}</p>
					<p>Num Members: {orgData.org.members.length+1}</p>
					{<>
						<h6>Member info:</h6>
						<p>Birthdays:</p>
						<ul>
							{userInfoComponents.birthdays.map((component, key) => <li key={key}>{component}</li>)}
						</ul>
						<p>Genders:</p>
						<ul>
							{userInfoComponents.genders.map((component, key) => <li key={key}>{component}</li>)}
						</ul>
						<p>Religions:</p>
						<ul>
							{userInfoComponents.religions.map((component, key) => <li key={key}>{component}</li>)}
						</ul>
						<p>Sexualities:</p>
						<ul>
							{userInfoComponents.sexualities.map((component, key) => <li key={key}>{component}</li>)}
						</ul>
						<p>Races:</p>
						<ul>
							{userInfoComponents.races.map((component, key) => <li key={key}>{component}</li>)}
						</ul>
					</>}
				</div>
			</div>	
		</>
	);
}

export default OrgData;