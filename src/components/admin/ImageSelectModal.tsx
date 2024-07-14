import {
	Grid,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import { updateVariantImage } from "../../app/features/variant/variantSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ImageUpload from "./ImageUpload";
import { Variant } from "./ProductVariant";

interface Props {
	variant: Variant;
	isOpen: boolean;
	onClose: () => void;
}

const ImageSelectModal = ({ variant, isOpen, onClose }: Props) => {
	const images = useAppSelector((state) => state.images);
	const dispatch = useAppDispatch();

	const handleImageSelect = (image: string) => {
		if (variant) {
			dispatch(
				updateVariantImage({
					color: variant.color,
					size: variant.size,
					image,
				})
			);
			onClose();
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="4xl">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontSize="md" p={3}>
					Select Image |{" "}
					{variant.size
						? `${variant.color} / ${variant.size}`
						: variant.color}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody p={3}>
					<Grid gridTemplateColumns="repeat(7, 1fr)" gap={3}>
						<ImageUpload />

						{images.map((image: string, index: number) => (
							<button
								key={index}
								onClick={() => handleImageSelect(image)}
							>
								<Image
									src={image}
									alt={`Preview image ${index}`}
									w="120px"
									h="120px"
									objectFit="cover"
									borderRadius={5}
								/>
							</button>
						))}
					</Grid>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default ImageSelectModal;
