import { Heading, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SignInHeader = () => {
	return (
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
	);
};

export default SignInHeader;
