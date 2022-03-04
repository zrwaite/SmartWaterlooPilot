import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext } from "../../App";
import {useContext} from "react";
const Events = () => {
	const {mobile} = useContext(MobileContext);
	return (
		<>
			<Navbar root={true}/>
			<div className={mobile?"":"asideContainer"}>
				{mobile?null:<Sidebar page="events"/>}
				<div className={"besideAside"}>
					<div className={mobile? "":"DesktopPanel"}>
						<p>Events events events events events events events events events </p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Events;