import {
	Avatar,
	Box,
	Card,
	CardBody,
	Flex,
	Heading,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MyContainer, MyOrders } from "../../components";

const AccountPage = () => {
	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<MyContainer width="7xl">
			<Heading
				textTransform="uppercase"
				fontSize="x-large"
				textAlign="center"
			>
				My Account
			</Heading>
			<Flex my={10} gap={7}>
				<Box flex={1}>
					<Card>
						<CardBody>
							<VStack align="start">
								<Avatar name={user?.name} src="" />
								<Text>{user?.name}</Text>
								<Text>{user?.email}</Text>
								<Text>{user?.phoneNumber}</Text>
								<Text onClick={handleLogout}>Logout</Text>
							</VStack>
						</CardBody>
					</Card>
				</Box>
				<Box flex={3}>
					<Text
						textTransform="uppercase"
						fontWeight="bold"
						ml={2}
						mb={3}
					>
						My Orders
					</Text>
					<MyOrders />
				</Box>
			</Flex>
		</MyContainer>
	);
};

export default AccountPage;
