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

const CheckoutForm = () => {
	return (
		<Box flex={1} px={5}>
			<Heading fontSize="larger" letterSpacing={1}>
				Delivery
			</Heading>
			<VStack as="form" spacing={7} w="100%" my={5}>
				<FormControl>
					<FormLabel>Address Line 1*</FormLabel>
					<Input
						type="text"
						variant="filled"
						background="white"
						placeholder="Swoyambhu"
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Address Line 2*</FormLabel>
					<Input
						type="text"
						variant="filled"
						background="white"
						placeholder="Near Ward no 15"
					/>
				</FormControl>

				<FormControl>
					<FormLabel>City*</FormLabel>
					<Select
						placeholder="Select city"
						variant="filled"
						background="white"
					>
						<option>Kathmandu</option>
						<option>Lalitpur</option>
						<option>Bhaktapur</option>
						<option>Other</option>
					</Select>
				</FormControl>

				<FormControl>
					<FormLabel>Postal code</FormLabel>
					<Input
						type="text"
						variant="filled"
						background="white"
						placeholder="Enter your phone number"
					/>
				</FormControl>

				<FormControl>
					<FormLabel>Country*</FormLabel>
					<Select value="Nepal" variant="filled" background="white">
						<option>Nepal</option>
					</Select>
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
