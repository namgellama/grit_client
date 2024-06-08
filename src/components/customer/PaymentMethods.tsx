import { Flex, Heading, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { InputErrorMessage } from "..";
import { paymentMethods } from "../../utilities/data";
import { FormFields } from "../../validations/checkoutValidation";

interface Props {
	register: UseFormRegister<FormFields>;
	errors: FieldErrors<FormFields>;
}

const PaymentMethods = ({ register, errors }: Props) => {
	return (
		<Flex direction="column" gap={3}>
			<Heading fontSize="lg" letterSpacing={1}>
				Payment Method
			</Heading>
			<RadioGroup defaultValue={paymentMethods[0].value}>
				<Stack>
					{paymentMethods.map((method) => (
						<Radio
							key={method.name}
							size="md"
							colorScheme="green"
							value={method.value}
							borderColor="gray"
							{...register("paymentMethod")}
						>
							{method.name}
						</Radio>
					))}
					{errors.paymentMethod && (
						<InputErrorMessage>
							{errors.paymentMethod.message}
						</InputErrorMessage>
					)}
				</Stack>
			</RadioGroup>
		</Flex>
	);
};

export default PaymentMethods;
