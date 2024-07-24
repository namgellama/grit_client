import { MyContainer, MyOrders, Profile } from "@/components";
import { HStack } from "@chakra-ui/react";

const AccountPage = () => {
	return (
		<MyContainer width="8xl" my={3}>
			<HStack align="start" gap={5} px={2}>
				<Profile />
				<MyOrders />
			</HStack>
		</MyContainer>
	);
};

export default AccountPage;
