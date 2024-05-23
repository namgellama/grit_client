import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../app/product/productApiSlice";
import MyContainer from "../../shared/MyContainer";
import ProductList from "../components/ProductList";

const ProductPage = () => {
	const [searchParams] = useSearchParams();
	const segment = searchParams.get("segment");

	const {
		data: products,
		isLoading,
		error,
	} = useGetProductsQuery({ segment: segment ?? undefined });

	return (
		<MyContainer>
			<ProductList
				products={products}
				error={error}
				isLoading={isLoading}
			/>
		</MyContainer>
	);
};

export default ProductPage;
