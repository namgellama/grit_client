import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "./app/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { NavBar } from "./components";

function App() {
	const { user } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<>
			<NavBar user={user} handleLogout={handleLogout} />
			<main>
				<Outlet />
			</main>
		</>
	);
}

export default App;
