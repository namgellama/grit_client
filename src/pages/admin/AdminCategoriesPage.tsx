import {
	Button,
	Flex,
	HStack,
	IconButton,
	Image,
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useGetCategoriesQuery } from "../../app/features/category/categoryApiSlice";
import { CategoryModal, DeleteAlert, ErrorMessage } from "../../components";

const AdminCategoriesPage = () => {
	const [id, setId] = useState("");
	const {
		isOpen: isModalOpen,
		onOpen: onModalOpen,
		onClose: onModalClose,
	} = useDisclosure();
	const {
		isOpen: isAlertOpen,
		onOpen: onAlertOpen,
		onClose: onAlertClose,
	} = useDisclosure();
	const cancelRef = useRef(null);
	const [isEdit, setIsEdit] = useState(false);
	const { data: categories, isLoading, error } = useGetCategoriesQuery();

	return (
		<Flex direction="column" w="100%" p={10} gap={5}>
			<HStack justify="space-between" w="100%">
				<Text
					fontWeight="bold"
					textTransform="uppercase"
					letterSpacing={0.5}
				>
					GRIT Categories
				</Text>
				<Button
					variant="solid"
					colorScheme="messenger"
					size="sm"
					borderRadius={2}
					onClick={() => {
						onModalOpen();
						setIsEdit(false);
					}}
				>
					Add Category
				</Button>
			</HStack>

			{isLoading ? (
				<Flex justify="center">
					<Spinner />
				</Flex>
			) : error ? (
				<ErrorMessage>Something went wrong</ErrorMessage>
			) : (
				<TableContainer bg="white">
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th>#</Th>
								<Th>Image</Th>
								<Th>Name</Th>
								<Th></Th>
							</Tr>
						</Thead>
						<Tbody>
							{categories?.map((category, index) => (
								<Tr key={category.id}>
									<Td>{index + 1}</Td>
									<Td>
										<Image
											w="60px"
											h="60px"
											objectFit="cover"
											src={category.image}
											alt={category.name}
										/>
									</Td>
									<Td>{category.name} </Td>
									<Td>
										<HStack gap={2} justify="end">
											<IconButton
												icon={<FaEdit />}
												aria-label="Delete"
												variant="ghost"
												borderRadius={50}
												color="background.600"
												onClick={() => {
													onModalOpen();
													setIsEdit(true);
													setId(category.id);
												}}
											/>
											<IconButton
												icon={<MdDelete />}
												aria-label="Delete"
												variant="ghost"
												borderRadius={50}
												color="background.600"
												onClick={() => {
													onAlertOpen();
													setId(category.id);
												}}
											/>
										</HStack>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			)}

			<CategoryModal
				isOpen={isModalOpen}
				onClose={onModalClose}
				isEdit={isEdit}
				setIsEdit={setIsEdit}
				id={id}
			/>
			<DeleteAlert
				isOpen={isAlertOpen}
				onClose={onAlertClose}
				cancelRef={cancelRef}
				type="Category"
				id={id}
			/>
		</Flex>
	);
};

export default AdminCategoriesPage;
