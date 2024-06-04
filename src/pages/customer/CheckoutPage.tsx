import { Center, Divider, HStack } from "@chakra-ui/react";
import { useGetBagItemsQuery } from "../../app/bagItem/bagItemApiSlice";
import { useAppSelector } from "../../app/hooks";
import { BagItems, CheckoutForm, MyContainer } from "../../components";

const CheckoutPage = () => {
	const { user } = useAppSelector((state) => state.auth);
	const {
		data: bagItems,
		isLoading,
		error,
	} = useGetBagItemsQuery(user?.token ?? "");

	return (
		<MyContainer width="5xl">
			<HStack justify="space-between" spacing={10} align="start" h="100%">
				<CheckoutForm bagItems={bagItems ?? []} user={user || null} />
				<Center height="90vh" borderColor="gray">
					<Divider orientation="vertical" />
				</Center>
				<BagItems bagItems={bagItems ?? []} />
			</HStack>
		</MyContainer>
	);
};

export default CheckoutPage;
