import { Heading, Skeleton } from "@chakra-ui/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ReactNode } from "react";

interface Props {
	isLoading: boolean;
	error: FetchBaseQueryError | SerializedError | undefined;
	children: ReactNode;
}

const MyHeading = ({ isLoading, error, children }: Props) => {
	return (
		<Skeleton isLoaded={!isLoading} width="300px">
			<Heading
				size="lg"
				fontWeight="bold"
				display={error ? "none" : "block"}
			>
				{children}
			</Heading>
		</Skeleton>
	);
};

export default MyHeading;
