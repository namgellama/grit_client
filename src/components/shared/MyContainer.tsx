import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	width?: string;
}

const MyContainer = ({ children, width = "6xl" }: Props) => {
	return (
		<Container my="4rem" maxW={width}>
			{children}
		</Container>
	);
};

export default MyContainer;
