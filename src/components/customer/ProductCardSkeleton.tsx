import { Box, Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductCardSkeleton = () => {
	return (
		<Card>
			<Box
				w={{ base: "100%", md: "320px" }}
				h={{ base: "500px", md: "380px" }}
			>
				<Skeleton w="100%" h="100%" />
			</Box>
			<CardBody py={5} px={3}>
				<SkeletonText noOfLines={3} />
			</CardBody>
		</Card>
	);
};

export default ProductCardSkeleton;
