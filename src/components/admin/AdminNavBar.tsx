import { Logo } from "@/assets";
import { MobileAdminNavBar } from "@/components";
import { ButtonLink, NavLinkButton } from "@/components/shared/NavComponents";
import {
	Box,
	Divider,
	Flex,
	HStack,
	IconButton,
	Image,
	Text,
	useDisclosure,
	VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { FaShoppingBag } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { RiGiftFill } from "react-icons/ri";
import { TbCategoryFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

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

	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure();
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				onClose();
			}
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [onClose]);

	return (
		<>
			<Box
				as="nav"
				w="16%"
				bg="white"
				h="100vh"
				position="sticky"
				top={0}
				display={{ base: "none", xl: "block" }}
			>
				<HStack py={2} px={5} justify="space-between">
					<Flex align="center" gap={4}>
						<Image src={Logo} alt="Logo" boxSize="24px" />
						<Text fontWeight="medium" fontSize="small">
							Welcome Admin!
						</Text>
					</Flex>
				</HStack>
				<Divider
					orientation="horizontal"
					borderColor="background.400"
				/>

				<VStack gap={10} mt={5} px={4}>
					<VStack align="center" w="100%" gap={3}>
						{navLinks.map((link) => (
							<NavLinkButton
								key={link.name}
								name={link.name}
								path={link.path}
								icon={link.icon}
								onClose={onClose}
							/>
						))}
					</VStack>

					<Flex direction="column" w="100%" gap={1}>
						<ButtonLink
							icon={<CgWebsite />}
							text="Go to Website"
							action={() => navigate("/")}
						/>
						<ButtonLink
							icon={<MdLogout />}
							text="Logout"
							action={handleLogout}
						/>
					</Flex>
				</VStack>
			</Box>

			<IconButton
				icon={<AiOutlineMenu />}
				aria-label="Open menu"
				bg="inherit"
				display={{ base: "block", xl: "none" }}
				ml={6}
				onClick={onOpen}
			/>

			<MobileAdminNavBar
				isOpen={isOpen}
				onClose={onClose}
				navLinks={navLinks}
				handleLogout={handleLogout}
			/>
		</>
	);
};

export default AdminNavBar;
