import { useCreateOrderMutation } from "@/app/features/order/orderApiSlice";
import { useAppSelector } from "@/app/hooks";
import { BagItem } from "@/app/interfaces/bagItem";
import { OrderItemRequest } from "@/app/interfaces/order";
import {
	BagItems,
	DeliveryForm,
	MyContainer,
	PaymentMethods,
} from "@/components";
import { cities } from "@/utilities/data";
import { checkoutSchema, FormFields } from "@/validations/checkoutValidation";
import { Button, Flex, Spinner, useToast, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
	const [subTotal, setSubTotal] = useState(0);
	const [deliveryCharge, setDeliveryCharge] = useState(0);
	const [total, setTotal] = useState(0);
	const { user } = useAppSelector((state) => state.auth);
	const [createOrder] = useCreateOrderMutation();
	const navigate = useNavigate();
	const toast = useToast();
	const [cookies, _, removeCookie] = useCookies<
		"bagItems",
		{ bagItems: BagItem[] }
	>(["bagItems"]);
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
		if (cookies.bagItems?.length === 0) navigate("/");
	}, [cookies.bagItems, navigate]);

	useEffect(() => {
		const result = cookies.bagItems?.reduce(
			(acc, curr) => (acc += curr.unitTotalPrice),
			0
		);
		setSubTotal(result!);
	}, [cookies.bagItems]);

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
		const orderItems: OrderItemRequest[] = cookies.bagItems.map((x) => ({
			productId: x.id,
			quantity: x.quantity,
			unitPrice: x.unitPrice,
			unitTotalPrice: x.unitTotalPrice,
			size: x.size,
			color: x.color,
		}));

		const data = {
			orderItems,
			subTotal,
			deliveryCharge,
			total,
			address: {
				addressLine1: order.addressLine1,
				addressLine2: order.addressLine2,
				city: order.city,
				postalCode: order.postalCode,
				country: order.country,
				phoneNumber: order.phoneNumber,
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

				removeCookie("bagItems");
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
			<Flex
				justify="space-between"
				direction={{ base: "column", md: "row" }}
				gap={10}
				align={{ base: "normal", md: "start" }}
				h="100%"
			>
				<VStack
					as="form"
					flex={1}
					gap={9}
					align="start"
					bg="background.main"
					py={8}
					px={{ base: 3, lg: 10 }}
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
					bagItems={cookies.bagItems}
					deliveryCharge={deliveryCharge}
					total={total}
				/>
			</Flex>
		</MyContainer>
	);
};

export default CheckoutPage;
