import { Container, HStack, Image, VStack } from "@chakra-ui/react";
import logo from "../../assets/hero-img.png";
import SignUpForm from "../components/SignUpForm";
import SignUpHeader from "../components/SignUpHeader";

const SignUpPage = () => {
	return (
		<HStack>
			<Image src={logo} w="50%" h="100vh" objectFit="cover" />
			<Container w="50%" centerContent>
				<VStack spacing={8} w="400px" alignItems="start">
					<SignUpHeader />
					<SignUpForm />
				</VStack>
			</Container>
		</HStack>
	);
};

export default SignUpPage;
