import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	width?: string;
	my?: string | number;
}

const MyContainer = ({ children, width = "6xl", my = "4rem" }: Props) => {
	return (
		<Container my={my} maxW={width}>
			{children}
		</Container>
	);
};

export default MyContainer;
