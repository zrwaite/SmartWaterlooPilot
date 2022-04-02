import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
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
import MyData from "./pages/MyData";
import Events from "./pages/Events";
import Survey from "./pages/Survey";
import CreateEvent from "./pages/CreateEvent";
import CreateSurvey from "./pages/CreateSurvey";
import CreateOrg from "./pages/CreateOrg";
import EventDetails from "./pages/EventDetails";
import Surveys from "./pages/Surveys";
import { useEffect } from 'react';
import "./styles/styles.css";
import {mobileWidth} from "./constants";
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
							<Route path="/dashboard/user" element={<Dashboard org={false} />}></Route>
							<Route path="/dashboard/org" element={<Dashboard org={true} />}></Route>
							<Route path="/qr" element={<ScanQR />}></Route>
							<Route path="/about" element={<About />}></Route>
							<Route path="/shareddata" element={<SharedData />}></Route>
							<Route path="/privacy" element={<Privacy />}></Route>
							<Route path="/login" element={<Login />}></Route>
							{/* <Route path="/loginFromMetamask" element={<OnboardingButton />}></Route> */}
							<Route path="/forgotpassword" element={<ForgotPassword />}></Route>
							<Route path="/signup" element={<SignUp />}></Route>
							<Route path="/test" element={<TestPage />}></Route>
							<Route path="/data" element={<MyData org={false} />}></Route>
							<Route path="/data/org" element={<MyData org={true} />}></Route>
							<Route path="/surveys" element={<Surveys org={false} />}></Route>
							<Route path="/surveys/org" element={<Surveys org={true} />}></Route>
							<Route path="/survey/:id" element={<Survey />}></Route>
							<Route path="/events" element={<Events org={false} />}></Route>
							<Route path="/events/org" element={<Events org={true} />}></Route>
							<Route path="/eventdetails/:name" element={<EventDetails />}></Route>
							<Route path="/createevent" element={<CreateEvent />}></Route>
							<Route path="/createsurvey" element={<CreateSurvey />}></Route>
							<Route path="/createorg" element={<CreateOrg />}></Route>
							<Route path="*" element={<NotFound />}></Route>
						</Routes>
					</Router>
				</MobileContext.Provider>
			</AddressContext.Provider>
		</IdContext.Provider>
	);
}

export default App;
export {MobileContext, AddressContext, IdContext};
