import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { MobileContext } from "../../App";
import {useContext} from "react";
const MyData = () => {
	const {mobile} = useContext(MobileContext);
	return (
		<>
			<Navbar root={true}/>
			<div className={mobile?"":"asideContainer"}>
				{mobile?null:<Sidebar page="data"/>}
				<div className={"besideAside"}>
					<div className={mobile? "":"DesktopPanel"}>
						<p>Data data data data data data data data data </p>
					</div>
				</div>
			</div>
		</>
	)
}

export default MyData;