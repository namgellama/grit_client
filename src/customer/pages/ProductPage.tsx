import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../app/product/productApiSlice";
import MyContainer from "../../shared/MyContainer";
import ProductList from "../components/ProductList";
import MyHeading from "../components/MyHeading";

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
			<MyHeading
				isLoading={isLoading}
				error={error}
				count={products?.length}
				showCount={true}
			>
				{segment ?? "All Products"}
			</MyHeading>
			<ProductList
				products={products}
				error={error}
				isLoading={isLoading}
			/>
		</MyContainer>
	);
};

export default ProductPage;
