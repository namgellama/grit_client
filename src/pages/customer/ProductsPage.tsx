import { useGetProductsQuery } from "@/app/features/product/productApiSlice";
import { MyContainer, MyHeading, ProductList } from "@/components";
import { Alert, AlertIcon, AlertTitle, Skeleton } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

const ProductsPage = () => {
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
					<AlertTitle>No products available</AlertTitle>
				</Alert>
			) : (
				<Skeleton isLoaded={!isLoading} w="300px">
					<MyHeading
						error={error}
						count={products?.length}
						showCount={true}
					>
						{segment
							? segment
							: ageStatus === "New"
							? "New Arrivals"
							: "All Products"}
					</MyHeading>
				</Skeleton>
			)}
			<ProductList
				products={products}
				error={error}
				isLoading={isLoading}
				show={true}
			/>
		</MyContainer>
	);
};

export default ProductsPage;
