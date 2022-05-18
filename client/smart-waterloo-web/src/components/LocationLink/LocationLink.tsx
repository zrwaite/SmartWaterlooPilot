import { isUrl } from "../../modules/other"

interface LocationLinkProps {
	text: string,
	className: string
}

const LocationLink = (props:LocationLinkProps) => {
	const isLink = isUrl(props.text);
	return (<>
		{isLink?
			<a style={{color: "#3FBAFF"}}className={props.className} href={props.text} target="_blank" rel="noreferrer">{props.text}</a>:
			<a className={props.className} href={"https://www.google.com/maps/place/" + props.text} target="_blank" rel="noreferrer">{props.text}</a>
		}
	</>)
}

export default LocationLink