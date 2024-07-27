import { Product } from "@/app/interfaces/product";
import { ErrorMessage, ProductCard } from "@/components";
import { Box, Grid, Skeleton } from "@chakra-ui/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface Props {
	error: FetchBaseQueryError | SerializedError | undefined;
	products?: Product[];
	isLoading: boolean;
	show: boolean;
}

const ProductList = ({ error, products, isLoading, show }: Props) => {
	return (
		<Grid my={10} gap={20} templateColumns="repeat(3, 1fr)">
			{error ? (
				<ErrorMessage>Something went wrong</ErrorMessage>
			) : (
				products?.map((product) => (
					<Box key={product.id} justifySelf="center">
						<Skeleton isLoaded={!isLoading}>
							<ProductCard product={product} show={show} />
						</Skeleton>
					</Box>
				))
			)}
		</Grid>
	);
};

export default ProductList;
