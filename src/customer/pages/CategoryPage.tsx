import { Flex, Heading, Skeleton } from "@chakra-ui/react";
import { SerializedError } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { useGetCategoryQuery } from "../../app/category/categoryApiSlice";
import MyContainer from "../../shared/MyContainer";
import ProductList from "../components/ProductList";

const CategoryPage = () => {
	const { id } = useParams();
	const { data: category, isLoading, error } = useGetCategoryQuery(id ?? "");
	const products = category?.products;

	return (
		<MyContainer>
			<Flex justifyContent="center">
				<Skeleton isLoaded={!isLoading} width="300px">
					<Heading size="lg" textAlign="center" fontFamily="semibold">
						{category?.name}
					</Heading>
				</Skeleton>
			</Flex>
			<ProductList
				products={products}
				error={error as SerializedError | Error | undefined}
				isLoading={isLoading}
			/>
		</MyContainer>
	);
};

export default CategoryPage;
