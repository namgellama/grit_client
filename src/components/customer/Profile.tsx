import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useAppSelector } from "../../app/hooks";
import { useGetMyCurrentAddressQuery } from "../../app/features/address/addressApiSlice";

const Profile = () => {
	const { user } = useAppSelector((state) => state.auth);
	const {
		data: address,
		isLoading,
		error,
	} = useGetMyCurrentAddressQuery(user?.token ?? "");

	return (
		<Box>
			<HStack gap={4}>
				<Avatar name={user?.name} src="" bg="black" />
				<VStack align="start" gap={1}>
					<Text textTransform="uppercase" fontWeight="bold">
						{user?.name}
					</Text>
					<Text fontWeight="medium" fontSize="sm">
						{user?.email}
					</Text>
					<Text fontWeight="medium" fontSize="sm">
						{user?.phoneNumber}
					</Text>
				</VStack>
			</HStack>
			<Box my={10}>
				<Text
					fontWeight="bold"
					textTransform="uppercase"
					letterSpacing={0.5}
				>
					Address Book
				</Text>
				<VStack align="start" mt={2} gap={0}>
					<Text fontSize="sm" fontWeight="medium">
						{address?.addressLine1}
					</Text>
					<Text fontSize="sm" fontWeight="medium">
						{address?.addressLine2}
					</Text>
					<Text fontSize="sm" fontWeight="medium">
						{address?.city}
					</Text>
					<Text fontSize="sm" fontWeight="medium">
						{address?.country}{" "}
						{address?.postalCode && `- ${address?.postalCode}`}
					</Text>
				</VStack>
			</Box>
		</Box>
	);
};

export default Profile;
