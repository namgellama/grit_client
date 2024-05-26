import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

const MyContainer = ({ children }: { children: ReactNode }) => {
	return (
		<Container my="4rem" maxW="6xl">
			{children}
		</Container>
	);
};

export default MyContainer;
