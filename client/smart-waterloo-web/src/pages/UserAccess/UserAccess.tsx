import Navbar from "../../components/Navbar";
import "./UserAccess.css";
import {useContext} from "react";
import {MobileContext} from "../../App";
import { AccountChildProps } from "../AccountParent";
const UserData = (props:AccountChildProps) => {
	let {mobile} = useContext(MobileContext);

	/*
	avatar_string varchar(100),
	*/
	return (
		<>
			<Navbar root={false}/>
			<div className={"PageContainer"}>
				<div className={mobile? "":"DesktopPanel"}>
					{mobile?<h6>Who has Access to Your Data?</h6>:<h4 className={"UserDataHeader"}>Who has Access to Your Data?</h4>}
					<p>The following organizations have anonymously seen your data through surveys and programs:</p>
					<ul>
						{props.accountData.account.orgs.map((org, i) => {
								return (<li key={i}>{org}</li>)
						})}
					</ul>
				</div>
			</div>	
		</>
	);
}

export default UserData;