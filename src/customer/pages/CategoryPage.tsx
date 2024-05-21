import {
	Card,
	CardBody,
	Container,
	Flex,
	Heading,
	HStack,
	Image,
	Skeleton,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useGetCategoryQuery } from "../../app/category/categoryApiSlice";
import ErrorMessage from "../../shared/ErrorMessage";

const CategoryPage = () => {
	const { id } = useParams();
	const { data: category, isLoading, error } = useGetCategoryQuery(id ?? "");

	return (
		<Container maxW="5xl" my={10}>
			<Flex justifyContent="center">
				<Skeleton isLoaded={!isLoading} width="300px">
					<Heading size="lg" textAlign="center" fontFamily="semibold">
						{category?.name}
					</Heading>
				</Skeleton>
			</Flex>
			<HStack gap={10} flexWrap="wrap" my={8}>
				{error ? (
					<ErrorMessage>
						{"data" in error
							? error.data.message
							: "Something went wrong"}
					</ErrorMessage>
				) : (
					category?.products.map((product) => (
						<Skeleton key={product.id} isLoaded={!isLoading}>
							<Link to={`/categories/${product.id}`}>
								<Card>
									<CardBody padding={2}>
										<Image
											src={
												Object.values(product.color)[0]
													.image
											}
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
						</Skeleton>
					))
				)}
			</HStack>
		</Container>
	);
};

export default CategoryPage;
