import { Avatar, Box, HStack, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useGetMyCurrentAddressQuery } from "../../app/features/address/addressApiSlice";
import { useAppSelector } from "../../app/hooks";
import ErrorMessage from "../shared/ErrorMessage";

const Profile = () => {
	const { user } = useAppSelector((state) => state.auth);
	const {
		data: address,
		isLoading,
		error,
	} = useGetMyCurrentAddressQuery(user?.token ?? "");

	return (
		<Box flex={1}>
			{error ? (
				<ErrorMessage>Something went wrong</ErrorMessage>
			) : (
				<>
					<Skeleton isLoaded={!isLoading}>
						<HStack gap={4} bg="white" p={3} borderRadius={5}>
							<Avatar name={user?.name} src="" bg="black" />
							<VStack align="start" gap={1}>
								<Text
									textTransform="uppercase"
									fontWeight="bold"
									textOverflow="clip"
									w="230px"
								>
									{user?.name}
								</Text>
								<Text
									fontWeight="medium"
									fontSize="sm"
									textOverflow="clip"
									w="230px"
								>
									{user?.email}
								</Text>
								<Text fontWeight="medium" fontSize="sm">
									{user?.phoneNumber}
								</Text>
							</VStack>
						</HStack>
					</Skeleton>

					<Box my={3} bg="white" p={3} borderRadius={5}>
						<Text
							fontWeight="bold"
							textTransform="uppercase"
							letterSpacing={0.5}
						>
							Current Address
						</Text>
						<Skeleton isLoaded={!isLoading}>
							<VStack align="start" mt={2} gap={0}>
								<Text fontSize="sm">
									{address?.addressLine1}
								</Text>
								<Text fontSize="sm">
									{address?.addressLine2}
								</Text>
								<Text fontSize="sm">{address?.city}</Text>
								<Text fontSize="sm">
									{address?.country}{" "}
									{address?.postalCode &&
										`- ${address?.postalCode}`}
								</Text>
							</VStack>
						</Skeleton>
					</Box>
				</>
			)}
		</Box>
	);
};

export default Profile;
