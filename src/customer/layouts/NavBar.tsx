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

const NavBar = () => {
	return (
		<nav>
			<Box bg="white" py={2}>
				<Container maxW="7xl">
					<HStack justify="space-between">
						<HStack spacing={5} flex={1}>
							<Link to="/men">
								<Text fontWeight="semibold">Men</Text>
							</Link>
							<Link to="/women">
								<Text fontWeight="semibold">Women</Text>
							</Link>
							<Link to="/new">
								<Text fontWeight="semibold">New Arrivals</Text>
							</Link>
						</HStack>
						<HStack flex={1} justifyContent="center">
							<Link to="/">
								<Image src={logo} boxSize="40px" />
							</Link>
						</HStack>
						<HStack flex={1} justifyContent="end">
							<IconButton
								aria-label="Search products"
								icon={<IoSearch />}
								variant="ghost"
								borderRadius="100%"
								_hover={{ background: "inherit" }}
							/>
							<IconButton
								aria-label="Search products"
								icon={<FaShoppingBag />}
								variant="ghost"
								borderRadius="100%"
								_hover={{ background: "inherit" }}
							/>
							<IconButton
								aria-label="Search products"
								icon={<FaUser />}
								variant="ghost"
								borderRadius="100%"
								_hover={{ background: "inherit" }}
							/>
						</HStack>
					</HStack>
				</Container>
			</Box>
		</nav>
	);
};

export default NavBar;
