import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/dashboard" element={<Dashboard />}></Route>
				<Route path="/profile" element={<Profile />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
