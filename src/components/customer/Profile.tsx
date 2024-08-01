import { useGetMyCurrentAddressQuery } from "@/app/features/address/addressApiSlice";
import { useAppSelector } from "@/app/hooks";
import { ErrorMessage } from "@/components";
import {
	Avatar,
	Box,
	Flex,
	HStack,
	Skeleton,
	Text,
	VStack,
} from "@chakra-ui/react";

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
				<Flex
					direction={{ base: "column", md: "row", xl: "column" }}
					gap={5}
				>
					<Skeleton
						isLoaded={!isLoading}
						w="100%"
						h={{ base: "100%", md: "140px", xl: "100%" }}
						bg="white"
					>
						<HStack gap={4} p={3} borderRadius={5}>
							<Avatar
								name={user?.name}
								src=""
								bg="black"
								color="white"
							/>
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
							</VStack>
						</HStack>
					</Skeleton>

					{address && (
						<Box bg="white" p={3} borderRadius={5}>
							<Text
								fontWeight="bold"
								textTransform="uppercase"
								letterSpacing={0.5}
							>
								Current Address
							</Text>
							<Flex direction="column" mt={2} gap={0}>
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
								<Text fontSize="sm">
									{address?.phoneNumber}
								</Text>
							</Flex>
						</Box>
					)}
				</Flex>
			)}
		</Box>
	);
};

export default Profile;
