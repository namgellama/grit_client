import { useGetBagItemsQuery } from "@/app/features/bagItem/bagItemApiSlice";
import { CurrentUser } from "@/app/interfaces/auth";
import { Logo } from "@/assets";
import { DBBagItemsDrawer, MobileNavBar, Search } from "@/components";
import {
	NavIcon,
	NavLink,
	NavLinkIcon,
} from "@/components/shared/NavComponents";
import {
	Badge,
	Box,
	Container,
	Flex,
	HStack,
	IconButton,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaShoppingBag, FaUser, FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdDashboard, MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

interface Props {
	user?: CurrentUser | null;
	handleLogout: () => void;
}

const NavBar = ({ user, handleLogout }: Props) => {
	const navLinks = [
		{
			name: "Men",
			path: "/products?segment=Men",
		},
		{
			name: "Women",
			path: "/products?segment=Women",
		},
		{
			name: "Unisex",
			path: "/products?segment=Unisex",
		},
	];

	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef<HTMLButtonElement>(null);
	const { data: dbBagItems } = useGetBagItemsQuery(user?.token ?? "", {
		skip: user === null,
	});
	const [showSearch, setShowSearch] = useState(false);
	const {
		isOpen: isNavBarOpen,
		onOpen: onNavBarOpen,
		onClose: onNavBarClose,
	} = useDisclosure();
	const navigate = useNavigate();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				onNavBarClose();
			}
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [onNavBarClose]);

	return (
		<Box as="nav" position="sticky" top={0} zIndex={5} minW="100%">
			<Box bg="white" py={2} minW="100%">
				<Container maxW="7xl">
					<HStack justify="space-between">
						<Box flex={{ base: 1, md: 0 }}>
							<IconButton
								icon={<AiOutlineMenu />}
								aria-label="Open menu"
								bg="inherit"
								display={{ base: "block", md: "none" }}
								ml={6}
								onClick={onNavBarOpen}
							/>
						</Box>

						<HStack
							spacing={5}
							flex={1}
							display={{ base: "none", md: "flex" }}
						>
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
						<Flex
							flex={1}
							justifyContent="end"
							gap={{ base: 0, md: 1 }}
						>
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
									onClick={() => {
										user ? onOpen() : navigate("/auth");
									}}
								/>

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
								<Menu>
									<MenuButton
										as={IconButton}
										aria-label="User"
										icon={
											<FaUserCircle fontSize="larger" />
										}
										variant="ghost"
										borderRadius="100%"
										_hover={{ background: "inherit" }}
										onClick={() => setShowSearch(false)}
									/>
									<MenuList>
										{user.role === "Admin" ? (
											<MenuItem
												onClick={() =>
													navigate("/dashboard/home")
												}
											>
												<Flex align="center" gap={3}>
													<MdDashboard />
													Dashboard
												</Flex>
											</MenuItem>
										) : (
											<MenuItem
												onClick={() =>
													navigate("/profile")
												}
											>
												<Flex align="center" gap={3}>
													<FaUser />
													Profile
												</Flex>
											</MenuItem>
										)}
										<MenuItem onClick={handleLogout}>
											<Flex align="center" gap={3}>
												<MdLogout />
												Logout
											</Flex>
										</MenuItem>
									</MenuList>
								</Menu>
							) : (
								<NavLinkIcon
									icon={<FaUser />}
									label="User"
									link="/auth"
								/>
							)}
						</Flex>
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
						px={{ base: 5, md: 20 }}
					>
						<Search setShowSearch={setShowSearch} />
					</Box>
				)}

				<DBBagItemsDrawer
					isOpen={isOpen}
					onClose={onClose}
					btnRef={btnRef}
				/>

				<MobileNavBar
					isNavBarOpen={isNavBarOpen}
					onNavBarClose={onNavBarClose}
					navLinks={navLinks}
				/>
			</Box>
		</Box>
	);
};

export default NavBar;
