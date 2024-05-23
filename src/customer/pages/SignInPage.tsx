import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Image,
	Input,
	VStack,
	Text,
	Box,
} from "@chakra-ui/react";
import logo from "../../assets/hero-img.png";
import { Link } from "react-router-dom";

const SignInPage = () => {
	return (
		<HStack>
			<Image src={logo} w="50%" h="100vh" objectFit="cover" />
			<Container w="50%" centerContent>
				<VStack spacing={8} w="400px" alignItems="start">
					<Box>
						<Heading size="xl">Sign in to your account</Heading>
						<Text mt={2}>
							Don't have and account?{" "}
							<Link to="/register">
								<Text as="span" color="blue" ml={1}>
									Sign up
								</Text>
							</Link>
						</Text>
					</Box>
					<VStack as="form" spacing={7} w="100%">
						<FormControl>
							<FormLabel>Phone Number*</FormLabel>
							<Input
								type="text"
								variant="filled"
								background="white"
								placeholder="Enter your phone number"
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Password*</FormLabel>
							<Input
								type="password"
								variant="filled"
								background="white"
								placeholder="Enter your password"
							/>
						</FormControl>

						<Button
							variant="solid"
							colorScheme="messenger"
							w="full"
						>
							Sign In
						</Button>
					</VStack>
				</VStack>
			</Container>
		</HStack>
	);
};

export default SignInPage;
