import { useAppSelector } from "@/app/hooks";
import { AuthImg, Logo } from "@/assets";
import { SignInForm, SignUpForm } from "@/components";
import {
	Container,
	Flex,
	Image,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthPage = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const { user } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const { search } = useLocation();
	const sp = new URLSearchParams(search);

	const redirect = sp.get("redirect") ? `/${sp.get("redirect")}` : "/";

	useEffect(() => {
		if (user) {
			navigate(redirect);
		}
	}, [user, redirect, navigate]);

	return (
		<Flex bg="white" align="center">
			<Image
				src={AuthImg}
				alt="Auth Image"
				w="50%"
				h="100vh"
				objectFit="cover"
				display={{ base: "none", xl: "block" }}
				cursor="pointer"
				onClick={() => navigate("/")}
			/>
			<Container w={{ base: "100%", xl: "50%" }} h="100vh">
				<Flex direction="column" h="100%" justify="center">
					<Image
						src={Logo}
						alt="Logo"
						w={12}
						alignSelf="center"
						cursor="pointer"
						onClick={() => navigate("/")}
					/>
					<Tabs
						variant="solid-rounded"
						colorScheme="blue"
						align="center"
						isFitted
						mt={5}
						onChange={(index) => setTabIndex(index)}
						index={tabIndex}
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
								<SignUpForm setTabIndex={setTabIndex} />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Flex>
			</Container>
		</Flex>
	);
};

export default AuthPage;
