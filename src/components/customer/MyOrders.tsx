import { useGetMyOrdersQuery } from "@/app/features/order/orderApiSlice";
import { useAppSelector } from "@/app/hooks";
import { ErrorMessage, FilterSort } from "@/components";
import { getOrderColor, getPaymentColor } from "@/utilities/getColor";
import { getStringDate } from "@/utilities/getStringDate";
import {
	Alert,
	AlertDescription,
	AlertIcon,
	Badge,
	Box,
	Button,
	Flex,
	HStack,
	Image,
	Spinner,
	Tag,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type SortOrder = "asc" | "desc";

const MyOrders = () => {
	const [orderStatusValue, setOrderStatusValue] = useState("");
	const [paymentStatusValue, setPaymentStatusValue] = useState("");
	const [sort, setSort] = useState<SortOrder>("desc");
	const { user } = useAppSelector((state) => state.auth);
	const navigate = useNavigate();

	const queryParams = {
		orderStatus: orderStatusValue ?? undefined,
		paymentStatus: paymentStatusValue ?? undefined,
		sortOrder: sort ?? undefined,
	};

	const {
		data: orders,
		isLoading,
		error,
	} = useGetMyOrdersQuery({ token: user?.token || "", query: queryParams });

	return (
		<Box flex={3} bg="white" p={3} borderRadius={5}>
			<Text
				textTransform="uppercase"
				fontWeight="bold"
				ml={3}
				fontSize="lg"
			>
				My Orders
			</Text>

			<FilterSort
				orderStatusValue={orderStatusValue}
				paymentStatusValue={paymentStatusValue}
				setOrderStatusValue={setOrderStatusValue}
				setPaymentStatusValue={setPaymentStatusValue}
				setSort={setSort}
				sort={sort}
			/>

			{isLoading ? (
				<Flex align="center" justify="center">
					<Spinner />
				</Flex>
			) : error ? (
				<ErrorMessage>Something went wrong</ErrorMessage>
			) : orders?.length === 0 ? (
				<Alert status="info" variant="solid">
					<AlertIcon />
					<AlertDescription>No Orders yet</AlertDescription>
				</Alert>
			) : (
				<Flex
					w="100%"
					flexWrap="wrap"
					justify="space-between"
					gap={6}
					px={2}
				>
					{orders?.map((order) => (
						<Box
							key={order.id}
							w={{ base: "100%", lg: "48.5%" }}
							bg="background.main"
							borderRadius={8}
							boxShadow="0 4px 8px #0000001a, 0 2px 8px #0000001a"
						>
							<Box p={4}>
								<Flex direction="column" gap={4}>
									<Flex
										direction={{
											base: "column",
											md: "row",
										}}
										justify="space-between"
										w="100%"
									>
										<Text
											fontSize="small"
											fontWeight="medium"
										>
											Order ID: {order.id}
										</Text>
										<Text>
											<Badge
												colorScheme={getOrderColor(
													order.status
												)}
												fontSize="x-small"
											>
												ORDER {order.status}
											</Badge>
										</Text>
									</Flex>

									<Flex
										direction={{
											base: "column",
											md: "row",
										}}
										justify="space-between"
										gap={2}
										w="100%"
									>
										<Text>
											<Tag fontSize="small">
												{getStringDate(order.createdAt)}
											</Tag>
										</Text>

										<Text>
											<Tag>
												<Flex align="center" gap={1}>
													<MdLocationOn fontSize="medium" />

													<Text fontSize="small">{`${order.address?.addressLine1}, ${order.address?.city}, ${order.address?.country}`}</Text>
												</Flex>
											</Tag>
										</Text>
									</Flex>

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
								</Flex>
							</Box>

							<HStack
								py={order.orderItems.length > 2 ? 4 : 0}
								px={4}
								wrap="wrap"
								justify="space-between"
								overflowY="scroll"
								className="scrollbarY"
								h={{ base: "160px", md: "100px" }}
								gap={3}
							>
								{order.orderItems.map((orderItem) => (
									<HStack
										key={orderItem.id}
										align="start"
										w="180px"
									>
										<Image
											w="50px"
											h="60px"
											objectFit="cover"
											src={
												orderItem?.product?.variants.find(
													(variant) =>
														variant.color ===
														orderItem.color
												)?.image
											}
											alt={orderItem?.product?.name}
										/>
										<VStack align="start" gap={0}>
											<Text fontSize="sm">
												{orderItem?.product?.name}
											</Text>
											<Text fontSize="sm">
												{orderItem.size} |{" "}
												{orderItem.color}
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
										<Text
											as="span"
											fontWeight="medium"
											ml={2}
										>
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
				</Flex>
			)}
		</Box>
	);
};

export default MyOrders;
