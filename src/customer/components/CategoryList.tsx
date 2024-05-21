import { Container, HStack } from "@chakra-ui/react";
import { useGetCategoriesQuery } from "../../app/category/categoryApiSlice";
import CategoryCard from "./CategoryCard";

const CategoryList = () => {
	const { data: categories, isLoading, error } = useGetCategoriesQuery();

	return (
		<Container my="5rem" maxW="5xl" centerContent>
			<HStack spacing={10}>
				{isLoading ? (
					<p>Loading...</p>
				) : error ? (
					<p>An error occurred</p>
				) : (
					categories?.map((category) => (
						<CategoryCard key={category.id} category={category} />
					))
				)}
			</HStack>
		</Container>
	);
};

export default CategoryList;
