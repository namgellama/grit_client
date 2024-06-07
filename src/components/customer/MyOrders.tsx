import {
	Badge,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../app/features/order/orderApiSlice";
import { useAppSelector } from "../../app/hooks";
import { getStringDate } from "../../utilities/getStringDate";

const MyOrders = () => {
	const { user } = useAppSelector((state) => state.auth);

	const { data: orders } = useGetMyOrdersQuery(user?.token || "");
	return (
		<TableContainer width="100%">
			<Table variant="striped">
				<Thead>
					<Tr>
						<Th>Order Id</Th>
						<Th isNumeric>Total Price</Th>
						<Th>Status</Th>
						<Th>Ordered Date</Th>
						<Th>Payment Method</Th>
						<Th>Payment Status</Th>
					</Tr>
				</Thead>
				<Tbody>
					{orders?.map((order) => (
						<Tr key={order.id}>
							<Td _hover={{ textDecoration: "underline" }}>
								<Link to={`/orders/mine/${order.id}`}>
									{order.id}
								</Link>
							</Td>
							<Td isNumeric>{order.total}</Td>
							<Td>
								<Badge colorScheme="green" ml={2}>
									{order?.status}
								</Badge>
							</Td>
							<Td>{getStringDate(order.createdAt)}</Td>
							<Td>{order.payment?.method}</Td>
							<Td>
								<Badge colorScheme="green" ml={2}>
									{order.payment?.status}
								</Badge>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default MyOrders;
