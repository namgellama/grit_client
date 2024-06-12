import {
	Badge,
	Box,
	Card,
	CardBody,
	Divider,
	Flex,
	Heading,
	HStack,
	Image,
	Select,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
	useGetOrderQuery,
	useUpdateOrderMutation,
} from "../../app/features/order/orderApiSlice";
import { useUpdatePaymentMutation } from "../../app/features/payment/paymentApiSlice";
import { useAppSelector } from "../../app/hooks";
import { orderStatuses, paymentStatuses } from "../../utilities/data";
import { getOrderColor, getPaymentColor } from "../../utilities/getColor";
import { getHeight } from "../../utilities/getHeight";
import { getStringDateTime } from "../../utilities/getStringDate";

const AdminOrderDetailPage = () => {
	const { id } = useParams();
	const { user } = useAppSelector((state) => state.auth);

	const { data: order } = useGetOrderQuery({
		id: id ?? "",
		token: user?.token ?? "",
	});

	const [updateOrder] = useUpdateOrderMutation();
	const [updatePayment] = useUpdatePaymentMutation();

	return (
		<Flex px={3} my={2} gap={3}>
			<Card flex={2}>
				<CardBody>
					<Flex direction="column" gap={4}>
						<Heading fontSize="md" textTransform="uppercase">
							Order ID:{" "}
							<Text as="span" textTransform="none">
								{id}
							</Text>
						</Heading>
						<Text fontSize="sm" fontWeight="medium">
							Order Date:{" "}
							{order && getStringDateTime(order?.createdAt)}
						</Text>
						<Text fontSize="sm" fontWeight="medium">
							Order Status:
							<Badge
								colorScheme={getOrderColor(order?.status!)}
								ml={2}
								fontSize="xxs"
							>
								{order?.status}
							</Badge>
						</Text>
					</Flex>

					<Divider borderColor="background.400" my={8} />

					<VStack
						align="start"
						gap={5}
						h={getHeight(order?.orderItems.length!)}
						overflowY="scroll"
						className="scrollbar"
						pr={order?.orderItems.length! >= 4 ? 4 : 0}
					>
						{order?.orderItems.map((orderItem) => (
							<HStack key={orderItem.id} w="100%" align="start">
								<Image
									src={
										orderItem.product.color.find(
											(color) =>
												color.colorName ===
												orderItem.color
										)?.image
									}
									alt={orderItem.product.name}
									w="70px"
									h="70px"
									objectFit="cover"
								/>
								<HStack
									justify="space-between"
									w="100%"
									align="end"
								>
									<VStack align="start" gap={0.5}>
										<Text fontSize="sm" fontWeight="medium">
											{orderItem.product.name}
										</Text>
										<Text fontSize="sm" fontWeight="medium">
											{orderItem.color} | {orderItem.size}
										</Text>
										<Text fontSize="sm" fontWeight="medium">
											Rs. {orderItem.unitPrice} x{" "}
											{orderItem.quantity}
										</Text>
									</VStack>
									<Text fontWeight="bold" fontSize="sm">
										Rs. {orderItem.unitTotalPrice}
									</Text>
								</HStack>
							</HStack>
						))}
					</VStack>

					<Divider borderColor="background.400" my={8} />

					<Flex direction="column" gap={0.5}>
						<Text
							fontWeight="bold"
							mb={2}
							textTransform="uppercase"
						>
							Order Summary
						</Text>
						<HStack justify="space-between">
							<Text fontSize="sm" fontWeight="medium">
								Subtotal
							</Text>
							<Text fontSize="sm" fontWeight="medium">
								Rs. {order?.subTotal}
							</Text>
						</HStack>
						<HStack justify="space-between">
							<Text fontSize="sm" fontWeight="medium">
								Delivery
							</Text>
							<Text fontSize="sm" fontWeight="medium">
								Rs. {order?.deliveryCharge}
							</Text>
						</HStack>
						<HStack justify="space-between">
							<Text fontSize="sm" fontWeight="bold">
								Total
							</Text>
							<Text fontSize="sm" fontWeight="bold">
								Rs. {order?.total}
							</Text>
						</HStack>
					</Flex>
				</CardBody>
			</Card>

			<Flex direction="column" flex={1.6} gap={3}>
				<Card>
					<CardBody>
						<HStack justify="space-between" align="start">
							<Box>
								<Text
									fontWeight="bold"
									mb={2}
									textTransform="uppercase"
								>
									Payment
								</Text>
								<Text fontSize="sm" fontWeight="medium">
									Method: {order?.payment.method}
								</Text>
								<Text fontSize="sm" fontWeight="medium">
									Status:
									<Badge
										colorScheme={getPaymentColor(
											order?.payment.status!
										)}
										ml={2}
										fontSize="xxs"
									>
										{order?.payment.status}
									</Badge>
								</Text>
							</Box>
							<Box>
								<Text
									fontWeight="bold"
									mb={2}
									textTransform="uppercase"
									textAlign="end"
								>
									Delivery
								</Text>
								<Text
									fontWeight="medium"
									fontSize="sm"
									textAlign="end"
								>
									{order?.address?.addressLine1},{" "}
									{order?.address?.addressLine2}
								</Text>
								<Text
									fontWeight="medium"
									fontSize="sm"
									textAlign="end"
								>
									{order?.address?.city},{" "}
									{order?.address?.country}
									{order?.address?.postalCode &&
										` - ${order?.address?.postalCode}`}
								</Text>
							</Box>
						</HStack>

						<Divider borderColor="background.400" my={8} />

						<Flex direction="column" gap={0.5}>
							<Text
								fontWeight="bold"
								mb={2}
								textTransform="uppercase"
							>
								Customer
							</Text>
							<HStack justify="space-between">
								<Text fontSize="sm" fontWeight="medium">
									Name
								</Text>
								<Text fontSize="sm" fontWeight="medium">
									{order?.user.name}
								</Text>
							</HStack>
							<HStack justify="space-between">
								<Text fontSize="sm" fontWeight="medium">
									Phone
								</Text>
								<Text fontSize="sm" fontWeight="medium">
									{order?.user.phoneNumber}
								</Text>
							</HStack>
							<HStack justify="space-between">
								<Text fontSize="sm" fontWeight="medium">
									Email
								</Text>
								<Text fontSize="sm" fontWeight="medium">
									{order?.user.email}
								</Text>
							</HStack>
						</Flex>
					</CardBody>
				</Card>

				<Card>
					<CardBody>
						<VStack align="start" gap={4}>
							<VStack align="start" gap={2} w="100%">
								<Text>Update Order Status</Text>
								<Select
									value={order?.status}
									onChange={async (e) =>
										await updateOrder({
											id: order?.id ?? "",
											data: { status: e.target.value },
											token: user?.token ?? "",
										}).unwrap()
									}
								>
									{orderStatuses.map((status) => (
										<option
											key={status.name}
											value={status.value}
										>
											{status.name}
										</option>
									))}
								</Select>
							</VStack>
							<VStack align="start" gap={2} w="100%">
								<Text>Update Payment Status</Text>
								<Select
									value={order?.payment.status}
									onChange={async (e) =>
										await updatePayment({
											id: order?.id ?? "",
											data: { status: e.target.value },
											token: user?.token ?? "",
										}).unwrap()
									}
								>
									{paymentStatuses.map((status) => (
										<option
											key={status.name}
											value={status.value}
										>
											{status.name}
										</option>
									))}
								</Select>
							</VStack>
						</VStack>
					</CardBody>
				</Card>
			</Flex>
		</Flex>
	);
};

export default AdminOrderDetailPage;