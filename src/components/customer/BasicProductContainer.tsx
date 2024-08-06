import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

const BasicProductContainer = ({ children }: { children: ReactNode }) => {
	return (
		<Flex
			my={10}
			gap={{ base: 10, md: 16 }}
			overflowX="scroll"
			className="scrollbarX"
			pb={5}
			h={{ base: "390px", md: "100%" }}
		>
			{children}
		</Flex>
	);
};

export default BasicProductContainer;
