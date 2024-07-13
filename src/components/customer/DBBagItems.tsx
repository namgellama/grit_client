import {
	Box,
	Flex,
	HStack,
	IconButton,
	Image,
	Select,
	Text,
	useToast,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { MdDelete } from "react-icons/md";
import {
	useDeleteBagItemMutation,
	useUpdateBagItemMutation,
} from "../../app/features/bagItem/bagItemApiSlice";
import { BagItem } from "../../app/interfaces/bagItem";
import { CurrentUser } from "../../app/interfaces/auth";

interface Props {
	bagItems: BagItem[];
	user: CurrentUser | null;
}

const DBBagItems = ({ bagItems, user }: Props) => {
	const [updateBagItem] = useUpdateBagItemMutation();
	const [deleteBagItem] = useDeleteBagItemMutation();
	const toast = useToast();

	const handleQuantity = async (
		bagItem: BagItem,
		e: ChangeEvent<HTMLSelectElement>
	) => {
		const newQuantity = Number(e.target.value);

		try {
			await updateBagItem({
				id: bagItem.id,
				data: {
					quantity: newQuantity,
					unitTotalPrice: bagItem.unitPrice * newQuantity,
				},
				token: user?.token ?? "",
			}).unwrap();
		} catch (error: any) {
			toast({
				title: error.data.message,
				duration: 1200,
				isClosable: true,
				status: "error",
				position: "top",
			});
		}
	};

	const handleDeleteBagItem = async (id: string) => {
		try {
			await deleteBagItem({ id, token: user?.token ?? "" }).unwrap();
		} catch (error: any) {
			toast({
				title: error.data.message,
				duration: 1200,
				isClosable: true,
				status: "error",
				position: "top",
			});
		}
	};

	return (
		<Flex direction="column" h="100%" justify="space-between">
			<Flex
				className="scrollbarY"
				direction="column"
				gap={7}
				pr={5}
				h="100%"
				overflowY="scroll"
			>
				{bagItems?.map((bagItem) => (
					<Flex key={bagItem.id} gap={5}>
						<Image
							w="160px"
							h="130px"
							objectFit="cover"
							src={
								bagItem.product.variants.find(
									(variant) => variant.color === bagItem.color
								)?.image
							}
						/>
						<Flex
							direction="column"
							justify="space-between"
							w="100%"
						>
							<Flex direction="column" gap={0.4}>
								<Text fontSize="sm" fontWeight="medium">
									{bagItem.product.name}
								</Text>
								<Text fontSize="xs" color="background.500">
									{bagItem.color} | {bagItem.size}
								</Text>
								<Text
									fontSize="xs"
									fontWeight="
								medium"
								>
									Rs. {bagItem.unitPrice}
								</Text>
							</Flex>
							<HStack pb={3} justify="space-between">
								<Select
									value={bagItem.quantity}
									onChange={(e) => handleQuantity(bagItem, e)}
									size="sm"
									w="70px"
								>
									{[
										...Array(
											bagItem.product.variants.find(
												(variant) =>
													variant.color ===
														bagItem.color &&
													variant.size ===
														bagItem.size
											)?.stock
										).keys(),
									].map((x) => (
										<option key={x + 1} value={x + 1}>
											{x + 1}
										</option>
									))}
								</Select>
								<IconButton
									aria-label="Delete item"
									isRound={true}
									icon={<MdDelete />}
									onClick={() =>
										handleDeleteBagItem(bagItem.id)
									}
								/>
							</HStack>
						</Flex>
					</Flex>
				))}
			</Flex>
			<Box pt={5}>
				<HStack justify="space-between">
					<Text fontSize="sm" fontWeight="medium">
						Subtotal
					</Text>
					<Text fontSize="sm" fontWeight="bold">
						Rs.{" "}
						{bagItems?.reduce(
							(acc, curr) => (acc += curr.unitTotalPrice),
							0
						)}
					</Text>
				</HStack>
			</Box>
		</Flex>
	);
};

export default DBBagItems;
