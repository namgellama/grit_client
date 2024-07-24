import { useGetMostSoldProductsQuery } from "@/app/features/dashboard/dashboardApiSlice";
import { useAppSelector } from "@/app/hooks";
import { ErrorMessage, HeaderText } from "@/components";
import {
	Box,
	Flex,
	Skeleton,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const MostSoldProducts = () => {
	const { user } = useAppSelector((state) => state.auth);
	const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

	const {
		data: products,
		isLoading,
		error,
	} = useGetMostSoldProductsQuery(user?.token ?? "");

	return (
		<Flex direction="column" height="100%">
			<Box bg="white" py={4} borderRadius={5} px={4} flex={1}>
				<Skeleton isLoaded={!isLoading} w="65%" mb={2}>
					<HeaderText heading="Top 3 Most Sold Products (by Quantity)" />
				</Skeleton>
				{error ? (
					<ErrorMessage>Something went wrong</ErrorMessage>
				) : (
					<Skeleton isLoaded={!isLoading} h="80%">
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
											<Td isNumeric>
												{product.quantity}
											</Td>
											<Td isNumeric>
												Rs. {product.amount}
											</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</TableContainer>
					</Skeleton>
				)}
			</Box>

			<Box bg="white" flex={1} borderRadius={5} px={4} my={5} py={4}>
				{error ? (
					<ErrorMessage>Something went wrong</ErrorMessage>
				) : (
					<Skeleton isLoaded={!isLoading} h="80%">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart width={400} height={400}>
								<Pie
									stroke="none"
									data={products}
									innerRadius={40}
									outerRadius={65}
									paddingAngle={2}
									dataKey="quantity"
								>
									{products?.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</Skeleton>
				)}
			</Box>
		</Flex>
	);
};

export default MostSoldProducts;
