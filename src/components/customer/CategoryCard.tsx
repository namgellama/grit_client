import { Category } from "@/app/interfaces/category";
import { Box, Card, CardBody, Image, Text } from "@chakra-ui/react";

const CategoryCard = ({ category }: { category: Category }) => {
	return (
		<Card>
			<Box
				_hover={{ transform: "scale(1.01)" }}
				transition={"transform 0.1s ease-out"}
				w={{ base: "230px", md: "280px" }}
				h={{ base: "300px", md: "330px" }}
			>
				<Image
					src={category.image}
					alt={category.name}
					w="100%"
					h="100%"
					objectFit="cover"
					transition="opacity 0.2s ease-in-out"
				/>
			</Box>

			<CardBody py={1.5}>
				<Text
					size="sm"
					fontWeight={{
						base: "normal",
						md: "semibold",
					}}
					textAlign="center"
				>
					{category.name}
				</Text>
			</CardBody>
		</Card>
	);
};

export default CategoryCard;
