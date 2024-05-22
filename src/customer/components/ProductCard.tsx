import {
	Badge,
	Box,
	HStack,
	Image,
	Text,
	Tooltip,
	VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Product } from "../../app/product/productApiSlice";

const ProductCard = ({ product }: { product: Product }) => {
	return (
		<Link to={`/products/${product.id}`}>
			<Box
				_hover={{ transform: "scale(1.01)" }}
				transition={"transform 0.1s ease-out"}
			>
				<Image
					src={product.color[0].image}
					alt={product.name}
					w="280px"
					h="330px"
					objectFit="cover"
				/>
			</Box>
			<VStack mt={4} px={1} align="start">
				<HStack justifyContent="space-between" w="100%">
					<Text fontWeight="bold" fontSize="small">
						{product.name.toUpperCase()}
					</Text>
					<Badge colorScheme="green">{product.category.name}</Badge>
				</HStack>
				<Text fontWeight="semibold" fontSize="small">
					Rs. {product.price}
				</Text>
				<HStack>
					{product.color.map((c) => (
						<Tooltip key={c.hexColor} label={c.colorName}>
							<Box w={3} h={3} background={c.hexColor}></Box>
						</Tooltip>
					))}
				</HStack>
			</VStack>
		</Link>
	);
};

export default ProductCard;
