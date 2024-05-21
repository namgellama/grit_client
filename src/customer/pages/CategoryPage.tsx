import {
	Card,
	CardBody,
	Container,
	Heading,
	HStack,
	Image,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useGetCategoryQuery } from "../../app/category/categoryApiSlice";

const CategoryPage = () => {
	const { id } = useParams();

	const { data: category, isLoading, error } = useGetCategoryQuery(id ?? "");

	return (
		<Container maxW="5xl" my={10}>
			<Heading size="lg">{category?.name}</Heading>
			<HStack gap={8} flexWrap="wrap" justifyContent="center" my={8}>
				{category?.products.map((product) => (
					<Link key={product.id} to={`/categories/${product.id}`}>
						<Card>
							<CardBody padding={2}>
								<Image
									src={Object.values(product.color)[0].image}
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
				))}
			</HStack>
		</Container>
	);
};

export default CategoryPage;
