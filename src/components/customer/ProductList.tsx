import { Product } from "@/app/interfaces/product";
import {
	BasicCardSkeleton,
	ErrorMessage,
	ProductCard,
	ProductCardSkeleton,
} from "@/components";
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
	const skeletons = [1, 2, 3];

	if (error) return <ErrorMessage>Something went wrong</ErrorMessage>;

	return (
		<Grid
			my={10}
			gap={20}
			templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
		>
			{isLoading &&
				skeletons.map((skeleton) => (
					<Box key={skeleton}>
						<ProductCardSkeleton />
					</Box>
				))}

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
