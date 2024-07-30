import { Box, Flex, Text } from "@chakra-ui/react";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<Flex
			as="footer"
			bg="white"
			py={6}
			px={10}
			align="center"
			justify="space-between"
			direction={{ base: "column", md: "row" }}
			gap={{ base: 2, md: 0 }}
		>
			<Box w="100%">
				<Text fontSize="sm" textAlign="center">
					&copy; {currentYear} | Grit | Relentless drive to achieve
				</Text>
				<Text fontSize="sm" textAlign="center">
					All Rights Reserved
				</Text>
			</Box>
			<Text justifySelf="end">
				<Link to="https://www.instagram.com/grit_np" target="_blank">
					<AiFillInstagram fontSize="25px" />
				</Link>
			</Text>
		</Flex>
	);
};

export default Footer;
