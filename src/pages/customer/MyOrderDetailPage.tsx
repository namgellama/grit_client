import { useParams } from "react-router-dom";
import { useGetMyOrderQuery } from "../../app/features/order/orderApiSlice";
import { useAppSelector } from "../../app/hooks";
import { MyContainer } from "../../components";
import {
	Heading,
	HStack,
	Text,
	VStack,
	Image,
	Divider,
	Flex,
	Box,
	Card,
	CardBody,
	Badge,
} from "@chakra-ui/react";
import { getStringDateTime } from "../../utilities/getStringDate";

const MyOrderDetailPage = () => {
	const { id } = useParams();
	const { user } = useAppSelector((state) => state.auth);

	const { data: order } = useGetMyOrderQuery({
		id: id ?? "",
		token: user?.token ?? "",
	});

	return (
		<MyContainer width="4xl">
			<Card>
				<CardBody>
					<Flex direction="column" gap={4}>
						<Heading fontSize="large">Order ID: {id}</Heading>
						<Text>
							Order Date:{" "}
							{order && getStringDateTime(order?.createdAt)}
						</Text>
						<Text>
							Order Status:
							<Badge colorScheme="green" ml={2}>
								{order?.status}
							</Badge>
						</Text>
					</Flex>

					<Divider borderColor="gray" my={8} />

					<VStack align="start" gap={3}>
						{order?.orderItems.map((orderItem) => (
							<HStack key={orderItem.id} w="100%">
								<Image
									src={
										orderItem.product.color.find(
											(color) =>
												color.colorName ===
												orderItem.color
										)?.image
									}
									alt={orderItem.product.name}
									w="80px"
									h="80px"
									objectFit="cover"
								/>
								<HStack justify="space-between" w="100%">
									<VStack align="start">
										<Text>{orderItem.product.name}</Text>
										<Text>
											{orderItem.color} | {orderItem.size}
										</Text>
									</VStack>
									<VStack justifySelf="end">
										<Text
											fontWeight="bold"
											fontSize="small"
										>
											Rs. {orderItem.unitTotalPrice}
										</Text>
										<Text fontSize="small">
											Rs. {orderItem.unitPrice} x{" "}
											{orderItem.quantity}
										</Text>
									</VStack>
								</HStack>
							</HStack>
						))}
					</VStack>

					<Divider borderColor="gray" my={8} />

					<Box>
						<Text fontWeight="bold" mb={2}>
							Order Summary
						</Text>
						<HStack justify="space-between">
							<Text fontSize="small">Subtotal</Text>
							<Text fontSize="small">Rs. {order?.subTotal}</Text>
						</HStack>
						<HStack justify="space-between">
							<Text fontSize="small">Delivery</Text>
							<Text fontSize="small">
								Rs. {order?.deliveryCharge}
							</Text>
						</HStack>
						<HStack justify="space-between">
							<Text fontSize="small">Total</Text>
							<Text fontSize="small" fontWeight="bold">
								Rs. {order?.total}
							</Text>
						</HStack>
					</Box>

					<Divider borderColor="gray" my={8} />

					<HStack justify="space-between" align="start">
						<Box>
							<Text fontWeight="bold" mb={2}>
								Payment
							</Text>
							<Text>
								{order?.payment.method}
								<Badge colorScheme="green" ml={4}>
									{order?.payment.status}
								</Badge>
							</Text>
						</Box>
						<Box>
							<Text fontWeight="bold" mb={2}>
								Delivery
							</Text>
							<Text>
								{order?.address?.addressLine1},{" "}
								{order?.address?.addressLine2}
							</Text>
							<Text>
								{order?.address?.city},{" "}
								{order?.address?.country}
								{order?.address?.postalCode &&
									`- ${order?.address?.postalCode}`}
							</Text>
						</Box>
					</HStack>
				</CardBody>
			</Card>
		</MyContainer>
	);
};

export default MyOrderDetailPage;
