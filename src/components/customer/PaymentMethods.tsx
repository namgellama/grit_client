import { Heading, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { paymentMethods } from "../../utilities/data";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormFields } from "../../validations/checkoutValidation";
import { InputErrorMessage } from "..";

interface Props {
	register: UseFormRegister<FormFields>;
	errors: FieldErrors<FormFields>;
}

const PaymentMethods = ({ register, errors }: Props) => {
	return (
		<>
			<Heading fontSize="larger" letterSpacing={1}>
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
		</>
	);
};

export default PaymentMethods;
