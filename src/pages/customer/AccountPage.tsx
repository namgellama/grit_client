import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RiHistoryFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/features/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
import { MyContainer, MyOrders, Profile } from "../../components";

const AccountPage = () => {
	const navLinks = [
		{ name: "Profile", icon: <CgProfile /> },
		{ name: "Orders", icon: <RiHistoryFill /> },
	];

	const [show, setShow] = useState(navLinks[0].name);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<MyContainer width="7xl">
			<HStack gap={10} align="start">
				<Box as="nav" bg="background.main" position="sticky" p={4}>
					<VStack>
						{navLinks.map((link) => (
							<Button
								leftIcon={link.icon}
								variant="ghost"
								onClick={() => setShow(link.name)}
							>
								{link.name}
							</Button>
						))}
						<Button
							leftIcon={<BiLogOut />}
							variant="ghost"
							onClick={handleLogout}
						>
							Logout
						</Button>
					</VStack>
				</Box>

				{show === "Profile" && <Profile />}

				{show === "Orders" && <MyOrders />}
			</HStack>
		</MyContainer>
	);
};

export default AccountPage;
