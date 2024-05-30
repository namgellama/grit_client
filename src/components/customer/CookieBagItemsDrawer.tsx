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
import { useCookies } from "react-cookie";
import { useAppSelector } from "../../app/hooks";
import { BagItem } from "../../interfaces";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	btnRef: RefObject<HTMLButtonElement>;
}

const CookieBagItemsDrawer = ({ isOpen, onClose, btnRef }: Props) => {
	const { user } = useAppSelector((state) => state.auth);
	const [cookies, setCookie] = useCookies<
		"bagItems",
		{
			bagItems?: BagItem[];
		}
	>(["bagItems"]);
	const { bagItems } = cookies;
	const [items, setItems] = useState<BagItem[]>([]);

	useEffect(() => {
		if (bagItems) setItems(bagItems);
	}, [bagItems, user]);

	const handleQuantity = (
		bagItem: BagItem,
		e: ChangeEvent<HTMLSelectElement>
	) => {
		const newQuantity = Number(e.target.value);

		const updatedItems = items.map((item) =>
			item.id === bagItem.id &&
			item.size === bagItem.size &&
			item.color === bagItem.color
				? { ...item, quantity: newQuantity }
				: item
		);
		setItems(updatedItems);
		setCookie("bagItems", updatedItems);
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
					{bagItems?.map((bagItem, index) => (
						<Flex key={index} my={5} gap={5}>
							<Image
								w="120px"
								h="150px"
								objectFit="cover"
								src={bagItem.image}
							/>
							<Flex direction="column" gap={1}>
								<Text fontSize="small">{bagItem.name}</Text>
								<Text fontSize="small">
									{bagItem.color} | {bagItem.size}
								</Text>
								<Text fontSize="small" fontWeight="semibold">
									Rs. {bagItem.price}
								</Text>
								<HStack>
									<Select
										value={bagItem.quantity}
										onChange={(e) =>
											handleQuantity(bagItem, e)
										}
									>
										{[...Array(bagItem.stock).keys()].map(
											(x) => (
												<option
													key={x + 1}
													value={x + 1}
												>
													{x + 1}
												</option>
											)
										)}
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

export default CookieBagItemsDrawer;