import { BagItem } from "@/app/interfaces/bagItem";
import { ErrorMessage } from "@/components";
import {
	Box,
	Center,
	Divider,
	Flex,
	HStack,
	Image,
	Skeleton,
	Text,
} from "@chakra-ui/react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface Props {
	isLoading: boolean;
	error: FetchBaseQueryError | SerializedError | undefined;
	bagItems?: BagItem[];
	deliveryCharge: number;
	total: number;
}

const BagItems = ({
	bagItems,
	deliveryCharge,
	total,
	isLoading,
	error,
}: Props) => {
	return (
		<Box
			flex={1}
			pl={5}
			bg="background.main"
			py={8}
			px={{ base: 3, lg: 10 }}
			w="100%"
		>
			{error ? (
				<ErrorMessage>Something went wrong</ErrorMessage>
			) : (
				<Flex direction="column" h="100%" justify="space-between">
					<Flex
						className="scrollbarY"
						direction="column"
						pr={{
							base: bagItems?.length! >= 4 ? 5 : 0,
							lg: bagItems?.length! > 4 ? 5 : 0,
						}}
						h={{
							base: bagItems?.length! >= 3 ? "30vh" : "20vh",
							md: "28vh",
							lg: bagItems?.length! > 3 ? "50vh" : "30vh",
						}}
						overflowY="scroll"
					>
						<Skeleton isLoaded={!isLoading}>
							{bagItems?.map((bagItem) => (
								<Flex key={bagItem.id} gap={5} mb={2}>
									<Image
										w="50px"
										h="70px"
										objectFit="cover"
										src={
											bagItem.product.variants.find(
												(variant) =>
													variant.color ===
													bagItem.color
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
										w="35%"
										fontSize="small"
										fontWeight="semibold"
										textAlign="right"
									>
										Rs. {bagItem.unitTotalPrice}
									</Text>
								</Flex>
							))}
						</Skeleton>
					</Flex>

					<Center borderColor="background.400" my={5}>
						<Divider orientation="horizontal" />
					</Center>

					<Flex direction="column" gap={1}>
						<Skeleton isLoaded={!isLoading}>
							<HStack justify="space-between">
								<Text fontSize="sm" fontWeight="semibold">
									Subtotal
								</Text>
								<Text fontSize="sm" fontWeight="semibold">
									Rs.{" "}
									{bagItems?.reduce(
										(acc, curr) =>
											(acc += curr.unitTotalPrice),
										0
									)}
								</Text>
							</HStack>
							<HStack justify="space-between">
								<Text fontSize="sm" fontWeight="semibold">
									Delivery
								</Text>
								<Text fontSize="sm" fontWeight="semibold">
									Rs. {deliveryCharge}
								</Text>
							</HStack>
							<HStack justify="space-between">
								<Text fontSize="sm" fontWeight="bold">
									Total
								</Text>
								<Text fontSize="sm" fontWeight="bold">
									Rs. {total}
								</Text>
							</HStack>
						</Skeleton>
					</Flex>
				</Flex>
			)}
		</Box>
	);
};

export default BagItems;
