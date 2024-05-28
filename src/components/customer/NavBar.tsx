import {
	Badge,
	Box,
	Button,
	Container,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	HStack,
	IconButton,
	Image,
	Input,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { JSXElementConstructor, ReactElement, useRef } from "react";
import { useCookies } from "react-cookie";
import { FaShoppingBag } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import logo from "../../assets/logo.png";

const NavBar = () => {
	const navLinks = [
		{
			name: "Men",
			path: "/products?segment=MEN",
		},

		{
			name: "Women",
			path: "/products?segment=WOMEN",
		},
		{
			name: "New Arrivals",
			path: "/products?ageStatus=New",
		},
	];

	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [cookies] = useCookies(["bagItems"]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef<HTMLButtonElement>(null);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<nav>
			<Box bg="white" py={2}>
				<Container maxW="7xl">
					<HStack justify="space-between">
						<HStack spacing={5} flex={1}>
							{navLinks.map((link) => (
								<NavLink
									key={link.name}
									path={link.path}
									name={link.name}
								/>
							))}
						</HStack>
						<HStack flex={1} justifyContent="center">
							<Link to="/">
								<Image src={logo} boxSize="40px" />
							</Link>
						</HStack>
						<HStack flex={1} justifyContent="end">
							<NavIcon
								icon={<IoSearch />}
								label="Search products"
								onClick={() => console.log("hello")}
							/>
							<Flex position="relative">
								<IconButton
									ref={btnRef}
									aria-label="Shopping Bag"
									icon={<FaShoppingBag />}
									variant="ghost"
									borderRadius="100%"
									_hover={{ background: "inherit" }}
									onClick={onOpen}
								/>
								{/* <NavIcon
									icon={}
									label="Shopping Bag"
									onClick={onClose}
								/> */}
								<Badge
									position="absolute"
									bottom={4}
									left={6}
									borderRadius={50}
									bg="gold"
									fontSize="xx-small"
									as="span"
								>
									{cookies.bagItems.length}
								</Badge>
							</Flex>
							<NavLinkIcon
								icon={<FaUser />}
								label="User"
								link="/login"
							/>
							{user && (
								<NavIcon
									label="Logout"
									icon={<MdLogout />}
									onClick={handleLogout}
								/>
							)}
						</HStack>
					</HStack>
				</Container>
				<Drawer
					isOpen={isOpen}
					placement="right"
					onClose={onClose}
					finalFocusRef={btnRef}
					size="sm"
				>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>Create your account</DrawerHeader>

						<DrawerBody>
							<Input placeholder="Type here..." />
						</DrawerBody>

						<DrawerFooter>
							<Button variant="outline" mr={3} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme="blue">Save</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</Box>
		</nav>
	);
};

export default NavBar;

const NavLink = ({ path, name }: { path: string; name: string }) => (
	<Link to={path}>
		<Text fontWeight="semibold" fontSize="small" letterSpacing={1}>
			{name}
		</Text>
	</Link>
);

const NavIcon = ({
	label,
	icon,
	onClick,
}: {
	label: string;
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
	onClick: any;
}) => {
	return (
		<IconButton
			aria-label={label}
			icon={icon}
			variant="ghost"
			borderRadius="100%"
			_hover={{ background: "inherit" }}
			onClick={onClick}
		/>
	);
};

const NavLinkIcon = ({
	label,
	icon,
	link,
}: {
	label: string;
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
	link: string;
}) => {
	const navigate = useNavigate();

	return (
		<IconButton
			aria-label={label}
			icon={icon}
			variant="ghost"
			borderRadius="100%"
			_hover={{ background: "inherit" }}
			onClick={() => navigate(link)}
		/>
	);
};
