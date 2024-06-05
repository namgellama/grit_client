import {
	Badge,
	Box,
	Container,
	Flex,
	HStack,
	IconButton,
	Image,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { JSXElementConstructor, LegacyRef, ReactElement, useRef } from "react";
import { useCookies } from "react-cookie";
import { FaShoppingBag } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { CookieBagItemsDrawer, DBBagItemsDrawer } from "..";
import { logout } from "../../app/features/auth/authSlice";
import { useGetBagItemsQuery } from "../../app/features/bagItem/bagItemApiSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import logo from "../../assets/logo.png";
import { BagItem } from "../../interfaces";

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
	const [cookies] = useCookies<
		"bagItems",
		{
			bagItems?: BagItem[];
		}
	>(["bagItems"]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef<HTMLButtonElement>(null);
	const { data: dbBagItems } = useGetBagItemsQuery(user?.token ?? "", {
		skip: user === null,
	});

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
								<NavIcon
									reference={btnRef}
									icon={<FaShoppingBag />}
									label="Shopping Bag"
									onClick={onOpen}
								/>

								{cookies.bagItems?.length && (
									<Badge
										position="absolute"
										bottom={4}
										left={6}
										borderRadius={50}
										bg="gold"
										fontSize="xx-small"
										as="span"
									>
										{cookies.bagItems?.length}
									</Badge>
								)}

								{dbBagItems?.length! > 0 && (
									<Badge
										position="absolute"
										bottom={4}
										left={6}
										borderRadius={50}
										bg="gold"
										fontSize="xx-small"
										as="span"
									>
										{dbBagItems?.length}
									</Badge>
								)}
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
				{user ? (
					<DBBagItemsDrawer
						isOpen={isOpen}
						onClose={onClose}
						btnRef={btnRef}
					/>
				) : (
					<CookieBagItemsDrawer
						isOpen={isOpen}
						onClose={onClose}
						btnRef={btnRef}
					/>
				)}
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
	reference,
	label,
	icon,
	onClick,
}: {
	reference?: LegacyRef<HTMLButtonElement>;
	label: string;
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
	onClick: any;
}) => {
	return (
		<IconButton
			ref={reference}
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
