import { Box } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "./app/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { AdminNavBar, NavBar } from "./components";
import Footer from "./components/customer/Footer";
import { CurrentUser } from "./app/interfaces/auth";

function App() {
	const user: CurrentUser | null | undefined = useAppSelector(
		(state) => state.auth.user
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<Box
			w="100%"
			display={
				location.pathname.startsWith("/dashboard") ? "flex" : "block"
			}
		>
			{location.pathname.startsWith("/dashboard") ? (
				<AdminNavBar handleLogout={handleLogout} />
			) : (
				<NavBar user={user} handleLogout={handleLogout} />
			)}

			<Box
				as="main"
				w={location.pathname.startsWith("/dashboard") ? "80%" : "100%"}
			>
				<Outlet />
			</Box>

			{!location.pathname.startsWith("/dashboard") && <Footer />}
		</Box>
	);
}

export default App;
