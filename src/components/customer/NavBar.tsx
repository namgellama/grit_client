import {
	Badge,
	Box,
	Container,
	Flex,
	HStack,
	IconButton,
	Image,
	Text,
} from "@chakra-ui/react";
import { JSXElementConstructor, ReactElement } from "react";
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
								link=""
							/>
							<Flex position="relative">
								{/* <FaShoppingBag /> */}
								<NavIcon
									icon={<FaShoppingBag />}
									label="Shopping Bag"
									link=""
								/>
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
							<NavIcon
								icon={<FaUser />}
								label="User"
								link="/login"
							/>
							{user && (
								<IconButton
									aria-label="Logout"
									icon={<MdLogout />}
									variant="ghost"
									borderRadius="100%"
									_hover={{ background: "inherit" }}
									onClick={handleLogout}
								/>
							)}
						</HStack>
					</HStack>
				</Container>
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
