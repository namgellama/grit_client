import {
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
	Image,
	Select,
	Text,
} from "@chakra-ui/react";
import { ChangeEvent, RefObject, useEffect, useState } from "react";
import {
	BagItem,
	useGetBagItemsQuery,
	useUpdateBagItemMutation,
} from "../../app/bagItem/bagItemApiSlice";
import { useAppSelector } from "../../app/hooks";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	btnRef: RefObject<HTMLButtonElement>;
}

const DBBagItemsDrawer = ({ isOpen, onClose, btnRef }: Props) => {
	const { user } = useAppSelector((state) => state.auth);

	const [items, setItems] = useState<BagItem[]>([]);
	const { data: bagItems } = useGetBagItemsQuery(user?.token ?? "");
	const [updateBagItem] = useUpdateBagItemMutation();

	useEffect(() => {
		if (user && bagItems) {
			setItems(bagItems);
		}
	}, [bagItems, user]);

	const handleQuantity = (
		bagItem: BagItem,
		e: ChangeEvent<HTMLSelectElement>
	) => {
		const newQuantity = Number(e.target.value);

		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === bagItem.id
					? { ...item, quantity: newQuantity }
					: item
			)
		);

		updateBagItem({
			id: bagItem.id,
			data: { quantity: newQuantity },
			token: user?.token ?? "",
		});
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
				<DrawerHeader>Create your account</DrawerHeader>

				<DrawerBody>
					{items?.map((bagItem) => (
						<Flex key={bagItem.id} my={5} gap={5}>
							<Image
								w="120px"
								h="150px"
								objectFit="cover"
								src={bagItem.product.color[0].image}
							/>
							<Flex direction="column" gap={1}>
								<Text fontSize="small">
									{bagItem.product.name}
								</Text>
								<Text fontSize="small">
									{bagItem.color} | {bagItem.size}
								</Text>
								<Text fontSize="small" fontWeight="semibold">
									Rs. {bagItem.unitPrice}
								</Text>
								<HStack>
									<Select
										value={bagItem.quantity}
										onChange={(e) =>
											handleQuantity(bagItem, e)
										}
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
