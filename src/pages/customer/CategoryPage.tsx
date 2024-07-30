import { useGetCategoryQuery } from "@/app/features/category/categoryApiSlice";
import { MyContainer, MyHeading, ProductList } from "@/components";
import { Skeleton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
	const { id } = useParams();
	const { data: category, isLoading, error } = useGetCategoryQuery(id ?? "");
	const products = category?.products;

	return (
		<MyContainer>
			<Skeleton isLoaded={!isLoading} w="350px">
				<MyHeading
					error={error}
					count={products?.length}
					showCount={true}
				>
					{category?.name}
				</MyHeading>
			</Skeleton>
			<ProductList
				products={products}
				error={error}
				isLoading={isLoading}
				show={true}
			/>
		</MyContainer>
	);
};

export default CategoryPage;
