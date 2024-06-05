import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
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
					<Heading
						pt={2}
						size="sm"
						fontWeight="bold"
						textAlign="center"
					>
						{category.name}
					</Heading>
				</CardBody>
			</Card>
		</Link>
	);
};

export default CategoryCard;
