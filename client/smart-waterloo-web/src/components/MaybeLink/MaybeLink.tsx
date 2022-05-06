import { isUrl } from "../../modules/other"

interface MaybeLinkProps {
	text: string,
	className: string
}

const MaybeLink = (props:MaybeLinkProps) => {
	const isLink = isUrl(props.text);
	console.log(isLink);
	return (<>
		{isLink?
			<a className={props.className} href={props.text} target="_blank" rel="noreferrer">{props.text}</a>:
			<p className={props.className}>{props.text}</p>
		}
	</>)
}

export default MaybeLink