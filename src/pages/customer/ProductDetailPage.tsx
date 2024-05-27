import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	Image,
	Skeleton,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../app/product/productApiSlice";
import { ColorBox, ErrorMessage, MyContainer } from "../../components";

const ProductDetailPage = () => {
	const { id } = useParams();

	const { data: product, isLoading, error } = useGetProductQuery(id ?? "");

	const [currentImage, setCurrentImage] = useState("");
	const [currentColorName, setCurrentColorName] = useState("");
	const [selectedSize, setSelectedSize] = useState("");

	useEffect(() => {
		if (product) {
			setCurrentImage(product.color[0].image);
			setCurrentColorName(product.color[0].colorName);
			setSelectedSize(product.sizes[0]);
		}
	}, [product]);

	const [isTransitioning, setIsTransitioning] = useState(false);

	const handleColorChange = (image: string, colorName: string) => {
		if (currentImage !== image) {
			setCurrentColorName(colorName);
			setIsTransitioning(true);
			setTimeout(() => {
				setCurrentImage(image);
				setIsTransitioning(false);
			}, 200);
		}
	};

	return (
		<MyContainer>
			{error ? (
				<ErrorMessage>
					{error && "status" in error && error?.status == 404
						? "Product not found."
						: "Something went wrong."}
				</ErrorMessage>
			) : (
				<Flex gap={10}>
					<Box w="50%">
						<Skeleton isLoaded={!isLoading}>
							<Image
								src={currentImage}
								alt={product?.name}
								w="500px"
								h="600px"
								objectFit="cover"
								opacity={isTransitioning ? 0 : 1}
								transition="opacity 0.2s ease-in-out"
							/>
						</Skeleton>
					</Box>
					<VStack
						w="50%"
						alignItems="start"
						justify="space-between"
						px={10}
					>
						<VStack alignItems="start">
							<Text>
								{product?.category.name} | {product?.segment}
							</Text>
							<Heading fontSize="x-large">
								{product?.name}
							</Heading>
							<Text>Rs. {product?.price}</Text>
						</VStack>
						<Divider />

						<HStack justifyContent="start" spacing={3} px={1}>
							{product?.color.map((color) => (
								<ColorBox
									key={color.colorName}
									color={color}
									currentColorName={currentColorName ?? ""}
									handleColorChange={handleColorChange}
								/>
							))}
						</HStack>
						<Divider />

						<VStack align="start" spacing={5}>
							<Text>Select a size</Text>
							<HStack spacing={5}>
								{product?.sizes.map((size) => (
									<Flex
										key={size}
										border={`2px solid ${
											selectedSize === size
												? "gray"
												: "darkgrey"
										}`}
										cursor="pointer"
										justify="center"
										align="center"
										w="50px"
										h="40px"
										borderRadius={5}
										onClick={() => setSelectedSize(size)}
									>
										{size}
									</Flex>
								))}
							</HStack>
						</VStack>

						<Divider />

						<VStack align="start">
							<Heading fontSize="x-large" letterSpacing={2}>
								Description
							</Heading>
							<Text as="p" textAlign="justify" py={5}>
								{product?.description}
							</Text>
						</VStack>

						<Button w="100%" colorScheme="red">
							Add to Bag
						</Button>
					</VStack>
				</Flex>
			)}
		</MyContainer>
	);
};

export default ProductDetailPage;
