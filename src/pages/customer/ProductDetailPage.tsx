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
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import {
	useCreateBagItemMutation,
	useGetBagItemsQuery,
	useUpdateBagItemMutation,
} from "../../app/features/bagItem/bagItemApiSlice";
import { useAppSelector } from "../../app/hooks";
import { useGetProductQuery } from "../../app/features/product/productApiSlice";
import { ColorBox, ErrorMessage, MyContainer, SizeBox } from "../../components";
import { BagItem } from "../../interfaces";

const ProductDetailPage = () => {
	const { id } = useParams();
	const toast = useToast();
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
	const { data: bagItems } = useGetBagItemsQuery(user?.token ?? "");
	const [addToBag] = useCreateBagItemMutation();
	const [updateBag] = useUpdateBagItemMutation();

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

	const handleAddToBag = async () => {
		if (user) {
			const item = {
				productId: product?.id,
				unitPrice: product?.price,
				size: selectedSize,
				color: currentColorName,
				quantity: 1,
				unitTotalPrice: product?.price,
			};

			try {
				const bagItem = bagItems?.find(
					(bagItem) =>
						bagItem.productId === item.productId &&
						bagItem.size === item.size &&
						bagItem.color === item.color
				);

				if (bagItem) {
					await updateBag({
						id: bagItem.id,
						data: {
							quantity: bagItem.quantity + 1,
							unitTotalPrice:
								bagItem.unitPrice * (bagItem.quantity + 1),
						},
						token: user?.token ?? "",
					}).unwrap();
				} else {
					await addToBag({
						data: item,
						token: user?.token ?? "",
					}).unwrap();
				}
			} catch (error: any) {
				toast({
					title: "Something went wrong",
					duration: 1200,
					isClosable: true,
					status: "error",
					position: "top",
				});
			}
		} else {
			const item = {
				id,
				price: product?.price,
				size: selectedSize,
				color: currentColorName,
				image: currentImage,
				stock: product?.stock,
				quantity: 1,
			};

			let bagItems =
				cookies.bagItems === undefined
					? [item]
					: cookies?.bagItems.find(
							(x) =>
								x.id === item.id &&
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

						<HStack
							justifyContent="start"
							spacing={3}
							px={1}
							my={2}
						>
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
