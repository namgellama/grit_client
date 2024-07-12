import {
	Box,
	Button,
	Divider,
	Flex,
	HStack,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { RiGiftFill } from "react-icons/ri";
import { TbCategoryFilled } from "react-icons/tb";
import logo from "../../assets/logo.png";
import { NavLinkButton } from "../shared/NavComponents";

interface Props {
	handleLogout: () => void;
}

const AdminNavBar = ({ handleLogout }: Props) => {
	const navLinks = [
		{
			name: "Home",
			path: "/dashboard/home",
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
			path: "/dashboard/orders",
			icon: <FaShoppingBag />,
		},
	];

	return (
		<Box as="nav" w="16%" bg="white" h="100vh" position="sticky" top={0}>
			<HStack py={2} px={5} gap={4}>
				<Image src={logo} alt="Logo" boxSize="24px" />
				<Text fontWeight="medium" fontSize="small">
					Welcome Admin!
				</Text>
			</HStack>
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
					<MdLogout fontSize="large" />
					<Button
						variant="ghost"
						onClick={handleLogout}
						_hover={{ bg: "inherit" }}
						fontSize="small"
					>
						Logout
					</Button>
				</Flex>
			</VStack>
		</Box>
	);
};

export default AdminNavBar;
