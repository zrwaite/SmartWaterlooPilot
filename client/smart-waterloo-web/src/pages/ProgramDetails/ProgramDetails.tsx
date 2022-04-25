import React, { useState } from 'react';
import {icons} from "../../images/icons";
import img_party_popper from "../../images/emoji-party-popper.png"
// import Sidebar from "../../components/Sidebar";
import CNOLogo from "../../images/CNOLogo.png"
import { MobileContext } from "../../App";
import {useContext} from "react";
import "./ProgramDetails.css";
import ProgramInfo from "./ProgramInfo";
import ClipLoader from "react-spinners/ClipLoader";
import NotFound from "../NotFound";
import {useParams,useNavigate, Link,} from "react-router-dom";
import Modal from "react-modal";
import { defaultProgram } from '../../data/types/programs';
import cookies from "../../modules/cookies";
import { addProgramtoUser } from '../../data/addData';
import { AccountChildProps } from '../AccountParent';
import { getDefaultUserInfoLists } from '../../data/types/account';
import { looseIncludes } from '../../modules/other';

Modal.setAppElement("#root");

const ProgramsDetails = (props: AccountChildProps) => {
	let {mobile} = useContext(MobileContext);
	const navigate = useNavigate();
	const { id } = useParams();
	const [buttonText, setText] = useState("Sign Up");
	const [signupButtonClass, setClass] = useState("signupButton");
	const [bottomButtonClass, setBottomClass] = useState("bottomButton");
	const [isOpen, setIsOpen] = React.useState(false);
	const [userInfoLists, setUserInfoLists] = useState(getDefaultUserInfoLists())
	const [userInfoParsed, setUserInfoParsed] = useState(false);

	// const program = programDataRaw.find(program => program.id === id);
	const [notFound, setNotFound] = useState(false);
	const [programData, setProgramData] = useState({program: defaultProgram, set: false});
	const [canSubmit, setCanSubmit] = useState(true);
	
	
	if (notFound || !id) return <NotFound />

	function openModal() {
		setIsOpen(true);
	  }

	function closeModal() {
		setIsOpen(false);
	}
	console.log(programData.program);
	let filledSurvey = false;
	if (!programData.program.linked_survey_id) filledSurvey = true;
	else if (looseIncludes(props.accountData.account.surveys, programData.program.linked_survey_id)) filledSurvey = true;
	console.log(filledSurvey);
	const signedUp = props.accountData.account.programs.includes(parseInt(programData.program.id));
	const trySignUp = async () => {
		setCanSubmit(false);
		if (!signedUp) {
			let {success, errors} = await addProgramtoUser(cookies.get("userId"), programData.program.id)
			if (success) {
				openModal();
				setText("Signed Up ✓");
				setClass("signupLightBlueButton");
				setBottomClass("bottomLightBlueButton");
				setTimeout(() => window.location.reload(), 800);
			} else alert(JSON.stringify(errors));
		}
	}
	if (props.accountData.set && programData.set && signedUp && buttonText!=="Signed Up ✓" && signupButtonClass!=="signupLightBlueButton" && bottomButtonClass!=="bottomLightBlueButton") {
		setText("Signed Up ✓");
		setClass("signupLightBlueButton");
		setBottomClass("bottomLightBlueButton");
	}


	const incrementMap = (map: Map<string, number>, key:string) => {
		let numValues = map.get(key)||0;
		map.set(key, numValues+1);
	}

	const parseUserInfoLists = () => {
		const newUserInfoLists = getDefaultUserInfoLists();
		console.log(programData.program.user_info);
		programData.program.user_info.forEach((user) => {
			incrementMap(newUserInfoLists.birthdays, user.birth_day);
			incrementMap(newUserInfoLists.genders, user.gender);
			incrementMap(newUserInfoLists.races, user.race);
			incrementMap(newUserInfoLists.religions, user.religion);
			incrementMap(newUserInfoLists.sexualities, user.sexuality);
		})
		setUserInfoLists(newUserInfoLists);
	}

	if (!programData.set) {
		const newProgramData = props.programsData.programs.find(program => program.id == id)
		if (newProgramData) setProgramData({program: newProgramData, set: true})
	} else if (!userInfoParsed) {
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
			<Modal isOpen={isOpen} onRequestClose={closeModal} className="popupPanel">
				<div className='messagePanel'>
					<div>
						<img src={img_party_popper} alt="Yay! You're In!" className="h5"/>
					</div>
					<div>
						<h6 className='popupMessage'>Yay! You're in! </h6>
					</div>
					<div>
						<p className="popupButton" onClick={() => closeModal() }>OK</p>
					</div>
				</div>
			</Modal>	
			<div className='navbarProgramDetails'>
				<div className='leftNavProgramDetail'>
					<div onClick={() => navigate(cookies.get("back"))} className="programBackButton">
						<img src={icons.leftArrow} alt="Programs" className="h5"/>
						<p className="programBackButton">Programs</p>
					</div>					
				</div>
				<div>
					{/* <p className={signupButtonClass} onClick={trySignUp}>{buttonText}</p> */}
				</div>		
			</div>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanelNoPadding"}>
					{
						(programData.set)?(<>
							<div className={"programDetails"}>
								<img src={CNOLogo} alt={programData.program.name} className="programImage" />
							</div>
							<ProgramInfo {...programData.program} org={props.org} />
							{props.org&&(
								<>
								<h6>User info:</h6>
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
								</>
							)}
							{props.org?null:(<div className="DesktopPanelNoBorder">
								{
									!filledSurvey&&(
										<div>
											<h6>You have to fill out this survey first: <Link to={`/survey/${programData.program.linked_survey_id}/user`}>Survey</Link></h6>
										</div>
									)
								}
								<p className={filledSurvey?bottomButtonClass:"disabledButton"} onClick={canSubmit&&filledSurvey?trySignUp:undefined}>{buttonText}</p>
							</div>)}
						</>):(
							<div className={"center"}> <ClipLoader color={"black"} loading={true} css={""} size={200} /> </div>
						)
					}
				</div>
			</div>
		</>
	);
}

export default ProgramsDetails;