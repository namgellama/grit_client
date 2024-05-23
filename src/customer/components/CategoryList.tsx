import { HStack, Skeleton } from "@chakra-ui/react";
import { useGetCategoriesQuery } from "../../app/category/categoryApiSlice";
import ErrorMessage from "../../shared/ErrorMessage";
import MyContainer from "../../shared/MyContainer";
import CategoryCard from "./CategoryCard";
import MyHeading from "./MyHeading";

const CategoryList = () => {
	const { data: categories, isLoading, error } = useGetCategoriesQuery();

	return (
		<MyContainer>
			<MyHeading isLoading={isLoading} error={error} showCount={false}>
				Shop by Category
			</MyHeading>
			<HStack spacing={10} mt={10}>
				{error ? (
					<ErrorMessage>Something went wrong</ErrorMessage>
				) : (
					categories?.map((category) => (
						<Skeleton key={category.id} isLoaded={!isLoading}>
							<CategoryCard category={category} />
						</Skeleton>
					))
				)}
			</HStack>
		</MyContainer>
	);
};

export default CategoryList;
