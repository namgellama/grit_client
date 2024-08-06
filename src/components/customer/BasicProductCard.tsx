import { Product } from "@/app/interfaces/product";
import {
	Badge,
	Box,
	Card,
	CardBody,
	Flex,
	Image,
	Text,
} from "@chakra-ui/react";

const BasicProductCard = ({ product }: { product?: Product }) => {
	return (
		<Card>
			<Box
				_hover={{ transform: "scale(1.01)" }}
				transition={"transform 0.1s ease-out"}
				w={{ base: "230px", md: "280px" }}
				h={{ base: "300px", md: "330px" }}
			>
				<Image
					src={product?.variants[0].image}
					alt={product?.name}
					w="100%"
					h="100%"
					objectFit="cover"
					transition="opacity 0.2s ease-in-out"
				/>
			</Box>

			<CardBody py={2} px={3}>
				<Flex direction="column" gap={1}>
					<Text
						fontWeight={{
							base: "normal",
							md: "semibold",
						}}
						letterSpacing={1}
						fontSize="sm"
					>
						{product?.name}
					</Text>

					<Flex align="center" justify="space-between" w="100%">
						<Flex align="center" gap={3}>
							{product &&
								product?.crossedPrice >
									product.sellingPrice && (
									<Text
										fontWeight={{
											base: "normal",
											md: "semibold",
										}}
										fontSize="sm"
										textDecoration="line-through"
									>
										Rs. {product.crossedPrice}
									</Text>
								)}

							<Text
								fontWeight={{
									base: "normal",
									md: "semibold",
								}}
								fontSize="sm"
								letterSpacing={1}
							>
								Rs. {product?.sellingPrice}
							</Text>
						</Flex>
						{product &&
							product?.crossedPrice > product?.sellingPrice && (
								<Badge
									variant="solid"
									colorScheme="green"
									borderRadius={10}
									px={2}
									fontWeight={{
										base: "normal",
										md: "semibold",
									}}
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
			</CardBody>
		</Card>
	);
};

export default BasicProductCard;
