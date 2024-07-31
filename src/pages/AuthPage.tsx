import { useAppSelector } from "@/app/hooks";
import { SignInImg } from "@/assets";
import { SignInForm, SignInHeader, SignUpForm } from "@/components";
import {
	Box,
	Container,
	Flex,
	Heading,
	HStack,
	Image,
	Switch,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "@/assets/logo.png";

const AuthPage = () => {
	const { user } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect =
		sp.get("redirect") || user?.role === "Admin" ? "/dashboard/home" : "/";

	useEffect(() => {
		if (user) {
			navigate(redirect);
		}
	}, [user, redirect, navigate]);

	return (
		<Flex bg="white" align="center">
			<Image
				src={SignInImg}
				alt="Sign In / Sign up Image"
				w="50%"
				h="100vh"
				objectFit="cover"
				display={{ base: "none", xl: "block" }}
			/>
			<Container w={{ base: "100%", xl: "50%" }} h="100vh">
				<Flex direction="column" h="100%" justify="center">
					<Image src={Logo} alt="Logo" w={12} alignSelf="center" />
					<Tabs
						variant="solid-rounded"
						colorScheme="blue"
						align="center"
						isFitted
						mt={5}
					>
						<TabList
							bg="lightgray"
							p={1.5}
							borderRadius={30}
							w="80%"
						>
							<Tab
								_selected={{
									bg: "white",
									fontWeight: "bold",
								}}
								textTransform="uppercase"
								fontSize="xs"
								fontWeight="semibold"
							>
								Sign In
							</Tab>
							<Tab
								_selected={{ bg: "white", fontWeight: "bold" }}
								textTransform="uppercase"
								fontSize="xs"
								fontWeight="semibold"
							>
								Sign Up
							</Tab>
						</TabList>

						<TabPanels mt={5}>
							<TabPanel>
								<SignInForm />
							</TabPanel>
							<TabPanel>
								<SignUpForm />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Flex>
			</Container>
		</Flex>
	);
};

export default AuthPage;
