import { Button, HStack, Spinner, useToast, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
	useDeleteBagItemsMutation,
	useGetBagItemsQuery,
} from "../../app/features/bagItem/bagItemApiSlice";
import { useCreateOrderMutation } from "../../app/features/order/orderApiSlice";
import { useAppSelector } from "../../app/hooks";
import {
	BagItems,
	DeliveryForm,
	MyContainer,
	PaymentMethods,
} from "../../components";
import { cities } from "../../utilities/data";
import {
	checkoutSchema,
	FormFields,
} from "../../validations/checkoutValidation";

const CheckoutPage = () => {
	const [subTotal, setSubTotal] = useState(0);
	const [deliveryCharge, setDeliveryCharge] = useState(0);
	const [total, setTotal] = useState(0);
	const { user } = useAppSelector((state) => state.auth);
	const {
		data: bagItems,
		isLoading,
		error,
	} = useGetBagItemsQuery(user?.token ?? "");
	const [createOrder] = useCreateOrderMutation();
	const [deleteBagItems] = useDeleteBagItemsMutation();
	const navigate = useNavigate();
	const toast = useToast();
	const {
		register,
		handleSubmit,
		getValues,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(checkoutSchema),
	});

	useEffect(() => {
		if (bagItems?.length === 0) navigate("/");
	}, [bagItems, navigate]);

	useEffect(() => {
		const result = bagItems?.reduce(
			(acc, curr) => (acc += curr.unitTotalPrice),
			0
		);
		setSubTotal(result!);
	}, [bagItems]);

	useEffect(() => {
		const cityName = getValues("city");
		const result = cities.find((city) => city.name === cityName)?.value;
		setDeliveryCharge(result!);
	}, [getValues, cities]);

	useEffect(() => {
		setTotal(subTotal + deliveryCharge);
	}, [subTotal, deliveryCharge]);

	useEffect(() => {
		if (errors.root?.message)
			toast({
				title: errors.root.message,
				duration: 1200,
				isClosable: true,
				status: "error",
				position: "top-right",
			});
	}, [errors.root]);

	const onSubmit = async (order: FormFields) => {
		const data = {
			orderItems: bagItems!,
			subTotal,
			deliveryCharge,
			total,
			address: {
				addressLine1: order.addressLine1,
				addressLine2: order.addressLine2,
				city: order.city,
				postalCode: order.postalCode,
				country: order.country,
			},
			payment: {
				amount: total,
				method: order.paymentMethod,
			},
		};

		try {
			if (user) {
				const result = await createOrder({
					data,
					token: user?.token,
				}).unwrap();

				await deleteBagItems(user?.token).unwrap();
				navigate(`/orders/mine/${result.id}`);
			}
		} catch (error) {
			setError("root", {
				message: "Something went wrong",
			});
		}
	};

	return (
		<MyContainer width="5xl">
			<HStack justify="space-between" spacing={10} align="start" h="100%">
				<VStack
					as="form"
					flex={1}
					gap={9}
					align="start"
					bg="background.main"
					py={8}
					px={10}
					borderRadius={5}
					onSubmit={handleSubmit(onSubmit)}
				>
					<DeliveryForm
						register={register}
						errors={errors}
						setDeliveryCharge={setDeliveryCharge}
					/>
					<PaymentMethods register={register} errors={errors} />

					<Button
						type="submit"
						variant="solid"
						colorScheme="messenger"
						w="full"
						disabled={isSubmitting}
					>
						{isSubmitting ? <Spinner /> : "Order"}
					</Button>
				</VStack>

				<BagItems
					bagItems={bagItems}
					deliveryCharge={deliveryCharge}
					total={total}
				/>
			</HStack>
		</MyContainer>
	);
};

export default CheckoutPage;
