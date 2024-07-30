import { useGetCategoriesQuery } from "@/app/features/category/categoryApiSlice";
import {
	CategoryCard,
	ErrorMessage,
	MyContainer,
	MyHeading,
} from "@/components";
import { Flex, Skeleton } from "@chakra-ui/react";

const CategoryList = () => {
	const { data: categories, isLoading, error } = useGetCategoriesQuery();

	return (
		<MyContainer>
			<Skeleton isLoaded={!isLoading} width="200px">
				<MyHeading error={error} showCount={false}>
					Shop by Category
				</MyHeading>
			</Skeleton>
			<Flex
				mt={8}
				gap={{ base: 10, md: 16 }}
				overflowX="scroll"
				className="scrollbarX"
			>
				{error ? (
					<ErrorMessage>Something went wrong</ErrorMessage>
				) : (
					categories?.map((category) => (
						<Skeleton key={category.id} isLoaded={!isLoading}>
							<CategoryCard category={category} />
						</Skeleton>
					))
				)}
			</Flex>
		</MyContainer>
	);
};

export default CategoryList;
