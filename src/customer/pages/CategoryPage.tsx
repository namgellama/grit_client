import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetCategoryQuery } from "../../app/category/categoryApiSlice";
import MyContainer from "../../shared/MyContainer";
import MyHeading from "../components/MyHeading";
import ProductList from "../components/ProductList";

const CategoryPage = () => {
	const { id } = useParams();
	const { data: category, isLoading, error } = useGetCategoryQuery(id ?? "");
	const products = category?.products;

	return (
		<MyContainer>
			<Flex justifyContent="center">
				<MyHeading isLoading={isLoading} error={error}>
					{category?.name}
				</MyHeading>
			</Flex>
			<ProductList
				products={products}
				error={error}
				isLoading={isLoading}
				categoryName={category?.name}
			/>
		</MyContainer>
	);
};

export default CategoryPage;
