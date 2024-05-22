import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Product } from "../../app/product/productApiSlice";

const ProductCard = ({ product }: { product: Product }) => {
	return (
		<Link to={`/products/${product.id}`}>
			<Card
				_hover={{ transform: "scale(1.01)" }}
				transition={"transform 0.1s ease-out"}
			>
				<CardBody padding={2}>
					<Image
						src={product.color[0].image}
						alt={product.name}
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
						{product.name}
					</Heading>
				</CardBody>
			</Card>
		</Link>
	);
};

export default ProductCard;
