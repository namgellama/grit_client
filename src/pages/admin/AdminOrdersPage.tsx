import { useGetOrdersQuery } from "@/app/features/order/orderApiSlice";
import { useAppSelector } from "@/app/hooks";
import { ErrorMessage } from "@/components";
import { getStringDate } from "@/utilities/getStringDate";
import {
	Button,
	Flex,
	HStack,
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AdminOrdersPage = () => {
	const { user } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const {
		data: orders,
		isLoading,
		error,
	} = useGetOrdersQuery({ token: user?.token ?? "" });

	return (
		<>
			{isLoading ? (
				<Flex align="center" justify="center">
					{" "}
					<Spinner />{" "}
				</Flex>
			) : error ? (
				<ErrorMessage>Something went wrong</ErrorMessage>
			) : (
				<Flex direction="column" w="100%" p={5} gap={5}>
					<HStack justify="space-between" w="100%">
						<Text
							fontWeight="bold"
							textTransform="uppercase"
							letterSpacing={0.5}
						>
							GRIT Orders
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
									<Th>Date</Th>
									<Th>Payment Method</Th>
									<Th>Payment Status</Th>
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
										<Td>
											{getStringDate(order.createdAt)}
										</Td>
										<Td>{order.payment.method}</Td>
										<Td>{order.payment.status}</Td>

										<Td>
											<Button
												bg="background.800"
												color="white"
												_hover={{
													bg: "background.700",
													color: "white",
												}}
												size="sm"
												onClick={() =>
													navigate(
														`/dashboard/orders/${order.id}`
													)
												}
											>
												Details
											</Button>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				</Flex>
			)}
		</>
	);
};

export default AdminOrdersPage;
