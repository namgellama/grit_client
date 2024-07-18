import {
	Badge,
	Box,
	Container,
	Flex,
	HStack,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import {
	CookieBagItemsDrawer,
	DBBagItemsDrawer,
	ProductCard,
	ProductList,
} from "..";
import { useGetBagItemsQuery } from "../../app/features/bagItem/bagItemApiSlice";
import { CurrentUser } from "../../app/interfaces/auth";
import logo from "../../assets/logo.png";
import { BagItem } from "../../interfaces";
import { NavIcon, NavLink, NavLinkIcon } from "../shared/NavComponents";
import { RxCross2 } from "react-icons/rx";
import { useGetProductsQuery } from "../../app/features/product/productApiSlice";
import { useGetSearchProductsQuery } from "../../app/features/search/searchApiSlice";

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
			name: "New Arrivals",
			path: "/products?ageStatus=New",
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
	const [search, setSearch] = useState<string | undefined>(undefined);

	const {
		data: searchProducts,
		isLoading,
		error,
	} = useGetSearchProductsQuery({
		name: search,
	});

	return (
		<Box as="nav" position="sticky" top={0} zIndex={5}>
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
							{user ? (
								<NavLinkIcon
									icon={<FaUserCircle fontSize="larger" />}
									label="User"
									link="/account"
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

					{showSearch && (
						<InputGroup bg="#F5F5F5" mt={4} mb={1}>
							<InputLeftElement pointerEvents="none">
								<IoSearch color="gray.300" />
							</InputLeftElement>
							<Input
								type="text"
								placeholder="Search..."
								variant="flushed"
								onChange={(e) => setSearch(e.target.value)}
							/>

							<InputRightElement
								cursor="pointer"
								onClick={() => {
									setShowSearch(false);
									setSearch(undefined);
								}}
							>
								<RxCross2 color="gray.300" />
							</InputRightElement>
						</InputGroup>
					)}

					{searchProducts?.length! > 0 && (
						<Box
							onClick={() => {
								setShowSearch(false);
								setSearch(undefined);
							}}
						>
							<ProductList
								error={error}
								products={searchProducts}
								isLoading={isLoading}
							/>
						</Box>
					)}
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
		</Box>
	);
};

export default NavBar;
