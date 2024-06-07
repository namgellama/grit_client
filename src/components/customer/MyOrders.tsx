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
import { useGetMyOrdersQuery } from "../../app/features/order/orderApiSlice";
import { useAppSelector } from "../../app/hooks";
import { getStringDateTime } from "../../utilities/getStringDate";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
	const { user } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const { data: orders } = useGetMyOrdersQuery(user?.token || "");
	return (
		<HStack w="100%" flexWrap="wrap" justify="space-between" gap={8}>
			{orders?.map((order) => (
				<Box key={order.id} w="48%" bg="white" borderRadius={8}>
					<Box p={4}>
						<VStack justify="start" align="start">
							<Text fontSize="small" fontWeight="bold">
								Order ID: {order.id}
							</Text>
							<VStack align="start" w="100%">
								<Tag fontSize="small">
									{getStringDateTime(order.createdAt)}
								</Tag>
								<Tag>
									<Flex align="center" gap={1}>
										<MdLocationOn fontSize="medium" />

										<Text fontSize="small">{`${order.address?.addressLine1}, ${order.address?.city}, ${order.address?.country}`}</Text>
									</Flex>
								</Tag>
								<Badge colorScheme="green" fontSize="x-small">
									{order.status}
								</Badge>
							</VStack>
						</VStack>
					</Box>
					<Box bg="lightgray" p={4} borderBottomRadius={5}>
						<HStack justify="space-between" w="100%">
							<VStack align="start">
								<Text fontSize="small" fontWeight="bold">
									Rs. {order.total}
									<Text as="span" fontWeight="normal" ml={2}>
										({order.orderItems.length} items)
									</Text>
								</Text>

								<Flex gap={4} align="center">
									<Badge
										bg="gray"
										px={2}
										color="white"
										fontSize="x-small"
									>
										{order.payment.method}
									</Badge>
									<Badge fontSize="x-small">
										{order.payment.status}
									</Badge>
								</Flex>
							</VStack>
							<Button
								variant="solid"
								bg="black"
								color="white"
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
	);
};

export default MyOrders;
