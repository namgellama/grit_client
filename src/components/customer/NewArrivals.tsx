import { Flex, Skeleton, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MyContainer, MyHeading } from "..";
import { useGetProductsQuery } from "../../app/features/product/productApiSlice";
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
				<Skeleton isLoaded={!isLoading} width="240px">
					<MyHeading
						error={error}
						count={products?.length}
						showCount={true}
					>
						New Arrivals
					</MyHeading>
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
