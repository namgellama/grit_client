import { HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../app/features/product/productApiSlice";
import { MyContainer, MyHeading } from "../../components";
import SearchList from "../../components/customer/SearchList";

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
			<HStack>
				<MyHeading
					isLoading={isLoading}
					error={error}
					count={products?.length}
					showCount={true}
				>
					New Arrivals
				</MyHeading>
				<Text fontWeight="semibold" textDecoration="underline">
					<Link to="/products?ageStatus=New">View All</Link>
				</Text>
			</HStack>
			<SearchList
				products={products}
				error={error}
				isLoading={isLoading}
			/>
		</MyContainer>
	);
};

export default NewArrivals;
