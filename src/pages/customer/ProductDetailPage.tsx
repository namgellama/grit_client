import { useGetProductQuery } from "@/app/features/product/productApiSlice";
import { BagItem } from "@/app/interfaces/bagItem";
import { ColorBox, ErrorMessage, MyContainer, SizeBox } from "@/components";
import {
	Badge,
	Button,
	Divider,
	Flex,
	HStack,
	Image,
	Skeleton,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
	const { id } = useParams();
	const { data: product, isLoading, error } = useGetProductQuery(id ?? "");
	const [currentImage, setCurrentImage] = useState("");
	const [currentColor, setCurrentColor] = useState("");
	const [currentSize, setCurrentSize] = useState("");
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [cookies, setCookie] = useCookies<
		"bagItems",
		{ bagItems: BagItem[] }
	>(["bagItems"]);

	const uniqueColorVariants = Array.from(
		new Map(
			product?.variants.map((variant) => [variant.color, variant])
		).values()
	);

	const uniqueSizeVariants = Array.from(
		new Map(
			product?.variants.map((variant) => [variant.size, variant])
		).values()
	);

	useEffect(() => {
		if (product) {
			setCurrentColor(product.variants[0].color);
			setCurrentImage(product.variants[0].image);
			setCurrentSize(product.variants[0].size);
		}
	}, [product]);

	const handleColorChange = (image: string, color: string) => {
		if (currentImage !== image) {
			setCurrentColor(color);
			setIsTransitioning(true);
			setTimeout(() => {
				setCurrentImage(image);
				setIsTransitioning(false);
			}, 200);
		}
	};

	const handleAddToBag = async () => {
		const item = {
			id: product?.id ?? "",
			name: product?.name ?? "",
			unitPrice: product?.sellingPrice ?? 0,
			size: currentSize,
			color: currentColor,
			quantity: 1,
			image: currentImage,
			unitTotalPrice: product?.sellingPrice ?? 0,
			stock:
				product?.variants.find(
					(variant) =>
						variant.color === currentColor &&
						variant.size === currentSize
				)?.stock ?? 0,
		};

		const currentBagItems = cookies.bagItems || [];

		const existingItemIndex = currentBagItems.findIndex(
			(bagItem) =>
				bagItem.id === item.id &&
				bagItem.size === item.size &&
				bagItem.color === item.color
		);

		if (existingItemIndex !== -1) {
			currentBagItems[existingItemIndex] = item;
		} else {
			currentBagItems.push(item);
		}

		setCookie("bagItems", currentBagItems, { path: "/" });
	};

	return (
		<MyContainer>
			{error && (
				<ErrorMessage>
					{error && "status" in error && error?.status == 404
						? "Product not found."
						: "Something went wrong."}
				</ErrorMessage>
			)}

			<Flex
				gap={{ base: 5, md: 0, lg: 5 }}
				direction={{ base: "column", md: "row" }}
			>
				<Skeleton
					isLoaded={!isLoading}
					w={{ base: "100%", md: "500px" }}
					h={{ base: "550px", md: "600px" }}
				>
					<Image
						src={currentImage}
						alt={product?.name}
						opacity={isTransitioning ? 0 : 1}
						transition="opacity 0.2s ease-in-out"
						w="100%"
						h="100%"
						objectFit="cover"
					/>
				</Skeleton>

				<VStack
					w={{ base: "100%", md: "50%" }}
					alignItems="start"
					justify="space-between"
					px={{ base: 0, md: 10 }}
				>
					<Skeleton w="100%" isLoaded={!isLoading}>
						<VStack alignItems="start">
							<Text
								fontSize={{ base: "md", md: "sm" }}
								fontWeight="medium"
							>
								{product?.category.name} | {product?.segment}
							</Text>
							<Text
								fontSize="xl"
								fontWeight="semibold"
								letterSpacing={1}
							>
								{product?.name}
							</Text>

							<Flex direction="column" align="start" gap={2}>
								<Flex align="center" gap={3}>
									{product &&
										product?.crossedPrice >
											product?.sellingPrice && (
											<Text
												fontWeight="medium"
												textDecoration="line-through"
											>
												Rs. {product?.crossedPrice}
											</Text>
										)}

									<Text fontWeight="medium" letterSpacing={1}>
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
						</VStack>
					</Skeleton>

					<Divider borderColor="darkgray" />

					<Skeleton w="100%" isLoaded={!isLoading}>
						<Flex direction="column" gap={2}>
							<Text fontSize="sm" letterSpacing={0.7}>
								Color: {currentColor}
							</Text>
							<HStack
								justifyContent="start"
								spacing={3}
								px={1}
								my={2}
							>
								{uniqueColorVariants.map((variant) => (
									<ColorBox
										key={variant.id}
										variant={variant}
										currentColor={currentColor}
										handleColorChange={handleColorChange}
										small={false}
									/>
								))}
							</HStack>
						</Flex>
					</Skeleton>

					<Divider borderColor="darkgray" />

					<Skeleton w="100%" isLoaded={!isLoading}>
						<Flex direction="column" gap={2}>
							<Text fontSize="sm" letterSpacing={0.7}>
								Size: {currentSize}
							</Text>
							<HStack spacing={5}>
								{uniqueSizeVariants.map((variant) => (
									<SizeBox
										key={variant.id}
										size={variant.size}
										currentSize={currentSize}
										setCurrentSize={setCurrentSize}
									/>
								))}
							</HStack>
						</Flex>
					</Skeleton>

					<Divider borderColor="darkgray" />

					<Skeleton w="100%" isLoaded={!isLoading}>
						<VStack align="start">
							<Text
								fontSize="lg"
								letterSpacing={1}
								fontWeight="semibold"
							>
								Description
							</Text>
							<Text as="p" textAlign="justify">
								{product?.description}
							</Text>
						</VStack>

						<Button
							w="100%"
							colorScheme="red"
							mt={5}
							borderRadius={0}
							onClick={handleAddToBag}
						>
							Add to Bag
						</Button>
					</Skeleton>
				</VStack>
			</Flex>
		</MyContainer>
	);
};

export default ProductDetailPage;
