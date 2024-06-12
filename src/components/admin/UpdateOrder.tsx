import { Card, CardBody, Select, Text, VStack } from "@chakra-ui/react";
import { useUpdateOrderMutation } from "../../app/features/order/orderApiSlice";
import { useUpdatePaymentMutation } from "../../app/features/payment/paymentApiSlice";
import { useAppSelector } from "../../app/hooks";
import { Order } from "../../app/interfaces/order";
import { orderStatuses, paymentStatuses } from "../../utilities/data";

const UpdateOrder = ({ order }: { order?: Order }) => {
	const [updateOrder] = useUpdateOrderMutation();
	const [updatePayment] = useUpdatePaymentMutation();
	const { user } = useAppSelector((state) => state.auth);

	return (
		<Card>
			<CardBody>
				<VStack align="start" gap={4}>
					<Text fontWeight="medium">Update Order & Payment</Text>
					<VStack align="start" gap={2} w="100%">
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
								<option key={status.name} value={status.value}>
									{status.name}
								</option>
							))}
						</Select>
					</VStack>
					<VStack align="start" gap={2} w="100%">
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
								<option key={status.name} value={status.value}>
									{status.name}
								</option>
							))}
						</Select>
					</VStack>
				</VStack>
			</CardBody>
		</Card>
	);
};

export default UpdateOrder;
