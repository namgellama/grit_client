import { Flex, Heading, Skeleton } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../app/product/productApiSlice";
import ErrorMessage from "../../shared/ErrorMessage";
import MyContainer from "../../shared/MyContainer";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
	const [searchParams] = useSearchParams();
	const segment = searchParams.get("segment");

	const {
		data: products,
		isLoading,
		error,
	} = useGetProductsQuery({ segment: segment ?? undefined });

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
