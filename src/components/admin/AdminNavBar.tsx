import {
	Box,
	Button,
	Center,
	Divider,
	Flex,
	Image,
	VStack,
} from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { RiGiftFill } from "react-icons/ri";
import { TbCategoryFilled } from "react-icons/tb";
import { CurrentUser } from "../../app/interfaces/auth";
import logo from "../../assets/logo.png";
import { NavLinkButton } from "../shared/NavComponents";

interface Props {
	user?: CurrentUser | null;
	handleLogout: () => void;
}

const AdminNavBar = ({ user, handleLogout }: Props) => {
	const navLinks = [
		{
			name: "Home",
			path: "/dashboard",
			icon: <IoHome />,
		},

		{
			name: "Categories",
			path: "/dashboard/categories",
			icon: <TbCategoryFilled />,
		},
		{
			name: "Products",
			path: "/dashboard/products",
			icon: <RiGiftFill />,
		},
		{
			name: "Orders",
			path: "/dashboard/ordersd",
			icon: <FaShoppingBag />,
		},
	];

	return (
		<Box as="nav" bg="white" w="20%" h="100vh">
			<Center py={2}>
				<Image src={logo} alt="Logo" boxSize="40px" />
			</Center>
			<Divider orientation="horizontal" borderColor="background.400" />

			<VStack gap={10} mt={5} px={4}>
				<VStack align="center" w="100%" gap={3}>
					{navLinks.map((link) => (
						<NavLinkButton
							key={link.name}
							name={link.name}
							path={link.path}
							icon={link.icon}
						/>
					))}
				</VStack>

				<Flex
					align="center"
					w="100%"
					transition="all 0.03s ease-in"
					_hover={{ bg: "background.100" }}
					pl={4}
					borderRadius={5}
				>
					<MdLogout fontSize="larger" />
					<Button
						variant="ghost"
						onClick={handleLogout}
						_hover={{ bg: "inherit" }}
					>
						Logout
					</Button>
				</Flex>
			</VStack>
		</Box>
	);
};

export default AdminNavBar;
