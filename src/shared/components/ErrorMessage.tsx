import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";
import { ReactNode } from "react";

const ErrorMessage = ({ children }: { children: ReactNode }) => {
	return (
		<Alert status="error" variant="solid">
			<AlertIcon />
			<AlertDescription>{children}</AlertDescription>
		</Alert>
	);
};

export default ErrorMessage;
