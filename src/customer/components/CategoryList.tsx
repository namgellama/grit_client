import { Container, Heading, HStack } from "@chakra-ui/react";
import { useGetCategoriesQuery } from "../../app/category/categoryApiSlice";
import CategoryCard from "./CategoryCard";

const CategoryList = () => {
	const { data: categories, isLoading, error } = useGetCategoriesQuery();

	return (
		<Container my="4rem" maxW="6xl">
			<Heading size="lg" fontWeight="bold">
				Shop by Category
			</Heading>
			<HStack spacing={10} mt={10}>
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
