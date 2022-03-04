import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext } from "../../App";
import {useContext} from "react";
const Surveys = () => {
	const {mobile} = useContext(MobileContext);
	return (
		<>
			<Navbar root={true}/>
			<div className={mobile?"":"asideContainer"}>
				{mobile?null:<Sidebar page="surveys"/>}
				<div className={"besideAside"}>
					<div className={mobile? "":"DesktopPanel"}>
						<p>Surveys surveys surveys surveys surveys surveys surveys surveys surveys </p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Surveys;