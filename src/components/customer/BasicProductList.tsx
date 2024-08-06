import { Product } from "@/app/interfaces/product";
import {
	BasicProductCard,
	BasicCardSkeleton,
	BasicProductContainer,
	ErrorMessage,
} from "@/components";
import { Box } from "@chakra-ui/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";

interface Props {
	error: FetchBaseQueryError | SerializedError | undefined;
	products?: Product[];
	isLoading: boolean;
}

const BasicProductList = ({ error, products, isLoading }: Props) => {
	const skeletons = [1, 2, 3, 4, 5, 6];
	const navigate = useNavigate();

	if (error) return <ErrorMessage>Something went wrong</ErrorMessage>;

	return (
		<BasicProductContainer>
			{isLoading &&
				skeletons.map((skeleton) => (
					<Box key={skeleton}>
						<BasicCardSkeleton noOfLines={2} />
					</Box>
				))}

			{products?.map((product) => (
				<Box
					key={product.id}
					onClick={() => navigate(`/products/${product.id}`)}
				>
					<BasicProductCard product={product} />
				</Box>
			))}
		</BasicProductContainer>
	);
};

export default BasicProductList;
