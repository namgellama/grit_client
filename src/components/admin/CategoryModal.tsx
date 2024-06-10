import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import CategoryForm from "./CategoryForm";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

const CategoryModal = ({ isOpen, onClose }: Props) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Category</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<CategoryForm onClose={onClose} />
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CategoryModal;
