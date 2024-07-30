import { Flex, Heading, Text } from "@chakra-ui/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ReactNode } from "react";

interface Props {
	error: FetchBaseQueryError | SerializedError | undefined;
	children: ReactNode;
	count?: number;
	showCount: boolean;
}

const MyHeading = ({ error, children, count, showCount }: Props) => {
	return (
		<Flex justify={{ base: "center", md: "left" }}>
			<Heading
				fontSize={{ base: "md", md: "lg" }}
				fontWeight="bold"
				display={error ? "none" : "flex"}
				textTransform="uppercase"
				letterSpacing={2}
				alignItems="center"
				gap={3}
			>
				{children}{" "}
				{showCount && (
					<Text as="span" fontSize="small">
						({count} {count !== 1 ? "items" : "item"})
					</Text>
				)}
			</Heading>
		</Flex>
	);
};

export default MyHeading;
