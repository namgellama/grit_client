import { useGetMyOrderQuery } from "@/app/features/order/orderApiSlice";
import { useAppSelector } from "@/app/hooks";
import { ErrorMessage, MyContainer } from "@/components";
import { getOrderColor, getPaymentColor } from "@/utilities/getColor";
import { getStringDateTime } from "@/utilities/getStringDate";
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
	Skeleton,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const MyOrderDetailPage = () => {
	const { id } = useParams();
	const { user } = useAppSelector((state) => state.auth);

	const {
		data: order,
		isLoading,
		error,
	} = useGetMyOrderQuery({
		id: id ?? "",
		token: user?.token ?? "",
	});

	return (
		<MyContainer width="4xl">
			<Card>
				{error ? (
					<ErrorMessage>Something went wrong</ErrorMessage>
				) : (
					<CardBody>
						<Skeleton
							isLoaded={!isLoading}
							w={{ base: "100%", md: "60%" }}
						>
							<Flex direction="column" gap={2}>
								<Heading
									fontSize="md"
									textTransform="uppercase"
								>
									Order ID:{" "}
									<Text as="span" textTransform="none">
										{id}
									</Text>
								</Heading>
								<Text fontSize="sm" fontWeight="medium">
									Order Date:{" "}
									{order &&
										getStringDateTime(order?.createdAt)}
								</Text>
								<Text fontSize="sm" fontWeight="medium">
									Order Status:
									<Badge
										colorScheme={getOrderColor(
											order?.status!
										)}
										ml={2}
										fontSize="xxs"
									>
										{order?.status}
									</Badge>
								</Text>
							</Flex>
						</Skeleton>

						<Divider borderColor="background.400" my={6} />

						<Skeleton isLoaded={!isLoading}>
							<VStack
								align="start"
								gap={5}
								h={
									order?.orderItems.length! > 4
										? "400px"
										: "100%"
								}
								overflowY="scroll"
								className="scrollbarY"
								pr={order?.orderItems.length! > 4 ? 4 : 0}
							>
								{order?.orderItems.map((orderItem) => (
									<HStack
										key={orderItem.id}
										w="100%"
										align="start"
									>
										<Image
											src={
												orderItem.product.variants.find(
													(variant) =>
														variant.color ===
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
												<Text
													fontSize="sm"
													fontWeight="medium"
												>
													{orderItem.product.name}
												</Text>
												<Text
													fontSize="sm"
													fontWeight="medium"
												>
													{orderItem.color} |{" "}
													{orderItem.size}
												</Text>
												<Text
													fontSize="sm"
													fontWeight="medium"
												>
													Rs. {orderItem.unitPrice} x{" "}
													{orderItem.quantity}
												</Text>
											</VStack>
											<Text
												fontWeight="bold"
												fontSize="sm"
											>
												Rs. {orderItem.unitTotalPrice}
											</Text>
										</HStack>
									</HStack>
								))}
							</VStack>
						</Skeleton>

						<Divider borderColor="background.400" my={6} />

						<Skeleton isLoaded={!isLoading}>
							<Flex direction="column" gap={0.5}>
								<Text
									fontWeight="bold"
									mb={2}
									textTransform="uppercase"
								>
									Order Summary
								</Text>
								<HStack justify="space-between">
									<Text
										fontSize={{
											base: "md",
											md: "sm",
										}}
										fontWeight="medium"
									>
										Subtotal
									</Text>
									<Text
										fontSize={{
											base: "md",
											md: "sm",
										}}
										fontWeight="medium"
									>
										Rs. {order?.subTotal}
									</Text>
								</HStack>
								<HStack justify="space-between">
									<Text
										fontSize={{
											base: "md",
											md: "sm",
										}}
										fontWeight="medium"
									>
										Delivery
									</Text>
									<Text
										fontSize={{
											base: "md",
											md: "sm",
										}}
										fontWeight="medium"
									>
										Rs. {order?.deliveryCharge}
									</Text>
								</HStack>
								<HStack justify="space-between">
									<Text
										fontSize={{
											base: "md",
											md: "sm",
										}}
										fontWeight="bold"
									>
										Total
									</Text>
									<Text
										fontSize={{
											base: "md",
											md: "sm",
										}}
										fontWeight="bold"
									>
										Rs. {order?.total}
									</Text>
								</HStack>
							</Flex>
						</Skeleton>

						<Divider borderColor="background.400" my={6} />

						<Skeleton isLoaded={!isLoading}>
							<Flex
								direction={{ base: "column", md: "row" }}
								gap={5}
								justify="space-between"
							>
								<Flex direction="column">
									<Text
										fontWeight="bold"
										textTransform="uppercase"
									>
										Payment
									</Text>
									<Box>
										<Text
											fontSize={{ base: "md", md: "sm" }}
											fontWeight="medium"
										>
											Method: {order?.payment.method}
										</Text>
										<Text
											fontSize={{ base: "md", md: "sm" }}
											fontWeight="medium"
										>
											Status:
											<Badge
												colorScheme={getPaymentColor(
													order?.payment.status!
												)}
												ml={2}
												fontSize={{
													base: "sm",
													md: "xxs",
												}}
											>
												{order?.payment.status}
											</Badge>
										</Text>
									</Box>
								</Flex>
								<Flex direction="column">
									<Text
										fontWeight="bold"
										textTransform="uppercase"
										textAlign={{ base: "left", md: "end" }}
									>
										Delivery
									</Text>
									<Text
										fontWeight="medium"
										fontSize={{ base: "md", md: "sm" }}
										textAlign={{ base: "left", md: "end" }}
									>
										{order?.address?.addressLine1},{" "}
										{order?.address?.addressLine2}
									</Text>
									<Text
										fontWeight="medium"
										fontSize={{ base: "md", md: "sm" }}
										textAlign={{ base: "left", md: "end" }}
									>
										{order?.address?.city},{" "}
										{order?.address?.country}
										{order?.address?.postalCode &&
											` - ${order?.address?.postalCode}`}
									</Text>
								</Flex>
							</Flex>
						</Skeleton>
					</CardBody>
				)}
			</Card>
		</MyContainer>
	);
};

export default MyOrderDetailPage;
