import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

const InputErrorMessage = ({ children }: { children: ReactNode }) => {
	return (
		<Text as="p" color="red" mt={1}>
			{children}
		</Text>
	);
};

export default InputErrorMessage;
