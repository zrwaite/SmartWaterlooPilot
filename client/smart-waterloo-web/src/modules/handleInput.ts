import { ChangeEvent } from "react";
import { ActionMeta } from "react-select";

const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, state: any, setState: (state:any) => void) => {
	let inputKeys: keyof typeof state.booleanInputs;
	const name = event.target.name as typeof inputKeys;
	let partialInput = { ...state.booleanInputs };
	partialInput[name] = event.target.checked;
	setState({...state, booleanInputs: partialInput});
}

const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, state: any, setState: (state: any) => void) => {
	let inputKeys: keyof typeof state.inputs;
	const name = event.target.name as typeof inputKeys;
	const value = event.target.value;
	if ((name==="height" || name==="weight" || name==="postalCode") && value.length > 3) return;
	let partialInput = { ...state.inputs };
	partialInput[name] = value;
	setState({ ...state, inputs: partialInput });
}

const handleSelectChange = (newValue: null | { value: string; label: string; }, actionMeta: ActionMeta<{ value: string, label: string }>, state: any, setState: (state:any) => void) => {
	let inputKeys: keyof typeof state.selectInputs;
	const name = actionMeta.name as typeof inputKeys;
	let partialInput = { ...state.selectInputs };
	if (newValue?.value==="Other") partialInput[name] = {"select": "Other", "text":"Enter Other Value"};
	else partialInput[name] = {"select": newValue?.value || "", "text":""};
	setState({ ...state, selectInputs: partialInput });
}
const handleSelectTextChange = (event: ChangeEvent<HTMLInputElement>, state: any, setState: (state:any) => void) => {
	let inputKeys: keyof typeof state.selectInputs;
	const name = event.target.name as typeof inputKeys;
	let partialInput = { ...state.selectInputs };
	partialInput[name] = {"select": "Other", "text":event.target.value};
	setState({ ...state, selectInputs: partialInput });
}

export {handleCheckboxChange, handleInputChange, handleSelectChange, handleSelectTextChange}