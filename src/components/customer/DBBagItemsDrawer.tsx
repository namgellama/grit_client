import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	HStack,
	IconButton,
	Image,
	Select,
	Text,
	useToast,
} from "@chakra-ui/react";
import { ChangeEvent, RefObject, useEffect, useState } from "react";
import {
	BagItem,
	useDeleteBagItemMutation,
	useGetBagItemsQuery,
	useUpdateBagItemMutation,
} from "../../app/bagItem/bagItemApiSlice";
import { useAppSelector } from "../../app/hooks";
import { MdDelete } from "react-icons/md";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	btnRef: RefObject<HTMLButtonElement>;
}

const DBBagItemsDrawer = ({ isOpen, onClose, btnRef }: Props) => {
	const { user } = useAppSelector((state) => state.auth);
	const toast = useToast();
	const [items, setItems] = useState<BagItem[]>([]);
	const { data: bagItems } = useGetBagItemsQuery(user?.token ?? "");
	const [updateBagItem] = useUpdateBagItemMutation();
	const [deleteBagItem] = useDeleteBagItemMutation();

	useEffect(() => {
		if (user && bagItems) {
			setItems(bagItems);
		}
	}, [bagItems, user]);

	const handleQuantity = async (
		bagItem: BagItem,
		e: ChangeEvent<HTMLSelectElement>
	) => {
		const newQuantity = Number(e.target.value);

		try {
			await updateBagItem({
				id: bagItem.id,
				data: { quantity: newQuantity },
				token: user?.token ?? "",
			}).unwrap();

			setItems((prevItems) =>
				prevItems.map((item) =>
					item.id === bagItem.id
						? { ...item, quantity: newQuantity }
						: item
				)
			);
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
			setItems((prevItems) => prevItems.filter((item) => item.id !== id));
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
		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={onClose}
			finalFocusRef={btnRef}
			size="sm"
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader
					textAlign="center"
					fontSize="small"
					textTransform="uppercase"
				>
					Your Bag
				</DrawerHeader>

				<DrawerBody>
					{items?.map((bagItem) => (
						<Flex key={bagItem.id} my={5} gap={5}>
							<Image
								w="100px"
								h="140px"
								objectFit="cover"
								src={bagItem.product.color[0].image}
							/>
							<Flex
								direction="column"
								justify="space-between"
								w="100%"
							>
								<Box>
									<Text fontSize="small">
										{bagItem.product.name}
									</Text>
									<Text fontSize="small">
										{bagItem.color} | {bagItem.size}
									</Text>
									<Text
										fontSize="small"
										fontWeight="semibold"
									>
										Rs. {bagItem.unitPrice}
									</Text>
								</Box>
								<HStack pb={3} justify="space-between">
									<Select
										value={bagItem.quantity}
										onChange={(e) =>
											handleQuantity(bagItem, e)
										}
										size="sm"
										w="70px"
									>
										{[
											...Array(
												bagItem.product.stock
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
				</DrawerBody>

				<DrawerFooter>
					<Button variant="outline" mr={3} onClick={onClose}>
						Cancel
					</Button>
					<Button colorScheme="blue">Save</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default DBBagItemsDrawer;
