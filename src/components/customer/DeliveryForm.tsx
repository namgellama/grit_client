import {
	Flex,
	FormControl,
	FormLabel,
	Heading,
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
}

const DeliveryForm = ({ register, errors }: Props) => {
	return (
		<Flex direction="column" w="100%">
			<Heading fontSize="larger" letterSpacing={1}>
				Delivery
			</Heading>

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
					<InputErrorMessage>{errors.city.message}</InputErrorMessage>
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
		</Flex>
	);
};

export default DeliveryForm;