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
			<Box bg="white">
				<Container maxW="7xl">
					<HStack justify="space-between">
						<HStack spacing={8}>
							<Link to="/men">
								<Text fontWeight="semibold">Men</Text>
							</Link>
							<Link to="/women">
								<Text fontWeight="semibold">Women</Text>
							</Link>
							<Link to="/unisex">
								<Text fontWeight="semibold">Unisex</Text>
							</Link>
						</HStack>
						<Image src={logo} boxSize="60px" />
						<HStack>
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
