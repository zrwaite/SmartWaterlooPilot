import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import ScanQR from "./pages/ScanQR";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import TestPage from "./pages/TestPage";
// import OnboardingButton from "./components/Navbar/authentication/metmaskauth";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import SharedData from "./pages/SharedData";
import Survey from "./pages/Survey";
import CreateEvent from "./pages/CreateEvent";
import CreateSurvey from "./pages/CreateSurvey";
import CreateOrg from "./pages/CreateOrg";
import EventDetails from "./pages/EventDetails";
import { useEffect } from 'react';
import "./styles/styles.css";
import {mobileWidth} from "./constants";
import AccountParent from "./pages/AccountParent";
import React, {useState} from "react";


const MobileContext = React.createContext<{mobile: boolean; setMobile: Function;}>({
	mobile: false,
	setMobile: () => {}
});
const AddressContext = React.createContext<{address: string; setAddress: Function;}>({
	address: "",
	setAddress: () => {}
});
const IdContext = React.createContext<{id: string; setId: Function;}>({
	id: "",
	setId: () => {}
});
function App() {
	const [mobile, setMobile] = useState(false);
	const [address, setAddress] = useState("");
	const [id, setId] = useState("");
	const mobileValue = {mobile, setMobile};
	const addressValue = {address, setAddress};
	const idValue = {id, setId};
	function updateSizing() {
		const root:HTMLElement|null = document.querySelector(':root');
		if (root) {
			if (window.innerWidth < mobileWidth) {
				root.style.setProperty('--bgcolor', '#F8F8F8');
				root.style.setProperty('--defaultTextAlign', 'left');
				setMobile(true);
			} else {
				setMobile(false);
				root.style.setProperty('--bgcolor', 'white');
				root.style.setProperty('--defaultTextAlign', 'center')
			}
		}
	}
	useEffect(() => {
		window.addEventListener("resize", updateSizing);
		updateSizing();
	});
	return (
		<IdContext.Provider value={idValue}>
			<AddressContext.Provider value={addressValue}>
				<MobileContext.Provider value={mobileValue}>
					<Router>
						<Routes>
							<Route path="/" element={<SplashPage />}></Route>
							<Route path="/qr" element={<ScanQR />}></Route>

							<Route path="/about" element={<About />}></Route>
							<Route path="/shareddata" element={<SharedData />}></Route>
							<Route path="/privacy" element={<Privacy />}></Route>
							<Route path="/forgotpassword" element={<ForgotPassword />}></Route>
							
							<Route path="/signup" element={<SignUp />}></Route>
							<Route path="/login" element={<Login />}></Route>
							<Route path="/createorg" element={<CreateOrg />}></Route>

							<Route path="/dashboard/user" element={<AccountParent page={"dashboard"} org={false} />}></Route>
							<Route path="/data/user" element={<AccountParent page={"data"} org={false} />}></Route>
							<Route path="/surveys/user" element={<AccountParent page={"surveys"} org={false} />}></Route>
							<Route path="/events/user" element={<AccountParent page={"events"} org={false} />}></Route>

							<Route path="/dashboard/org/:orgId" element={<AccountParent page={"dashboard"} org={true} />}></Route>
							<Route path="/data/org/:orgId" element={<AccountParent page={"data"} org={true} />}></Route>
							<Route path="/surveys/org/:orgId" element={<AccountParent page={"surveys"} org={true} />}></Route>
							<Route path="/events/org/:orgId" element={<AccountParent page={"events"} org={true} />}></Route>

							<Route path="/survey/:id/user" element={<Survey org={false} />}></Route>
							<Route path="/survey/:id/org/:orgId" element={<Survey org={true} />}></Route>
							<Route path="/eventdetails/:id/user" element={<EventDetails org={false} />}></Route>
							<Route path="/eventdetails/:id/org/:orgId" element={<EventDetails org={true} />}></Route>

							<Route path="/createevent/:orgId" element={<CreateEvent />}></Route>
							<Route path="/createsurvey/:orgId" element={<CreateSurvey />}></Route>

							<Route path="/test" element={<TestPage />}></Route>
							<Route path="*" element={<NotFound />}></Route>
							{/* <Route path="/loginFromMetamask" element={<OnboardingButton />}></Route> */}
						</Routes>
					</Router>
				</MobileContext.Provider>
			</AddressContext.Provider>
		</IdContext.Provider>
	);
}

export default App;
export {MobileContext, AddressContext, IdContext};
