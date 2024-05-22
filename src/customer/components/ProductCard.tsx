import { Badge, Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../app/product/productApiSlice";
import ColorBox from "./ColorBox";

const ProductCard = ({ product }: { product: Product }) => {
	const [currentImage, setCurrentImage] = useState(product.color[0].image);

	return (
		<VStack align="start">
			<Link to={`/products/${product.id}`}>
				<Box
					_hover={{ transform: "scale(1.01)" }}
					transition={"transform 0.1s ease-out"}
				>
					<Image
						src={currentImage}
						alt={product.name}
						w="280px"
						h="330px"
						objectFit="cover"
					/>
				</Box>
				<HStack justifyContent="space-between" w="100%" mt={4} px={1}>
					<Text fontWeight="bold" fontSize="small">
						{product.name.toUpperCase()}
					</Text>
					<Badge colorScheme="green">{product.category.name}</Badge>
				</HStack>
			</Link>

			<VStack px={1} align="start">
				<Text fontWeight="semibold" fontSize="small">
					Rs. {product.price}
				</Text>
				<HStack justifyContent="start">
					{product.color.map((color) => (
						<ColorBox
							key={color.hexColor}
							color={color}
							setCurrentImage={setCurrentImage}
						/>
					))}
				</HStack>
			</VStack>
		</VStack>
	);
};

export default ProductCard;
