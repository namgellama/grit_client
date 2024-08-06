import { Box, Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const BasicCardSkeleton = ({ noOfLines }: { noOfLines: number }) => {
	return (
		<Card>
			<Box
				w={{ base: "230px", md: "280px" }}
				h={{ base: "300px", md: "330px" }}
			>
				<Skeleton w="100%" h="100%" />
			</Box>
			<CardBody py={5} px={3}>
				<SkeletonText noOfLines={noOfLines} />
			</CardBody>
		</Card>
	);
};

export default BasicCardSkeleton;
