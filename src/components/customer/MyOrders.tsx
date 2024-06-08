import {
	Badge,
	Box,
	Button,
	Flex,
	HStack,
	Tag,
	Text,
	VStack,
} from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../app/features/order/orderApiSlice";
import { useAppSelector } from "../../app/hooks";
import { getOrderColor, getPaymentColor } from "../../utilities/getColor";
import { getStringDateTime } from "../../utilities/getStringDate";

const MyOrders = () => {
	const { user } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const { data: orders } = useGetMyOrdersQuery(user?.token || "");

	return (
		<Box>
			<Text textTransform="uppercase" fontWeight="bold" ml={2} mb={3}>
				My Orders
			</Text>

			<HStack w="100%" flexWrap="wrap" justify="space-between" gap={8}>
				{orders?.map((order) => (
					<Box key={order.id} w="48%" bg="white" borderRadius={8}>
						<Box p={4}>
							<VStack align="start" gap={4}>
								<HStack justify="space-between" w="100%">
									<Text fontSize="small" fontWeight="medium">
										Order ID: {order.id}
									</Text>
									<Badge
										colorScheme={getOrderColor(
											order.status
										)}
										fontSize="x-small"
									>
										ORDER {order.status}
									</Badge>
								</HStack>

								<HStack justify="space-between" w="100%">
									<Tag fontSize="small">
										{getStringDateTime(order.createdAt)}
									</Tag>
									<Tag>
										<Flex align="center" gap={1}>
											<MdLocationOn fontSize="medium" />

											<Text fontSize="small">{`${order.address?.addressLine1}, ${order.address?.city}, ${order.address?.country}`}</Text>
										</Flex>
									</Tag>
								</HStack>

								<HStack gap={3}>
									<Badge
										bg="background.600"
										px={2}
										color="white"
										fontSize="x-small"
									>
										{order.payment.method}
									</Badge>
									<Badge
										fontSize="x-small"
										colorScheme={getPaymentColor(
											order.payment.status
										)}
									>
										PAYMENT {order.payment.status}
									</Badge>
								</HStack>
							</VStack>
						</Box>

						<Box
							bg="background.100"
							py={2}
							px={4}
							borderBottomRadius={5}
						>
							<HStack justify="space-between" w="100%">
								<Text fontSize="small" fontWeight="bold">
									Rs. {order.total}
									<Text as="span" fontWeight="medium" ml={2}>
										({order.orderItems.length}{" "}
										{order.orderItems.length > 1
											? "items"
											: "item"}
										)
									</Text>
								</Text>
								<Button
									variant="solid"
									bg="black"
									color="white"
									_hover={{ bg: "#333", color: "white" }}
									px={5}
									size="sm"
									onClick={() =>
										navigate(`/orders/mine/${order.id}`)
									}
								>
									Details
								</Button>
							</HStack>
						</Box>
					</Box>
				))}
			</HStack>
		</Box>
	);
};

export default MyOrders;
