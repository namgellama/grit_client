import { Card, CardBody, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Category } from "../../app/interfaces/category";

const CategoryCard = ({ category }: { category: Category }) => {
	return (
		<Link to={`/categories/${category.id}`}>
			<Card
				_hover={{ transform: "scale(1.01)" }}
				transition={"transform 0.1s ease-out"}
			>
				<CardBody padding={2}>
					<Image
						src={category.image}
						alt={category.name}
						width="280px"
						height="330px"
						objectFit="cover"
					/>
					<Text
						pt={2}
						size="sm"
						fontWeight="semibold"
						textAlign="center"
					>
						{category.name}
					</Text>
				</CardBody>
			</Card>
		</Link>
	);
};

export default CategoryCard;
