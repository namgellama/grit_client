import { Container, HStack, Image, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import logo from "../../assets/hero-img.png";
import SignInForm from "../components/SignInForm";
import SignInHeader from "../components/SignInHeader";

const SignInPage = () => {
	const { userInfo } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const { search } = useLocation();
	const sp = new URLSearchParams(search);
	const redirect = sp.get("redirect") || "/";

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

	return (
		<HStack>
			<Image src={logo} w="50%" h="100vh" objectFit="cover" />
			<Container w="50%" centerContent>
				<VStack spacing={8} w="400px" alignItems="start">
					<SignInHeader />
					<SignInForm />
				</VStack>
			</Container>
		</HStack>
	);
};

export default SignInPage;
