import {
	addColorVariant,
	removeSizeVariant,
	removeVariant,
	updateVariantSize,
	Variant,
} from "@/app/features/variant/variantSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { PhotoPlaceholderImg } from "@/assets";
import { EditVariantModal, VariantImageContainer } from "@/components";
import { toTitleCaseColor, toTitleCaseSize } from "@/utilities/getTitleCase";
import {
	Box,
	Flex,
	IconButton,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from "@chakra-ui/react";
import { MantineProvider, TagsInput } from "@mantine/core";
import "@mantine/core/styles.css";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

const ProductVariant = () => {
	const variants = useAppSelector((state) => state.variants);
	const dispatch = useAppDispatch();
	const [variant, setVariant] = useState<Variant | null>(null);
	const [colors, setColors] = useState<string[]>([]);
	const [sizes, setSizes] = useState<string[]>([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [stock, setStock] = useState(10);

	const handleAddColor = (newColor: string[]) => {
		const addedColor = newColor
			.map(toTitleCaseColor)
			.filter((c) => !colors.includes(c));

		addedColor.forEach((c) => {
			const [color, hexColor] = c.split(", ");

			if (sizes.length > 0) {
				sizes.forEach((s) => {
					dispatch(
						addColorVariant({
							color,
							hexColor,
							size: s,
							image: "",
							stock,
						})
					);
				});
			} else {
				dispatch(
					addColorVariant({
						color,
						hexColor: hexColor === undefined ? "" : hexColor,
						size: "",
						image: "",
						stock,
					})
				);
			}
		});

		setColors(newColor.map(toTitleCaseColor));
	};

	const handleAddSize = (newSize: string[]) => {
		const addedSize = newSize
			.map(toTitleCaseSize)
			.filter((s) => !sizes.includes(s));

		addedSize.forEach((s) => {
			colors.forEach((c) => {
				const [color, hexColor] = c.split(", ");
				dispatch(
					updateVariantSize({
						color,
						hexColor,
						size: s,
						image: "",
						stock,
					})
				);
			});
		});

		setSizes(newSize.map(toTitleCaseSize));
	};

	const handleRemoveColor = (removedColor: string) => {
		if (colors.length === 1) {
			setSizes([]);
		}

		const color = removedColor.split(", ")[0];

		dispatch(removeVariant(color));
	};

	const handleRemoveSize = (size: string) => {
		dispatch(removeSizeVariant(size));
	};

	return (
		<MantineProvider>
			<Flex direction="column" gap={4} bg="white" p={4}>
				<TagsInput
					label="Color"
					placeholder="eg. Red, Green"
					splitChars={["|"]}
					data={[]}
					value={colors}
					onChange={handleAddColor}
					onRemove={handleRemoveColor}
				/>

				{colors.length > 0 && (
					<TagsInput
						label="Size"
						placeholder="eg. M, L"
						data={[]}
						value={sizes}
						onChange={handleAddSize}
						onRemove={handleRemoveSize}
					/>
				)}
			</Flex>

			{variants?.length > 0 && (
				<Box bg="white" p={4} height="454px" overflowY="scroll">
					<Text fontSize="sm" fontWeight="semibold">
						Product Variants
					</Text>
					<Table mt={2}>
						<Thead>
							<Tr>
								<Th>Variant</Th>
								<Th>Action</Th>
							</Tr>
						</Thead>
						<Tbody>
							{variants.map((variant, index) => (
								<Tr key={index}>
									<Td>
										<Flex align="center" gap={7}>
											{variant.image ? (
												<VariantImageContainer
													image={variant.image}
													setVariant={setVariant}
													variant={variant}
												/>
											) : (
												<VariantImageContainer
													image={PhotoPlaceholderImg}
													setVariant={setVariant}
													variant={variant}
												/>
											)}
											<Text
												fontSize="sm"
												fontWeight="semibold"
											>
												{variant.size
													? `${variant.color} (${variant.hexColor}) / ${variant.size}`
													: `${variant.color}  (${variant.hexColor}) `}
											</Text>
										</Flex>
									</Td>
									<Td>
										<MdModeEdit color="white" />
										<IconButton
											variant="outline"
											colorScheme="messenger"
											aria-label="edit variant"
											icon={<MdModeEdit />}
											size="xs"
											onClick={() => {
												onOpen();
												setVariant(variant);
											}}
										/>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>

					<EditVariantModal
						variant={variant}
						stock={stock}
						setStock={setStock}
						isOpen={isOpen}
						onClose={onClose}
					/>
				</Box>
			)}
		</MantineProvider>
	);
};

export default ProductVariant;
