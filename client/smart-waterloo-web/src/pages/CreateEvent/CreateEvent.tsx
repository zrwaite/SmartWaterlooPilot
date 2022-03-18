import "./CreateEvent.css";
import { useContext, useState } from "react";
import { MobileContext } from "../../App";
import { eventCategories } from "./CreateEventData";
import Select, { ActionMeta } from "react-select";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import eventABI from "../SignUp/utils/OrganisationEvents.json";
import { AbiItem } from 'web3-utils';

let web3 = new Web3(Web3.givenProvider);
declare var window: any;

//Todo change buttons to links
const DefaultCreateEventState = {
	inputs: {
		name: "",
		age: "",
		start_day: "",
		start_month: "",
		start_year: "",
		end_day: "",
		end_month: "",
		end_year: "",
		category: "",
		description: ""
	}
}
const CreateEvent = () => {
	const navigate = useNavigate();
	let { mobile } = useContext(MobileContext);
	const [state, setState] = useState(DefaultCreateEventState)
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		let inputKeys: keyof typeof state.inputs;
		const name = event.target.name as typeof inputKeys;
		let partialInput = { ...state.inputs };
		partialInput[name] = event.target.value;
		setState({ ...state, inputs: partialInput });
	}
	const handleSelectChange = (newValue: null | { value: string; label: string; }, actionMeta: ActionMeta<{ value: string, label: string }>) => {
		let inputKeys: keyof typeof state.inputs;
		const name = actionMeta.name as typeof inputKeys;
		let partialInput = { ...state.inputs };
		partialInput[name] = newValue?.value || "";
		setState({ ...state, inputs: partialInput });
	}
	const complete = Object.values(state.inputs).every(answer => answer !== "");
	const greyText = { color: "grey" };
	const link = { cursor: "pointer" };

	const eventCreation = async () => {
		let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		web3.eth.defaultAccount = accounts[0];
		const contractABI = eventABI;
		const contractAddress = "0xd242a3Fa65b82Aa9C87D3a19C82EA6b5Db78e8EB";

		const eventContract = await new web3.eth.Contract(contractABI as AbiItem[], contractAddress);

		await eventContract.methods.createOrgEvent(
			web3.eth.defaultAccount,
			state.inputs.name,
			state.inputs.age,
			(state.inputs.start_day + state.inputs.start_month + state.inputs.start_year),
			(state.inputs.end_day + state.inputs.end_month + state.inputs.end_year),
			state.inputs.category,
			state.inputs.description
		).send({ from: web3.eth.defaultAccount })
			.then(() => {
				console.log(`${state.inputs.name} created successfully`);
			})
			.catch((err: any) => console.log(err));

		let path = `/dashboard`;
		navigate(path);
	}
	
	return (
		<>
			<div className={"PageContainer"}>
				<div className={"createNavbar"}>
					<h6 style={link} onClick={() => navigate("/events")}>Cancel</h6>
					<h6 style={complete ? link : greyText}>Next</h6>
				</div>
				<div className={mobile ? "" : "DesktopPanel"}>
					<div className={"disclaimer"}>
						<div className={"infoBubble"}><p>i</p></div>
						<p>Please make sure information is correct. You will not be able to edit this event once it is published.</p>
					</div>
					<h2 className={"createEventHeader"}>Create New Event ✏️</h2>
					<div className={"formQuestion"}>
						<p>Name of Event</p>
						<input name={"name"} className={"createEventInput"} placeholder={"Enter Text"} value={state.inputs.name} onChange={handleInputChange} />
					</div>
					<div className={"formQuestion"}>
						<p>Which age group is this event</p>
						{["4-6", "4-8", "4-12", "6-12", "8-12"].map((age, i) => {
							return (
								<div key={i} className={"mcInputs"}>
									<input name={"age"} type="radio" value={age} checked={age === state.inputs.age} onChange={handleInputChange} />
									<p>{age}</p>
								</div>
							)
						})}
					</div>
					<div className={"formQuestion"}>
						<p>Start Date</p>
						<div className={"singleLineMultiInput"}>
							<input name={"start_day"} className={"createEventMiniInput"} placeholder={"DD"} value={state.inputs.start_day} onChange={handleInputChange} />
							<h6>/</h6>
							<input name={"start_month"} className={"createEventMiniInput"} placeholder={"MM"} value={state.inputs.start_month} onChange={handleInputChange} />
							<h6>/</h6>
							<input name={"start_year"} className={"createEventMiniInput"} placeholder={"YY"} value={state.inputs.start_year} onChange={handleInputChange} />
						</div>
					</div>
					<div className={"formQuestion"}>
						<p>End Date</p>
						<div className={"singleLineMultiInput"}>
							<input name={"end_day"} className={"createEventMiniInput"} placeholder={"DD"} value={state.inputs.end_day} onChange={handleInputChange} />
							<h6>/</h6>
							<input name={"end_month"} className={"createEventMiniInput"} placeholder={"MM"} value={state.inputs.end_month} onChange={handleInputChange} />
							<h6>/</h6>
							<input name={"end_year"} className={"createEventMiniInput"} placeholder={"YY"} value={state.inputs.end_year} onChange={handleInputChange} />
						</div>
					</div>
					<div className="formQuestion">
						<Select className={"selectComponent"} defaultInputValue={state.inputs.category} name={"category"} onChange={handleSelectChange} options={eventCategories} />
					</div>
					<div className={"formQuestion"}>
						<p>Description</p>
						<textarea name={"description"} className={"questionTextarea createEventTextArea"} value={state.inputs.description} onChange={handleInputChange} />
					</div>
					<p>*All fields are required to continue</p>
					<button onClick={eventCreation} className={`createEventButton ${complete ? "blackButton" : "disabledButton"}`}>Create Event</button>
				</div>
			</div>
	</>
	);
}

export default CreateEvent;