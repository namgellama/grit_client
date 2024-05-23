import { Flex, Skeleton } from "@chakra-ui/react";
import { SerializedError } from "@reduxjs/toolkit";
import { Product } from "../../app/product/productApiSlice";
import ErrorMessage from "../../shared/ErrorMessage";
import ProductCard from "./ProductCard";

interface Props {
	error: Error | SerializedError | undefined;
	products: Product[] | undefined;
	isLoading: boolean;
}

const ProductList = ({ error, products, isLoading }: Props) => {
	return (
		<Flex flexWrap={"wrap"} justifyContent="space-between" my={10} gap={10}>
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
	);
};

export default ProductList;
