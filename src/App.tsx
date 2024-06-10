import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "./app/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { AdminNavBar, NavBar } from "./components";

function App() {
	const { user } = useAppSelector((state) => state.auth);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (
			user?.role === "Admin" &&
			!location.pathname.startsWith("/dashboard")
		)
			navigate("/dashboard");
	}, [user, navigate, location]);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<Box display={user?.role === "Customer" ? "block" : "flex"}>
			{user?.role == "Customer" && (
				<NavBar user={user} handleLogout={handleLogout} />
			)}
			{user?.role == "Admin" && (
				<AdminNavBar user={user} handleLogout={handleLogout} />
			)}

			<main>
				<Outlet />
			</main>
		</Box>
	);
}

export default App;
