import { Flex, Text } from "@chakra-ui/react";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<Flex
			as="footer"
			bg="white"
			py={5}
			px={10}
			justify="space-between"
			align="center"
		>
			<Text fontSize="sm">
				&copy; {currentYear} | Grit | Relentless drive to achieve | All
				Rights Reserved
			</Text>
			<Link to="https://www.instagram.com/grit_np" target="_blank">
				<AiFillInstagram fontSize="20px" />
			</Link>
		</Flex>
	);
};

export default Footer;
