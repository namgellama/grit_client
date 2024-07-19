import { Box, Grid, Skeleton } from "@chakra-ui/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ErrorMessage, ProductCard } from "..";
import { Product } from "../../app/interfaces/product";

interface Props {
	error: FetchBaseQueryError | SerializedError | undefined;
	products?: Product[];
	isLoading: boolean;
	categoryName?: string;
	show: boolean;
}

const ProductList = ({
	error,
	products,
	isLoading,
	categoryName,
	show,
}: Props) => {
	return (
		<Grid my={10} gap={20} templateColumns="repeat(3, 1fr)">
			{error ? (
				<ErrorMessage>Something went wrong</ErrorMessage>
			) : (
				products?.map((product) => (
					<Box key={product.id} justifySelf="center">
						<Skeleton isLoaded={!isLoading}>
							<ProductCard
								product={product}
								categoryName={categoryName}
								show={show}
							/>
						</Skeleton>
					</Box>
				))
			)}
		</Grid>
	);
};

export default ProductList;
