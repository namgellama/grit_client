import { useGetBagItemsQuery } from "@/app/features/bagItem/bagItemApiSlice";
import { CurrentUser } from "@/app/interfaces/auth";
import { Logo } from "@/assets";
import { CookieBagItemsDrawer, DBBagItemsDrawer, Search } from "@/components";
import {
	NavIcon,
	NavLink,
	NavLinkIcon,
} from "@/components/shared/NavComponents";
import { BagItem } from "@/interfaces";
import {
	Badge,
	Box,
	Container,
	Flex,
	HStack,
	Image,
	useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { FaShoppingBag, FaUser, FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

interface Props {
	user?: CurrentUser | null;
	handleLogout: () => void;
}

const NavBar = ({ user, handleLogout }: Props) => {
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
			name: "Unisex",
			path: "/products?segment=UNISEX",
		},
	];

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
	const [showSearch, setShowSearch] = useState(false);

	return (
		<Box as="nav" position="sticky" top={0} zIndex={5} minW="100%">
			<Box bg="white" py={2} minW="100%">
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
								<Image src={Logo} boxSize="40px" />
							</Link>
						</HStack>
						<HStack flex={1} justifyContent="end">
							<NavIcon
								icon={<IoSearch />}
								label="Search products"
								onClick={() => setShowSearch(!showSearch)}
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
							{user && user.role === "Customer" ? (
								<NavLinkIcon
									icon={<FaUserCircle fontSize="larger" />}
									label="User"
									link="/account"
								/>
							) : user && user.role === "Admin" ? (
								<NavLinkIcon
									icon={<FaUserCircle fontSize="larger" />}
									label="User"
									link="/dashboard/home"
								/>
							) : (
								<NavLinkIcon
									icon={<FaUser />}
									label="User"
									link="/login"
								/>
							)}

							{user && (
								<NavIcon
									icon={<MdLogout fontSize="larger" />}
									label="Logout"
									onClick={handleLogout}
								/>
							)}
						</HStack>
					</HStack>
				</Container>

				{showSearch && (
					<Box
						bg="white"
						position="absolute"
						top="100%"
						left={0}
						right={0}
						zIndex={4}
						px={20}
					>
						<Search setShowSearch={setShowSearch} />
					</Box>
				)}

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
		</Box>
	);
};

export default NavBar;
