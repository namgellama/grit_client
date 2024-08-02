import { useGetCategoriesQuery } from "@/app/features/category/categoryApiSlice";
import { CategoryCard, ErrorMessage, MyContainer } from "@/components";
import { Flex, Heading, Skeleton } from "@chakra-ui/react";

const CategoryList = () => {
	const { data: categories, isLoading, error } = useGetCategoriesQuery();

	return (
		<MyContainer my="1rem">
			<Skeleton
				isLoaded={!isLoading}
				width={{ base: "100%", md: "200px" }}
			>
				<Flex justify="center" gap={3}>
					<Heading
						fontSize="lg"
						fontWeight="bold"
						display={error ? "none" : "block"}
						textTransform="uppercase"
						letterSpacing={2}
						gap={3}
					>
						Shop By Category
					</Heading>
				</Flex>
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
