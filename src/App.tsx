import { Outlet } from "react-router-dom";
import { NavBar } from "./components";

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
