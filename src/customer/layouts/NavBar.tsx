import {
	Box,
	Container,
	HStack,
	IconButton,
	Image,
	Text,
} from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { ReactElement, JSXElementConstructor } from "react";

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
			path: "/products?segment=WOMEN",
		},
	];

	const navIcons = [
		{
			icon: <IoSearch />,
			label: "Search products",
		},
		{
			icon: <FaShoppingBag />,
			label: "Shopping Bag",
		},
		{
			icon: <FaUser />,
			label: "User",
		},
	];

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
							{navIcons.map((navIcon) => (
								<NavIcon
									key={navIcon.label}
									icon={navIcon.icon}
									label={navIcon.label}
								/>
							))}
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
}: {
	label: string;
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
}) => (
	<IconButton
		aria-label={label}
		icon={icon}
		variant="ghost"
		borderRadius="100%"
		_hover={{ background: "inherit" }}
	/>
);
