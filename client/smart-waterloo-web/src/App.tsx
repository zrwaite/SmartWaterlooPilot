import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import SplashPage from "./pages/SplashPage/SplashPage";
import ScanQR from "./pages/ScanQR/ScanQR";
import Privacy from "./pages/Privacy/Privacy";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import NotFound from "./pages/NotFound";
import About from "./pages/About/About";
import { useEffect } from 'react';
import "./styles/styles.css";
import {mobileWidth} from "./constants";

function App() {
	function updateSizing() {
		const mobileView = window.innerWidth < mobileWidth;
		const root:HTMLElement|null = document.querySelector(':root');
		if (root) {
			if (mobileView) root.style.setProperty('--bgcolor', '#F8F8F8');
			else root.style.setProperty('--bgcolor', 'white');
		}
	}
	useEffect(() => {
		window.addEventListener("resize", updateSizing);
	});
	return (
		<Router>
			<Routes>
				<Route path="/" element={<SplashPage />}></Route>
				<Route path="/dashboard" element={<Dashboard />}></Route>
				<Route path="/profile" element={<Profile />}></Route>
				<Route path="/qr" element={<ScanQR />}></Route>
				<Route path="/about" element={<About />}></Route>
				<Route path="/privacy" element={<Privacy />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/forgotpassword" element={<ForgotPassword />}></Route>
				<Route path="*" element={<NotFound />}></Route>

			</Routes>
		</Router>
	);
}

export default App;
