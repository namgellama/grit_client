import {
	Badge,
	Box,
	Flex,
	HStack,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
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
			</Link>

			<VStack align="start" spacing={0.5} w="100%">
				<Link to={`/products/${product?.id}`} style={{ width: "100%" }}>
					<Flex justifyContent="space-between" w="100%">
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
							letterSpacing={0.5}
							textTransform="capitalize"
						>
							{product?.category?.name ?? categoryName}
						</Badge>
					</Flex>
				</Link>

				<Text fontWeight="semibold" fontSize="sm" letterSpacing={0.5}>
					Rs. {product?.sellingPrice}
				</Text>
				<HStack justifyContent="start" spacing={3} px={1} mt={2.5}>
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
