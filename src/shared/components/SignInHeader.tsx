import { Heading, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SignInHeader = () => {
	return (
		<Box>
			<Heading size="lg" letterSpacing={1}>
				Sign in to your account
			</Heading>
			<Text mt={2} letterSpacing={1}>
				Don't have an account?{" "}
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
