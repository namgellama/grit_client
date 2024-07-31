import { Logo } from "@/assets";
import { NavLinkButton } from "@/components/shared/NavComponents";
import {
	Box,
	Button,
	Divider,
	Flex,
	HStack,
	IconButton,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { FaShoppingBag } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { RiGiftFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { TbCategoryFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

interface Props {
	showAdminNavBar: boolean;
	setShowAdminNavBar: React.Dispatch<React.SetStateAction<boolean>>;
	handleLogout: () => void;
}

const AdminNavBar = ({
	handleLogout,
	showAdminNavBar,
	setShowAdminNavBar,
}: Props) => {
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
					<IconButton
						icon={<RxCross1 />}
						aria-label="Close"
						bg="inherit"
						display={{ base: "block", xl: "none" }}
						onClick={() => setShowAdminNavBar(false)}
					/>
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

			{showAdminNavBar ? (
				<Box
					as="nav"
					w="100%"
					bg="white"
					h="100vh"
					position="sticky"
					top={0}
					display={{ base: "block", xl: "none" }}
				>
					<HStack py={2} px={5} justify="space-between">
						<Flex align="center" gap={4}>
							<Image src={Logo} alt="Logo" boxSize="24px" />
							<Text fontWeight="medium" fontSize="small">
								Welcome Admin!
							</Text>
						</Flex>
						<IconButton
							icon={<RxCross1 />}
							aria-label="Close"
							bg="inherit"
							display={{ base: "block", xl: "none" }}
							onClick={() => setShowAdminNavBar(false)}
						/>
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
			) : (
				<IconButton
					icon={<AiOutlineMenu />}
					aria-label="Open menu"
					bg="inherit"
					display={{ base: "block", xl: "none" }}
					ml={6}
					onClick={() => setShowAdminNavBar(true)}
				/>
			)}
		</>
	);
};

const ButtonLink = ({
	icon,
	text,
	action,
}: {
	icon: ReactNode;
	text: string;
	action: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => (
	<Flex
		align="center"
		transition="all 0.03s ease-in"
		_hover={{ bg: "background.100" }}
		pl={4}
		borderRadius={5}
	>
		{icon}
		<Button
			variant="ghost"
			onClick={action}
			_hover={{ bg: "inherit" }}
			fontSize="small"
		>
			{text}
		</Button>
	</Flex>
);

export default AdminNavBar;
