import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	FormControl,
	FormLabel,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	ModalFooter,
	Button,
} from "@chakra-ui/react";
import {
	updateVariantStock,
	Variant,
} from "../../app/features/variant/variantSlice";
import { useAppDispatch } from "../../app/hooks";

interface Props {
	variant: Variant | null;
	stock: number;
	setStock: React.Dispatch<React.SetStateAction<number>>;
	isOpen: boolean;
	onClose: () => void;
}

const EditVariantModal = ({
	variant,
	stock,
	setStock,
	isOpen,
	onClose,
}: Props) => {
	const dispatch = useAppDispatch();

	const handleEditVariant = () => {
		dispatch(updateVariantStock({ ...variant, stock }));
		setStock(10);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontSize="md" p={3}>
					Edit Variant |{" "}
					{variant?.size
						? `${variant?.color} / ${variant.size}`
						: variant?.color}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody fontSize="md" p={3}>
					<FormControl>
						<FormLabel fontSize="sm">Variant quantity</FormLabel>
						<NumberInput
							min={1}
							defaultValue={variant?.stock}
							size="sm"
							onChange={(e) => setStock(Number(e))}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button
						colorScheme="messenger"
						size="sm"
						mr={3}
						onClick={handleEditVariant}
					>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default EditVariantModal;
