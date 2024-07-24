import { Variant } from "@/app/features/variant/variantSlice";
import { ImageSelectModal } from "@/components";
import { Box, IconButton, Image, useDisclosure } from "@chakra-ui/react";
import { MdModeEdit } from "react-icons/md";

interface Props {
	image: string;
	setVariant: (variant: Variant) => void;
	variant: Variant;
}

const VariantImageContainer = ({ image, setVariant, variant }: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

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
					aria-label="Edit image"
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
					colorScheme="messenger"
				/>
			</Box>

			<ImageSelectModal
				isOpen={isOpen}
				onClose={onClose}
				variant={variant}
			/>
		</>
	);
};

export default VariantImageContainer;
