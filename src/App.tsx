import { logout } from "@/app/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { AdminNavBar, NavBar } from "@/components";
import Footer from "@/components/customer/Footer";
import { Flex } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function App() {
	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<Flex
			w="100%"
			minH="100vh"
			flexDirection={
				location.pathname.startsWith("/dashboard") ? "row" : "column"
			}
		>
			{location.pathname.startsWith("/dashboard") ? (
				<AdminNavBar handleLogout={handleLogout} />
			) : (
				<NavBar user={user} handleLogout={handleLogout} />
			)}

			<Flex
				as="main"
				flex="1"
				flexDirection="column"
				w={location.pathname.startsWith("/dashboard") ? "80%" : "100%"}
			>
				<Outlet />
			</Flex>

			{!location.pathname.startsWith("/dashboard") && <Footer />}
		</Flex>
	);
}

export default App;
