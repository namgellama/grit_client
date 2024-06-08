import { Badge, Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ColorBox } from "..";
import { Product } from "../../app/interfaces/product";

interface Props {
	product: Product;
	categoryName?: string;
}

const ProductCard = ({ product, categoryName }: Props) => {
	const [currentImage, setCurrentImage] = useState(product.color[0].image);
	const [currentColorName, setCurrentColorName] = useState(
		product.color[0].colorName
	);
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
		<VStack align="start">
			<Link to={`/products/${product.id}`}>
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
						{product.name}
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
					Rs. {product.price}
				</Text>
				<HStack justifyContent="start" spacing={3} px={1}>
					{product.color.map((color) => (
						<ColorBox
							key={color.hexColor}
							color={color}
							currentColorName={currentColorName}
							handleColorChange={handleColorChange}
						/>
					))}
				</HStack>
			</VStack>
		</VStack>
	);
};

export default ProductCard;
