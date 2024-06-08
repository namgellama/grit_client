import {
	Badge,
	Box,
	Button,
	Flex,
	HStack,
	Image,
	Tag,
	Text,
	VStack,
} from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../app/features/order/orderApiSlice";
import { useAppSelector } from "../../app/hooks";
import { getOrderColor, getPaymentColor } from "../../utilities/getColor";
import { getStringDate } from "../../utilities/getStringDate";

const MyOrders = () => {
	const { user } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const {
		data: orders,
		isLoading,
		error,
	} = useGetMyOrdersQuery(user?.token || "");

	return (
		<Box flex={3} bg="white" p={3} borderRadius={5}>
			<Text
				textTransform="uppercase"
				fontWeight="bold"
				mb={7}
				ml={3}
				fontSize="lg"
			>
				My Orders
			</Text>

			<HStack
				w="100%"
				flexWrap="wrap"
				justify="space-between"
				gap={6}
				px={2}
			>
				{orders?.map((order) => (
					<Box
						key={order.id}
						w="48.5%"
						bg="background.main"
						borderRadius={8}
						boxShadow="0 4px 8px #0000001a, 0 2px 8px #0000001a"
					>
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
										{getStringDate(order.createdAt)}
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

						<HStack
							py={order.orderItems.length > 2 ? 4 : 0}
							px={4}
							wrap="wrap"
							justify="space-between"
							overflowY="scroll"
							className="scrollbar"
							h="100px"
							gap={3}
						>
							{order.orderItems.map((orderItem) => (
								<HStack align="start" w="200px">
									<Image
										w="50px"
										h="60px"
										objectFit="cover"
										src={
											orderItem.product.color.find(
												(color) =>
													color.colorName ===
													orderItem.color
											)?.image
										}
										alt={orderItem.product.name}
									/>
									<VStack align="start" gap={0}>
										<Text fontSize="sm">
											{orderItem.product.name}
										</Text>
										<Text fontSize="sm">
											{orderItem.size} | {orderItem.color}
										</Text>
										<Text fontSize="sm">
											Rs. {orderItem.unitPrice} x{" "}
											{orderItem.quantity}
										</Text>
									</VStack>
								</HStack>
							))}
						</HStack>

						<Box
							bg="background.50"
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
