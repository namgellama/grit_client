import { Product } from "@/app/interfaces/product";
import { ErrorMessage } from "@/components";
import {
	Badge,
	Box,
	Flex,
	Image,
	Skeleton,
	Text,
	VStack,
} from "@chakra-ui/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Link } from "react-router-dom";

interface Props {
	error: FetchBaseQueryError | SerializedError | undefined;
	products?: Product[];
	isLoading: boolean;
}

const SearchList = ({ error, products, isLoading }: Props) => {
	return (
		<Flex my={10} gap={20} overflowX="scroll" className="scrollbarX" pb={5}>
			{error ? (
				<ErrorMessage>Something went wrong</ErrorMessage>
			) : (
				products?.map((product) => (
					<Skeleton key={product.id} isLoaded={!isLoading}>
						<VStack align="start" w="280px" h="390px" py={2}>
							<Link to={`/products/${product?.id}`}>
								<Box
									_hover={{ transform: "scale(1.01)" }}
									transition={"transform 0.1s ease-out"}
								>
									<Image
										src={product.variants[0].image}
										alt={product?.name}
										w="280px"
										h="330px"
										objectFit="cover"
										transition="opacity 0.2s ease-in-out"
									/>
								</Box>

								<Flex direction="column" gap={0.5} mt={2}>
									<Flex justifyContent="space-between">
										<Text
											fontWeight="semibold"
											letterSpacing={1}
											fontSize="sm"
										>
											{product?.name}
										</Text>
										<Badge
											colorScheme="green"
											fontSize="xxs"
											fontWeight="medium"
											letterSpacing={1}
											textTransform="capitalize"
										>
											{product?.category?.name}
										</Badge>
									</Flex>
									<Text
										fontWeight="semibold"
										fontSize="sm"
										letterSpacing={1}
									>
										Rs. {product?.sellingPrice}
									</Text>
								</Flex>
							</Link>
						</VStack>
					</Skeleton>
				))
			)}
		</Flex>
	);
};

export default SearchList;
