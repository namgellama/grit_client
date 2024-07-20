import { Container, HStack, Image, VStack } from "@chakra-ui/react";
import signUpImg from "../assets/sign-up.jpg";
import { SignUpForm, SignUpHeader } from "../components";

const SignUpPage = () => {
	return (
		<HStack>
			<Image src={signUpImg} w="50%" h="100vh" objectFit="cover" />
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
