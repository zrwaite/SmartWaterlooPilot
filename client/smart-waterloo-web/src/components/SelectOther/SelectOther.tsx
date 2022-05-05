import { ChangeEvent } from "react";
import Select, { ActionMeta } from "react-select";

interface SelectOtherProps {
	data: {select: string, text: string},
	options: { value: string, label: string, isDisabled?: boolean}[],
	handleParentSelectTextChange: (e: ChangeEvent<HTMLInputElement>) => void,
	handleParentSelectChange: (newValue: null | { value: string; label: string; }, actionMeta: ActionMeta<{ value: string, label: string }>) => void,
	name: string
}

const SelectOther = (props: SelectOtherProps) => {
	return (<>
		<Select className={"selectComponent"} defaultInputValue={props.data.select} name={props.name} onChange={props.handleParentSelectChange} options={props.options} />
		{props.data.select==="Other"&&<input name={props.name} placeholder={"Enter new value"} value={props.data.text} onChange={props.handleParentSelectTextChange} />}
	</>);
}

export default SelectOther;