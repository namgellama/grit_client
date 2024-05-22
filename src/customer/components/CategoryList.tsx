import { Heading, HStack, Skeleton } from "@chakra-ui/react";
import { useGetCategoriesQuery } from "../../app/category/categoryApiSlice";
import ErrorMessage from "../../shared/ErrorMessage";
import MyContainer from "../../shared/MyContainer";
import CategoryCard from "./CategoryCard";

const CategoryList = () => {
	const { data: categories, isLoading, error } = useGetCategoriesQuery();

	return (
		<MyContainer>
			<Skeleton isLoaded={!isLoading} width="300px">
				<Heading
					size="lg"
					fontWeight="bold"
					display={error ? "none" : "block"}
				>
					Shop by Category
				</Heading>
			</Skeleton>
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
