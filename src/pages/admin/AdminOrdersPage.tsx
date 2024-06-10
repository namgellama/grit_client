import {
	Flex,
	HStack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../app/features/order/orderApiSlice";
import { useAppSelector } from "../../app/hooks";
import { getStringDate } from "../../utilities/getStringDate";

const AdminOrdersPage = () => {
	const { user } = useAppSelector((state) => state.auth);

	const {
		data: orders,
		isLoading,
		error,
	} = useGetOrdersQuery({ token: user?.token ?? "" });

	return (
		<Flex direction="column" w="100%" p={10} gap={5}>
			<HStack justify="space-between" w="100%">
				<Text
					fontWeight="bold"
					textTransform="uppercase"
					letterSpacing={0.5}
				>
					GRIT Categories
				</Text>
			</HStack>

			<TableContainer bg="white">
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>#</Th>
							<Th>Customer Name</Th>
							<Th>Total Price</Th>
							<Th>Order Status</Th>
							<Th>Payment Method</Th>
							<Th>Payment Status</Th>
							<Th>Date</Th>
							<Th></Th>
						</Tr>
					</Thead>
					<Tbody>
						{orders?.map((order, index) => (
							<Tr key={order.id}>
								<Td>{index + 1}</Td>
								<Td>{order.user.name}</Td>
								<Td>Rs. {order.total}</Td>
								<Td>{order.status}</Td>
								<Td>{order.payment.method}</Td>
								<Td>{order.payment.status}</Td>
								<Td>{getStringDate(order.createdAt)}</Td>

								<Td>
									<Link to={`/dashboard/orders/${order.id}`}>
										<Text
											bg="background.800"
											px={2}
											py={1}
											borderRadius={3}
											color="white"
											_hover={{
												bg: "background.700",
												color: "white",
											}}
										>
											Details
										</Text>
									</Link>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Flex>
	);
};

export default AdminOrdersPage;
