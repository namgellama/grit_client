import {
	Box,
	Flex,
	IconButton,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { SetStateAction } from "react";
import { MdModeEdit } from "react-icons/md";
import { useAppSelector } from "../../app/hooks";
import { Variant } from "./ProductVariant";

interface Props {
	image: string;
	setVariant: (variant: Variant) => void;
	variant: Variant;
	setVariants: (variant: SetStateAction<Variant[]>) => void;
}

const VariantImageContainer = ({
	image,
	setVariant,
	variant,
	setVariants,
}: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const images = useAppSelector((state) => state.images);

	const handleImageSelect = (image: string) => {
		if (variant) {
			setVariants((prevVariants) =>
				prevVariants.map((v) =>
					v.color === variant.color && v.size === variant.size
						? { ...v, image }
						: v
				)
			);
			onClose();
		}
	};

	return (
		<>
			<Box
				position="relative"
				_hover={{
					".edit-button": {
						opacity: 1,
						visibility: "visible",
					},
				}}
				cursor="pointer"
				onClick={() => {
					onOpen();
					setVariant(variant);
				}}
			>
				<Image
					w={55}
					h={55}
					borderRadius={5}
					objectFit="cover"
					src={image}
					alt="Variant Image"
				/>
				<IconButton
					aria-label="Search database"
					className="edit-button"
					icon={<MdModeEdit color="white" />}
					position="absolute"
					size="xs"
					top="50%"
					left="50%"
					transform="translate(-50%, -50%)"
					opacity={0}
					visibility="hidden"
					transition="opacity 0.2s, visibility 0.2s"
					bg="blue"
					_hover={{ bg: "blue" }}
				/>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader fontSize="md">
						Select Image | {variant?.color}/{variant?.size}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex gap={2}>
							{images.map((image: string, index: number) => (
								<button
									key={index}
									onClick={() => handleImageSelect(image)}
								>
									<Image
										src={image}
										alt={`Preview image ${index}`}
										w="110px"
										h="110px"
										objectFit="cover"
										borderRadius={5}
									/>
								</button>
							))}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default VariantImageContainer;
