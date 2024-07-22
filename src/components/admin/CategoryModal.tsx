import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import CategoryForm from "./CategoryForm";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	isEdit: boolean;
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryModal = ({ isOpen, onClose, isEdit, setIsEdit }: Props) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{isEdit ? "Edit" : "Add"} Category</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<CategoryForm onClose={onClose} setIsEdit={setIsEdit} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CategoryModal;
