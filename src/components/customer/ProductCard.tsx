import { Badge, Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ColorBox } from "..";
import { Product } from "../../app/interfaces/product";

interface Props {
	product?: Product;
	categoryName?: string;
}

const ProductCard = ({ product, categoryName }: Props) => {
	const [currentImage, setCurrentImage] = useState(
		product?.variants[0].image ?? ""
	);
	const [currentColor, setCurrentColor] = useState(
		product?.variants[0].color ?? ""
	);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const uniqueColorVariants = Array.from(
		new Map(
			product?.variants.map((variant) => [variant.color, variant])
		).values()
	);

	const handleColorChange = (
		image: string | undefined,
		color: string | undefined
	) => {
		if (image && color)
			if (currentImage !== image) {
				setCurrentColor(color);
				setIsTransitioning(true);
				setTimeout(() => {
					setCurrentImage(image);
					setIsTransitioning(false);
				}, 200);
			}
	};

	console.log(uniqueColorVariants);

	console.log(currentImage);

	return (
		<VStack align="start">
			<Link to={`/products/${product?.id}`}>
				<Box
					_hover={{ transform: "scale(1.01)" }}
					transition={"transform 0.1s ease-out"}
				>
					<Image
						src={currentImage}
						alt={product?.name}
						w="280px"
						h="330px"
						objectFit="cover"
						opacity={isTransitioning ? 0 : 1}
						transition="opacity 0.2s ease-in-out"
					/>
				</Box>
				<HStack justifyContent="space-between" w="100%" mt={4} px={1}>
					<Text fontWeight="semibold" fontSize="sm">
						{product?.name}
					</Text>
					<Badge
						colorScheme="green"
						fontSize="xxs"
						fontWeight="medium"
						letterSpacing={0.5}
						textTransform="capitalize"
					>
						{product?.category?.name ?? categoryName}
					</Badge>
				</HStack>
			</Link>

			<VStack px={1} align="start" spacing={3.5}>
				<Text fontWeight="semibold" fontSize="sm" letterSpacing={0.5}>
					Rs. {product?.price}
				</Text>
				<HStack justifyContent="start" spacing={3} px={1}>
					{uniqueColorVariants.map((variant) => (
						<ColorBox
							key={variant.id}
							variant={variant}
							currentColor={currentColor}
							handleColorChange={handleColorChange}
						/>
					))}
				</HStack>
			</VStack>
		</VStack>
	);
};

export default ProductCard;
