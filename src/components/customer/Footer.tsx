import { Flex, Text } from "@chakra-ui/react";
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
			justify="center"
		>
			<Text fontSize="sm" textAlign="center" w="100%">
				&copy; {currentYear} | Grit | Relentless drive to achieve | All
				Rights Reserved
			</Text>
			<Text justifySelf="end">
				<Link to="https://www.instagram.com/grit_np" target="_blank">
					<AiFillInstagram fontSize="25px" />
				</Link>
			</Text>
		</Flex>
	);
};

export default Footer;
