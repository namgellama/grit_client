import { useGetCategoriesQuery } from "@/app/features/category/categoryApiSlice";
import {
	BasicCardSkeleton,
	BasicProductContainer,
	CategoryCard,
	ErrorMessage,
	MyContainer,
} from "@/components";
import { Box, Flex, Heading, Skeleton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ShopByCategory = () => {
	const skeletons = [1, 2, 3, 4, 5, 6];
	const { data: categories, isLoading, error } = useGetCategoriesQuery();
	const navigate = useNavigate();

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

			{error && <ErrorMessage>Something went wrong</ErrorMessage>}

			<BasicProductContainer>
				{isLoading &&
					skeletons.map((skeleton) => (
						<Box key={skeleton}>
							<BasicCardSkeleton noOfLines={1} />
						</Box>
					))}

				{categories?.map((category) => (
					<Box
						key={category.id}
						cursor="pointer"
						onClick={() => navigate(`/categories/${category.id}`)}
					>
						<CategoryCard category={category} />
					</Box>
				))}
			</BasicProductContainer>
		</MyContainer>
	);
};

export default ShopByCategory;
