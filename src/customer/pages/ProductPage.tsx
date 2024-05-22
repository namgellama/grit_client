import { Flex, Heading, Skeleton } from "@chakra-ui/react";
import { useGetProductsQuery } from "../../app/product/productApiSlice";
import MyContainer from "../../shared/MyContainer";
import ProductCard from "../components/ProductCard";
import ErrorMessage from "../../shared/ErrorMessage";

const ProductPage = () => {
	const { data: products, isLoading, error } = useGetProductsQuery();

	return (
		<MyContainer>
			<Heading size="md" fontWeight="semibold">
				All Products
			</Heading>
			<Flex
				flexWrap={"wrap"}
				justifyContent="space-between"
				my={10}
				gap={10}
			>
				{error ? (
					<ErrorMessage>Something went wrong</ErrorMessage>
				) : (
					products?.map((product) => (
						<Skeleton key={product.id} isLoaded={!isLoading}>
							<ProductCard product={product} />
						</Skeleton>
					))
				)}
			</Flex>
		</MyContainer>
	);
};

export default ProductPage;
