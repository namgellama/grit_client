import { Center, Divider, HStack } from "@chakra-ui/react";
import { BagItems, CheckoutForm, MyContainer } from "../../components";

const CheckoutPage = () => {
	return (
		<MyContainer width="5xl">
			<HStack justify="space-between" spacing={10} align="start" h="100%">
				<CheckoutForm />
				<Center height="90vh" borderColor="gray">
					<Divider orientation="vertical" />
				</Center>
				<BagItems />
			</HStack>
		</MyContainer>
	);
};

export default CheckoutPage;
