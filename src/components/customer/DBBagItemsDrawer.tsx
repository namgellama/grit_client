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
	Heading,
	HStack,
	IconButton,
	Image,
	Select,
	Text,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { ChangeEvent, RefObject } from "react";
import { MdDelete } from "react-icons/md";
import {
	BagItem,
	useDeleteBagItemMutation,
	useGetBagItemsQuery,
	useUpdateBagItemMutation,
} from "../../app/bagItem/bagItemApiSlice";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import emptyBagImage from "../../assets/empty-bag.png";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	btnRef: RefObject<HTMLButtonElement>;
}

const DBBagItemsDrawer = ({ isOpen, onClose, btnRef }: Props) => {
	const { user } = useAppSelector((state) => state.auth);
	const toast = useToast();
	const navigate = useNavigate();
	const { data: bagItems } = useGetBagItemsQuery(user?.token ?? "");
	const [updateBagItem] = useUpdateBagItemMutation();
	const [deleteBagItem] = useDeleteBagItemMutation();

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
					{bagItems?.length! > 0 ? (
						<Flex
							direction="column"
							h="100%"
							justify="space-between"
						>
							<Flex
								className="drawer"
								direction="column"
								gap={10}
								pr={5}
								h="100%"
								overflowY="scroll"
							>
								{bagItems?.map((bagItem) => (
									<Flex key={bagItem.id} gap={5}>
										<Image
											w="160px"
											h="140px"
											objectFit="cover"
											src={
												bagItem.product.color.find(
													(color) =>
														color.colorName ===
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
												<Text fontSize="small">
													{bagItem.product.name}
												</Text>
												<Text fontSize="small">
													{bagItem.color} |{" "}
													{bagItem.size}
												</Text>
												<Text
													fontSize="small"
													fontWeight="semibold"
												>
													Rs. {bagItem.unitPrice}
												</Text>
											</Box>
											<HStack
												pb={3}
												justify="space-between"
											>
												<Select
													value={bagItem.quantity}
													onChange={(e) =>
														handleQuantity(
															bagItem,
															e
														)
													}
													size="sm"
													w="70px"
												>
													{[
														...Array(
															bagItem.product
																.stock
														).keys(),
													].map((x) => (
														<option
															key={x + 1}
															value={x + 1}
														>
															{x + 1}
														</option>
													))}
												</Select>
												<IconButton
													aria-label="Delete item"
													isRound={true}
													icon={<MdDelete />}
													onClick={() =>
														handleDeleteBagItem(
															bagItem.id
														)
													}
												/>
											</HStack>
										</Flex>
									</Flex>
								))}
							</Flex>
							<Box pt={5}>
								<HStack justify="space-between">
									<Text
										fontSize="small"
										fontWeight="semibold"
									>
										Total
									</Text>
									<Text
										fontSize="small"
										fontWeight="semibold"
									>
										Rs.{" "}
										{bagItems?.reduce(
											(acc, curr) =>
												(acc += curr.unitTotalPrice),
											0
										)}
									</Text>
								</HStack>
							</Box>
						</Flex>
					) : (
						<VStack h="100%" justify="center">
							<Image
								src={emptyBagImage}
								alt="Empty bag"
								w="150px"
							/>
							<Heading
								fontSize="small"
								textTransform="uppercase"
								letterSpacing={1}
							>
								Your bag is empty
							</Heading>
							<Text fontSize="small">
								There are no products in your bag
							</Text>
							<VStack w="50%" mt={5}>
								<Button w="100%" bg="black" color="white">
									Shop Men
								</Button>
								<Button w="100%" bg="black" color="white">
									Shop Women
								</Button>
							</VStack>
						</VStack>
					)}
				</DrawerBody>

				{bagItems?.length! > 0 && (
					<DrawerFooter>
						<Button
							colorScheme="blue"
							w="100%"
							onClick={() => navigate("/checkout")}
						>
							Checkout
						</Button>
					</DrawerFooter>
				)}
			</DrawerContent>
		</Drawer>
	);
};

export default DBBagItemsDrawer;
