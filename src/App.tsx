import { Outlet } from "react-router-dom";
import NavBar from "./customer/layouts/NavBar";

function App() {
	return (
		<>
			<NavBar />
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default App;
