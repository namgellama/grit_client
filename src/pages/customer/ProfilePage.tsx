import { MyContainer, MyOrders, Profile } from "@/components";
import { Flex } from "@chakra-ui/react";

const ProfilePage = () => {
	return (
		<MyContainer width="8xl" my={3}>
			<Flex direction={{ base: "column", xl: "row" }} gap={5}>
				<Profile />
				<MyOrders />
			</Flex>
		</MyContainer>
	);
};

export default ProfilePage;
