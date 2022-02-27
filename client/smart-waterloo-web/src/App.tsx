import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile/Profile";
import SplashPage from "./pages/SplashPage";
import NotFound from "./pages/NotFound";

import "./styles/styles.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<SplashPage />}></Route>
				<Route path="/dashboard" element={<Dashboard />}></Route>
				<Route path="/profile" element={<Profile />}></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
