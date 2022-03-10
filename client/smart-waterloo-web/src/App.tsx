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
import EventDetails from "./pages/EventDetails";
import Surveys from "./pages/Surveys";
import { useEffect } from 'react';
import "./styles/styles.css";
import {mobileWidth} from "./constants";
import React, {useState} from "react";

interface mobileContextType {
	mobile: boolean;
	setMobile: Function;
}
const defaultMobileContext = {
	mobile: false,
	setMobile: () => {}
}
const MobileContext = React.createContext<mobileContextType>(defaultMobileContext);
function App() {
	const [mobile, setMobile] = useState(false);
	const mobileValue = {mobile, setMobile};
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
		<MobileContext.Provider value={mobileValue}>
			<Router>
				<Routes>
					<Route path="/" element={<SplashPage />}></Route>
					<Route path="/dashboard/*" element={<Dashboard />}></Route>
					<Route path="/qr" element={<ScanQR />}></Route>
					<Route path="/about" element={<About />}></Route>
					<Route path="/shareddata" element={<SharedData />}></Route>
					<Route path="/privacy" element={<Privacy />}></Route>
					<Route path="/login" element={<Login />}></Route>
					{/* <Route path="/loginFromMetamask" element={<OnboardingButton />}></Route> */}
					<Route path="/forgotpassword" element={<ForgotPassword />}></Route>
					<Route path="/signup" element={<SignUp org={false} />}></Route>
					<Route path="/signup/org" element={<SignUp org={true} />}></Route>
					<Route path="/test" element={<TestPage />}></Route>
					<Route path="/data" element={<MyData />}></Route>
					<Route path="/surveys" element={<Surveys />}></Route>
					<Route path="/survey/:id" element={<Survey />}></Route>
					<Route path="/events" element={<Events />}></Route>
					<Route path="/eventdetails/:name" element={<EventDetails />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</Router>
		</MobileContext.Provider>
	);
}

export default App;
export {MobileContext};
