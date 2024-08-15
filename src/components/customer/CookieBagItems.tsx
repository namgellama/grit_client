import { BagItem } from "@/app/interfaces/bagItem";
import {
	Box,
	Flex,
	HStack,
	IconButton,
	Image,
	Select,
	Text,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { useCookies } from "react-cookie";
import { MdDelete } from "react-icons/md";

interface Props {
	bagItems: BagItem[] | undefined;
}

const CookieBagItems = ({ bagItems }: Props) => {
	const [_, setCookie] = useCookies<"bagItems", { bagItems: BagItem[] }>([
		"bagItems",
	]);

	const handleQuantity = async (
		bagItem: BagItem,
		e: ChangeEvent<HTMLSelectElement>
	) => {
		const newQuantity = Number(e.target.value);

		const updatedBagItems = bagItems?.map((item) => {
			if (
				item.id === bagItem.id &&
				item.color === bagItem.color &&
				item.size === bagItem.size
			) {
				return {
					...item,
					quantity: newQuantity,
					unitTotalPrice: item.unitPrice * newQuantity,
				};
			}
			return item;
		});

		setCookie("bagItems", updatedBagItems, { path: "/" });
	};

	const handleDeleteBagItem = async (bagItem: BagItem) => {
		const updatedBagItems = bagItems?.filter(
			(x) =>
				!(
					x.id === bagItem.id &&
					x.color === bagItem.color &&
					x.size === bagItem.size
				)
		);

		setCookie("bagItems", updatedBagItems, { path: "/" });
	};

	return (
		<Flex direction="column" h="100%" w="100%">
			<Flex
				className="scrollbarY"
				direction="column"
				gap={7}
				h="100%"
				pr={2}
				overflowY="scroll"
				align="stretch"
			>
				{bagItems?.map((bagItem, index) => (
					<Flex gap={5} key={index}>
						<Image
							w="160px"
							h="130px"
							objectFit="cover"
							src={bagItem.image}
						/>
						<Flex
							direction="column"
							justify="space-between"
							w="100%"
						>
							<Flex direction="column" gap={0.4}>
								<Text fontSize="sm" fontWeight="medium">
									{bagItem.name}
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
									size="xs"
									w="70px"
								>
									{[...Array(bagItem.stock).keys()].map(
										(x) => (
											<option key={x + 1} value={x + 1}>
												{x + 1}
											</option>
										)
									)}
								</Select>
								<IconButton
									aria-label="Delete item"
									isRound={true}
									icon={<MdDelete />}
									onClick={() => handleDeleteBagItem(bagItem)}
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

export default CookieBagItems;
