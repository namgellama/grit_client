import { Container, Flex, Heading, HStack, Skeleton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetCategoryQuery } from "../../app/category/categoryApiSlice";
import ErrorMessage from "../../shared/ErrorMessage";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
	const { id } = useParams();
	const { data: category, isLoading, error } = useGetCategoryQuery(id ?? "");
	const products = category?.products;

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
					products?.map((product) => (
						<Skeleton key={product.id} isLoaded={!isLoading}>
							<ProductCard
								product={product}
								categoryName={category?.name}
							/>
						</Skeleton>
					))
				)}
			</HStack>
		</Container>
	);
};

export default CategoryPage;
