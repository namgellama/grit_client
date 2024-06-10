import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Spinner,
} from "@chakra-ui/react";
import { useDeleteCategoryMutation } from "../../app/features/category/categoryApiSlice";
import { useAppSelector } from "../../app/hooks";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	cancelRef: any;
	type: string;
	id: string;
}

const DeleteAlert = ({ isOpen, onClose, cancelRef, type, id }: Props) => {
	const { user } = useAppSelector((state) => state.auth);
	const [deleteCategory, { isLoading, error }] = useDeleteCategoryMutation();

	const handleDelete = async () => {
		deleteCategory({ id, token: user?.token ?? "" });
		onClose();
	};

	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={onClose}
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						Delete {type}
					</AlertDialogHeader>

					<AlertDialogBody>
						Are you sure? You can't undo this action afterwards.
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme="red" onClick={handleDelete} ml={3}>
							{isLoading ? <Spinner /> : "Delete"}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default DeleteAlert;
