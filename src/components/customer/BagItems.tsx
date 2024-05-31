import { Box, HStack, Image, Text, Flex } from "@chakra-ui/react";
import { useGetBagItemsQuery } from "../../app/bagItem/bagItemApiSlice";
import { useAppSelector } from "../../app/hooks";

const BagItems = () => {
	const { user } = useAppSelector((state) => state.auth);
	const {
		data: bagItems,
		isLoading,
		error,
	} = useGetBagItemsQuery(user?.token ?? "");

	return (
		<Box flex={1} pl={5}>
			<Flex direction="column" h="100%" justify="space-between">
				<Flex
					className="drawer"
					direction="column"
					gap={5}
					pr={5}
					h="50vh"
					overflowY="scroll"
				>
					{bagItems?.map((bagItem) => (
						<Flex key={bagItem.id} gap={5}>
							<Image
								w="50px"
								h="70px"
								objectFit="cover"
								src={
									bagItem.product.color.find(
										(color) =>
											color.colorName === bagItem.color
									)?.image
								}
							/>
							<Flex
								direction="column"
								justify="space-between"
								w="100%"
							>
								<Box>
									<Text
										fontSize="small"
										fontWeight="semibold"
									>
										{bagItem.product.name}
									</Text>
									<Text fontSize="x-small">
										{bagItem.color} | {bagItem.size}
									</Text>
									<Text fontSize="x-small">
										Rs. {bagItem.unitPrice} x{" "}
										{bagItem.quantity}
									</Text>
								</Box>
							</Flex>
							<Text
								w="30%"
								fontSize="small"
								fontWeight="semibold"
								textAlign="right"
							>
								Rs. {bagItem.unitTotalPrice}
							</Text>
						</Flex>
					))}
				</Flex>
				<Flex pt={5} pr={5} direction="column" gap={0.5}>
					<HStack justify="space-between">
						<Text fontSize="small" fontWeight="semibold">
							Subtotal
						</Text>
						<Text fontSize="small" fontWeight="semibold">
							Rs.{" "}
							{bagItems?.reduce(
								(acc, curr) => (acc += curr.unitTotalPrice),
								0
							)}
						</Text>
					</HStack>
					<HStack justify="space-between">
						<Text fontSize="small" fontWeight="semibold">
							Delivery
						</Text>
						<Text fontSize="small" fontWeight="semibold">
							Rs. 100
						</Text>
					</HStack>
					<HStack justify="space-between">
						<Text fontSize="small" fontWeight="bold">
							Total
						</Text>
						<Text fontSize="small" fontWeight="bold">
							Rs. 100
						</Text>
					</HStack>
				</Flex>
			</Flex>
		</Box>
	);
};

export default BagItems;
