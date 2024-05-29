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
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../app/product/productApiSlice";
import { ColorBox, ErrorMessage, MyContainer, SizeBox } from "../../components";
import { BagItem } from "../../interfaces";
import { useCreateBagItemMutation } from "../../app/bagItem/bagItemApiSlice";
import { useAppSelector } from "../../app/hooks";

const ProductDetailPage = () => {
	const { id } = useParams();

	const { data: product, isLoading, error } = useGetProductQuery(id ?? "");
	const { user } = useAppSelector((state) => state.auth);
	const [currentImage, setCurrentImage] = useState("");
	const [currentColorName, setCurrentColorName] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [cookies, setCookie] = useCookies<
		"bagItems",
		{
			bagItems: BagItem[];
		}
	>(["bagItems"]);

	const [addToBag] = useCreateBagItemMutation();

	useEffect(() => {
		if (product) {
			setCurrentImage(product.color[0].image);
			setCurrentColorName(product.color[0].colorName);
			setSelectedSize(product.sizes[0]);
		}
	}, [product]);

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

	const handleAddToBag = () => {
		const item = {
			productId: product?.id,
			unitPrice: product?.price,
			size: selectedSize,
			color: currentColorName,
			// image: currentImage,
			// stock: product?.stock,
			quantity: 1,
			unitTotalPrice: product?.price,
		};

		if (user) {
			const data = addToBag({
				data: item,
				token: user?.token ?? "",
			}).unwrap();
			console.log(data);
		} else {
			let bagItems =
				cookies.bagItems === undefined
					? [item]
					: cookies?.bagItems.find(
							(x) =>
								x.id === item.productId &&
								x.size === item.size &&
								x.color === item.color
					  )
					? [...cookies.bagItems]
					: [item, ...cookies.bagItems];

			setCookie("bagItems", bagItems);
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
							<Heading fontSize="x-large" letterSpacing={1}>
								{product?.name}
							</Heading>
							<Text>Rs. {product?.price}</Text>
						</VStack>

						<Divider borderColor="darkgray" />

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

						<Divider borderColor="darkgray" />

						<VStack align="start" spacing={5}>
							<Text>Select a size</Text>
							<HStack spacing={5}>
								{product?.sizes.map((size) => (
									<SizeBox
										key={size}
										size={size}
										selectedSize={selectedSize}
										setSelectedSize={setSelectedSize}
									/>
								))}
							</HStack>
						</VStack>

						<Divider borderColor="darkgray" />

						<VStack align="start">
							<Heading fontSize="x-large" letterSpacing={2}>
								Description
							</Heading>
							<Text as="p" textAlign="justify" py={5}>
								{product?.description}
							</Text>
						</VStack>

						<Button
							w="100%"
							colorScheme="red"
							onClick={handleAddToBag}
						>
							Add to Bag
						</Button>
					</VStack>
				</Flex>
			)}
		</MyContainer>
	);
};

export default ProductDetailPage;
