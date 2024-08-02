import { Product } from "@/app/interfaces/product";
import { ErrorMessage, ProductCard } from "@/components";
import { Box, Grid } from "@chakra-ui/react";
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
		<Grid
			my={10}
			gap={20}
			templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
		>
			{error && <ErrorMessage>Something went wrong</ErrorMessage>}{" "}
			{products?.map((product) => (
				<Box key={product.id} justifySelf="center">
					<ProductCard
						product={product}
						show={show}
						isLoading={isLoading}
					/>
				</Box>
			))}
		</Grid>
	);
};

export default ProductList;
