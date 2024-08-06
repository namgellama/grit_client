import { Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MyContainer } from "..";
import { useGetProductsQuery } from "@/app/features/product/productApiSlice";
import SearchList from "./SearchList";

const NewArrivals = () => {
	const queryParams = {
		ageStatus: "new",
	};

	const {
		data: products,
		isLoading,
		error,
	} = useGetProductsQuery(queryParams);

	return (
		<MyContainer>
			<Flex
				align="center"
				direction={{ base: "column", md: "row" }}
				gap={{ base: 2, md: 4 }}
			>
				<Skeleton
					isLoaded={!isLoading}
					width={{ base: "100%", md: "240px" }}
				>
					<Flex justify="center" gap={3} align="center">
						<Heading
							fontSize="lg"
							fontWeight="bold"
							display={error ? "none" : "block"}
							textTransform="uppercase"
							letterSpacing={2}
							alignItems="center"
							gap={3}
						>
							New Arrivals
						</Heading>

						<Text as="span" fontSize="lg" fontWeight="medium">
							({products?.length}{" "}
							{products?.length !== 1 ? "items" : "item"})
						</Text>
					</Flex>
				</Skeleton>

				<Skeleton isLoaded={!isLoading}>
					<Text fontWeight="semibold" textDecoration="underline">
						<Link to="/products?ageStatus=New">View All</Link>
					</Text>
				</Skeleton>
			</Flex>
			<SearchList
				products={products}
				error={error}
				isLoading={isLoading}
			/>
		</MyContainer>
	);
};

export default NewArrivals;
