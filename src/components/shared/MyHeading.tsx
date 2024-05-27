import { Heading, Skeleton, Text } from "@chakra-ui/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ReactNode } from "react";

interface Props {
	isLoading: boolean;
	error: FetchBaseQueryError | SerializedError | undefined;
	children: ReactNode;
	count?: number;
	showCount: boolean;
}

const MyHeading = ({ isLoading, error, children, count, showCount }: Props) => {
	return (
		<Skeleton isLoaded={!isLoading} width="400px">
			<Heading
				size="lg"
				textAlign="left"
				fontWeight="bold"
				display={error ? "none" : "flex"}
				textTransform="uppercase"
				letterSpacing={2}
				alignItems="center"
				gap={5}
			>
				{children}{" "}
				{showCount && (
					<Text as="span" fontSize="small">
						({count} {count !== 1 ? "items" : "item"})
					</Text>
				)}
			</Heading>
		</Skeleton>
	);
};

export default MyHeading;