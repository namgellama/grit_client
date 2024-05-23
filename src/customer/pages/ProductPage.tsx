import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../app/product/productApiSlice";
import MyContainer from "../../shared/components/MyContainer";
import MyHeading from "../components/MyHeading";
import ProductList from "../components/ProductList";

const ProductPage = () => {
	const [searchParams] = useSearchParams();
	const segment = searchParams.get("segment");
	const ageStatus = searchParams.get("ageStatus");
	const queryParams = {
		segment: segment ?? undefined,
		ageStatus: ageStatus ?? undefined,
	};

	const {
		data: products,
		isLoading,
		error,
	} = useGetProductsQuery(queryParams);

	return (
		<MyContainer>
			{products?.length === 0 ? (
				<Alert status="info" variant="solid">
					<AlertIcon />
					<AlertTitle>Could not find any products</AlertTitle>
				</Alert>
			) : (
				<MyHeading
					isLoading={isLoading}
					error={error}
					count={products?.length}
					showCount={true}
				>
					{segment ?? "All Products"}
				</MyHeading>
			)}
			<ProductList
				products={products}
				error={error}
				isLoading={isLoading}
			/>
		</MyContainer>
	);
};

export default ProductPage;
