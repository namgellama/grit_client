import {
	TableContainer,
	Table,
	TableCaption,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Tfoot,
	Box,
} from "@chakra-ui/react";
import { useGetMostSoldProductsQuery } from "../../app/features/dashboard/dashboardApiSlice";
import { useAppSelector } from "../../app/hooks";
import HeaderText from "./HeaderText";

const MostSoldProducts = () => {
	const { user } = useAppSelector((state) => state.auth);

	const {
		data: products,
		isLoading,
		error,
	} = useGetMostSoldProductsQuery(user?.token ?? "");

	return (
		<Box bg="white" py={4} borderRadius={5} px={4}>
			<HeaderText heading="Top 3 Most Sold Products (by Quantity)" />
			<TableContainer mt={4}>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>#</Th>
							<Th>Name</Th>
							<Th isNumeric>Quantity</Th>
							<Th isNumeric>Amount</Th>
						</Tr>
					</Thead>
					<Tbody>
						{products?.map((product, index) => (
							<Tr key={product.id}>
								<Td>{index + 1}</Td>
								<Td>{product.name}</Td>
								<Td isNumeric>{product.quantity}</Td>
								<Td isNumeric>Rs. {product.amount}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default MostSoldProducts;
