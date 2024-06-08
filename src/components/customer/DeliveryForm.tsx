import {
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Select,
} from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { cities, countries } from "../../utilities/data";
import { FormFields } from "../../validations/checkoutValidation";
import InputErrorMessage from "../shared/InputErrorMessage";

interface Props {
	register: UseFormRegister<FormFields>;
	errors: FieldErrors<FormFields>;
	setDeliveryCharge: (value: number) => void;
}

const DeliveryForm = ({ register, errors, setDeliveryCharge }: Props) => {
	return (
		<Flex direction="column" w="100%" gap={3}>
			<Heading fontSize="lg" letterSpacing={1}>
				Delivery
			</Heading>

			<FormControl>
				<FormLabel>Address Line 1*</FormLabel>
				<Input
					type="text"
					variant="filled"
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
					{...register("city")}
					onChange={(e) => {
						const deliveryCharge = cities.find(
							(city) => city.name === e.target.value
						)?.value;
						setDeliveryCharge(deliveryCharge!);
					}}
				>
					{cities.map((city) => (
						<option key={city.name}>{city.name}</option>
					))}
				</Select>
				{errors.city && (
					<InputErrorMessage>{errors.city.message}</InputErrorMessage>
				)}
			</FormControl>

			<HStack gap={4}>
				<FormControl flex={2}>
					<FormLabel>Country*</FormLabel>
					<Select
						value="Nepal"
						variant="filled"
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
				<FormControl flex={3}>
					<FormLabel>Postal code</FormLabel>
					<Input
						type="text"
						variant="filled"
						placeholder="Enter your postal code"
						{...register("postalCode")}
					/>
					{errors.postalCode && (
						<InputErrorMessage>
							{errors.postalCode.message}
						</InputErrorMessage>
					)}
				</FormControl>
			</HStack>
		</Flex>
	);
};

export default DeliveryForm;
