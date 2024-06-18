import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	VStack,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdRemoveCircle } from "react-icons/md";
import { useUploadProductImageMutation } from "../../app/features/product/productApiSlice";
import { Variant } from "../../app/interfaces/product";

interface Props {
	setVariants: React.Dispatch<React.SetStateAction<Partial<Variant>[]>>;
}

const ProductVariant = ({ setVariants }: Props) => {
	const [variantNumber, setVariantNumber] = useState<number>(1);

	const [color, setColor] = useState("");
	const [hexColor, setHexColor] = useState("");
	const [size, setSize] = useState("");
	const [stock, setStock] = useState(0);
	const [image, setImage] = useState("");

	const [
		uploadProductImage,
		// { isLoading: isProductLoading, error: productError },
	] = useUploadProductImageMutation();

	const handleAddVariant = () => {
		const newVariant = {
			color,
			hexColor,
			size,
			stock,
			image,
		};
		setVariants((prevVariant) => [...prevVariant, newVariant]);
	};

	const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const formData = new FormData();

			formData.append("image", e.target.files[0]);

			try {
				const response = await uploadProductImage(formData).unwrap();
				setImage(response.image.secure_url);
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<VStack gap={10} flex={1}>
			{[...Array(variantNumber).keys()].map((x) => (
				<Flex
					key={x + 1}
					gap={3}
					direction="column"
					bg="background.300"
				>
					<HStack align="space-between" gap={7}>
						<FormControl>
							<FormLabel>Color</FormLabel>
							<Input
								type="text"
								variant="filled"
								background="white"
								onChange={(e) => setColor(e.target.value)}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Hex Color</FormLabel>
							<Input
								type="text"
								variant="filled"
								background="white"
								onChange={(e) => setHexColor(e.target.value)}
							/>
						</FormControl>
					</HStack>

					<HStack align="space-between" gap={7}>
						<FormControl>
							<FormLabel>Size</FormLabel>
							<Input
								type="text"
								variant="filled"
								background="white"
								onChange={(e) => setSize(e.target.value)}
							/>
						</FormControl>

						<FormControl>
							<FormLabel>Stock</FormLabel>
							<NumberInput>
								<NumberInputField
									bg="white"
									onChange={(e) =>
										setStock(Number(e.target.value))
									}
								/>
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</FormControl>
					</HStack>

					<FormControl>
						<FormLabel>Image</FormLabel>
						<Input
							type="file"
							variant="filled"
							background="white"
							multiple
							onChange={handleImageUpload}
						/>
					</FormControl>

					<Button onClick={handleAddVariant}>Add Variant</Button>
				</Flex>
			))}
			<HStack>
				<MdRemoveCircle
					color="gray"
					onClick={() => setVariantNumber(variantNumber - 1)}
				/>
				<IoIosAddCircle
					color="green"
					onClick={() => setVariantNumber(variantNumber + 1)}
				/>
			</HStack>
		</VStack>
	);
};

export default ProductVariant;
