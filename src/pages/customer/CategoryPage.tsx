import { useParams } from "react-router-dom";
import { useGetCategoryQuery } from "../../app/category/categoryApiSlice";
import { MyContainer, MyHeading, ProductList } from "../../components";

const CategoryPage = () => {
	const { id } = useParams();
	const { data: category, isLoading, error } = useGetCategoryQuery(id ?? "");
	const products = category?.products;

	return (
		<MyContainer>
			<MyHeading
				isLoading={isLoading}
				error={error}
				count={products?.length}
				showCount={true}
			>
				{category?.name}
			</MyHeading>
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
