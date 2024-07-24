import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SignUpHeader = () => {
	return (
		<Box>
			<Heading size="lg" letterSpacing={1}>
				Create an account
			</Heading>
			<Text mt={2} letterSpacing={1}>
				Already have an account?{" "}
				<Link to="/login">
					<Text as="span" color="blue" ml={1}>
						Sign in
					</Text>
				</Link>
			</Text>
		</Box>
	);
};

export default SignUpHeader;
