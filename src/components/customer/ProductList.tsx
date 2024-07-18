import { Flex, Skeleton } from "@chakra-ui/react";
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
		<Flex
			my={10}
			wrap={show ? "wrap" : "nowrap"}
			justify={show ? "space-between" : "normal"}
			gap={20}
			overflowX={show ? "auto" : "scroll"}
			className="scrollbarX"
			pb={show ? 0 : 5}
		>
			{error ? (
				<ErrorMessage>Something went wrong</ErrorMessage>
			) : (
				products?.map((product) => (
					<Skeleton key={product.id} isLoaded={!isLoading}>
						<ProductCard
							product={product}
							categoryName={categoryName}
							show={show}
						/>
					</Skeleton>
				))
			)}
		</Flex>
	);
};

export default ProductList;
