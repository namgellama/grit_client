import { Heading, Skeleton } from "@chakra-ui/react";
import { SerializedError } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { Error } from "../../app/apiSlice";

interface Props {
	isLoading: boolean;
	error: Error | SerializedError | undefined;
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
