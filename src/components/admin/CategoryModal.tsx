import { useGetCategoryQuery } from "@/app/features/category/categoryApiSlice";
import { CategoryForm } from "@/components";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";

interface Props {
	id: string;
	isOpen: boolean;
	onClose: () => void;
	isEdit: boolean;
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryModal = ({ isOpen, onClose, isEdit, setIsEdit, id }: Props) => {
	const { data: category } = useGetCategoryQuery(id, { skip: !id });

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					{isEdit
						? `Edit ${category?.name} Category`
						: "Add Category"}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<CategoryForm
						isEdit={isEdit}
						onClose={onClose}
						setIsEdit={setIsEdit}
						category={category}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CategoryModal;
