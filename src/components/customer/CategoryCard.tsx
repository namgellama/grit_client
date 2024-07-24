import { Category } from "@/app/interfaces/category";
import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }: { category: Category }) => {
	return (
		<VStack align="start" w="280px" h="390px" py={2}>
			<Link to={`/categories/${category.id}`}>
				<Box
					_hover={{ transform: "scale(1.01)" }}
					transition={"transform 0.1s ease-out"}
				>
					<Image
						src={category.image}
						alt={category.name}
						w="280px"
						h="330px"
						objectFit="cover"
						transition="opacity 0.2s ease-in-out"
					/>
				</Box>
				<Text pt={2} size="sm" fontWeight="semibold" textAlign="center">
					{category.name}
				</Text>
			</Link>
		</VStack>
	);
};

export default CategoryCard;
