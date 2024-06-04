import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Select,
	VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	BagItem,
	useDeleteBagItemsMutation,
} from "../../app/bagItem/bagItemApiSlice";
import {
	Address,
	Order,
	useCreateOrderMutation,
} from "../../app/order/orderApiSlice";
import { cities, countries } from "../../utilities/data";
import {
	deliverySchema,
	FormFields,
} from "../../validations/deliveryValidation";
import InputErrorMessage from "../shared/InputErrorMessage";
import { CurrentUser, User } from "../../app/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

interface Props {
	bagItems: BagItem[];
	user: CurrentUser | null;
}

const CheckoutForm = ({ bagItems, user }: Props) => {
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(deliverySchema),
	});

	const [createOrder] = useCreateOrderMutation();
	const [deleteBagItems] = useDeleteBagItemsMutation();
	const navigate = useNavigate();

	const onSubmit = async (addressData: Address) => {
		const totalPrice = bagItems?.reduce(
			(acc, curr) => (acc += curr.unitTotalPrice),
			0
		);
		const data = {
			orderItems: bagItems,
			totalPrice,
			address: addressData,
		};

		try {
			if (user) {
				await createOrder({
					data,
					token: user?.token,
				}).unwrap();

				await deleteBagItems(user?.token).unwrap();
				navigate("/");
			}
		} catch (error) {
			setError("root", {
				message: "Something went wrong",
			});
		}
	};

	return (
		<Box flex={1} px={5}>
			<Heading fontSize="larger" letterSpacing={1}>
				Delivery
			</Heading>
			<VStack
				as="form"
				spacing={7}
				w="100%"
				my={5}
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormControl>
					<FormLabel>Address Line 1*</FormLabel>
					<Input
						type="text"
						variant="filled"
						background="white"
						placeholder="Swoyambhu"
						{...register("addressLine1")}
					/>
					{errors.addressLine1 && (
						<InputErrorMessage>
							{errors.addressLine1.message}
						</InputErrorMessage>
					)}
				</FormControl>

				<FormControl>
					<FormLabel>Address Line 2*</FormLabel>
					<Input
						type="text"
						variant="filled"
						background="white"
						placeholder="Near Ward no 15"
						{...register("addressLine2")}
					/>
					{errors.addressLine2 && (
						<InputErrorMessage>
							{errors.addressLine2.message}
						</InputErrorMessage>
					)}
				</FormControl>

				<FormControl>
					<FormLabel>City*</FormLabel>
					<Select
						variant="filled"
						background="white"
						{...register("city")}
					>
						{cities.map((city) => (
							<option key={city}>{city}</option>
						))}
					</Select>
					{errors.city && (
						<InputErrorMessage>
							{errors.city.message}
						</InputErrorMessage>
					)}
				</FormControl>

				<FormControl>
					<FormLabel>Postal code</FormLabel>
					<Input
						type="text"
						variant="filled"
						background="white"
						placeholder="Enter your postal code"
						{...register("postalCode")}
					/>
					{errors.postalCode && (
						<InputErrorMessage>
							{errors.postalCode.message}
						</InputErrorMessage>
					)}
				</FormControl>

				<FormControl>
					<FormLabel>Country*</FormLabel>
					<Select
						value="Nepal"
						variant="filled"
						background="white"
						{...register("country")}
					>
						{countries.map((country) => (
							<option key={country}>{country}</option>
						))}
					</Select>
					{errors.country && (
						<InputErrorMessage>
							{errors.country.message}
						</InputErrorMessage>
					)}
				</FormControl>

				<Button
					type="submit"
					variant="solid"
					colorScheme="messenger"
					w="full"
				>
					Order
				</Button>
			</VStack>
		</Box>
	);
};

export default CheckoutForm;
