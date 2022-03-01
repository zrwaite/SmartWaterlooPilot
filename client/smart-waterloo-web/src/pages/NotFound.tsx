import Navbar from "../components/Navbar";
// import {Link} from "react-router-dom";
//Todo change buttons to links
function NotFound() {
    return (
		<>
			<Navbar root={true}/>
			<h1>404 page not found</h1>
		</>
    );
}

export default NotFound;