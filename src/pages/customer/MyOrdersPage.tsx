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
} from "@chakra-ui/react";
import { MyContainer } from "../../components";
import { useAppSelector } from "../../app/hooks";
import { useGetMyOrdersQuery } from "../../app/features/order/orderApiSlice";
import { getStringDate } from "../../utilities/getStringDate";
import { Link } from "react-router-dom";

const MyOrdersPage = () => {
	const { user } = useAppSelector((state) => state.auth);

	const { data: orders } = useGetMyOrdersQuery(user?.token || "");
	return (
		<MyContainer width="7xl">
			<TableContainer>
				<Table variant="simple">
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
								<Td isNumeric>{order.totalPrice}</Td>
								<Td>{order.status}</Td>
								<Td>{getStringDate(order.createdAt)}</Td>
								<Td>{order.payment?.method}</Td>
								<Td>{order.payment?.status}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</MyContainer>
	);
};

export default MyOrdersPage;
