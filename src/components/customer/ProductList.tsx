import { Flex, Skeleton } from "@chakra-ui/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorMessage, ProductCard } from "..";
import { Product } from "../../app/product/productApiSlice";

interface Props {
	error: FetchBaseQueryError | SerializedError | undefined;
	products: Product[] | undefined;
	isLoading: boolean;
	categoryName?: string;
}

const ProductList = ({ error, products, isLoading, categoryName }: Props) => {
	return (
		<Flex flexWrap={"wrap"} justifyContent="space-between" my={10} gap={20}>
			{error ? (
				<ErrorMessage>Something went wrong</ErrorMessage>
			) : (
				products?.map((product) => (
					<Skeleton key={product.id} isLoaded={!isLoading}>
						<ProductCard
							product={product}
							categoryName={categoryName}
						/>
					</Skeleton>
				))
			)}
		</Flex>
	);
};

export default ProductList;