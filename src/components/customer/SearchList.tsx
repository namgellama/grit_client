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
		<Flex
			my={10}
			gap={{ base: 10, md: 16 }}
			justify="space-between"
			overflowX="scroll"
			className="scrollbarX"
			pb={5}
			h={{ base: "390px", md: "100%" }}
		>
			{error ? (
				<ErrorMessage>Something went wrong</ErrorMessage>
			) : (
				products?.map((product) => (
					<Skeleton key={product.id} isLoaded={!isLoading}>
						<VStack align="start" py={2}>
							<Link to={`/products/${product?.id}`}>
								<Box
									_hover={{ transform: "scale(1.01)" }}
									transition={"transform 0.1s ease-out"}
									w={{ base: "230px", md: "280px" }}
									h={{ base: "300px", md: "330px" }}
								>
									<Image
										src={product.variants[0].image}
										alt={product?.name}
										w="100%"
										h="100%"
										objectFit="cover"
										transition="opacity 0.2s ease-in-out"
									/>
								</Box>

								<Flex direction="column" gap={0.5} mt={2}>
									<Text
										fontWeight="semibold"
										letterSpacing={1}
										fontSize="sm"
									>
										{product?.name}
									</Text>

									<Flex
										align="center"
										justify="space-between"
										w="100%"
									>
										<Flex align="center" gap={3}>
											{product.crossedPrice >
												product.sellingPrice && (
												<Text
													fontWeight="semibold"
													fontSize="sm"
													textDecoration="line-through"
												>
													Rs. {product.crossedPrice}
												</Text>
											)}

											<Text
												fontWeight="semibold"
												fontSize="sm"
												letterSpacing={1}
											>
												Rs. {product?.sellingPrice}
											</Text>
										</Flex>
										{product &&
											product?.crossedPrice >
												product?.sellingPrice && (
												<Badge
													variant="solid"
													colorScheme="green"
													borderRadius={10}
													px={3}
												>
													{product &&
														((product.crossedPrice -
															product.sellingPrice) /
															product.crossedPrice) *
															100}{" "}
													% OFF
												</Badge>
											)}
									</Flex>
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
