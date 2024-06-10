import {
	Button,
	Flex,
	HStack,
	IconButton,
	Image,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useGetCategoriesQuery } from "../../app/features/category/categoryApiSlice";

const AdminCategoriesPage = () => {
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
				>
					Add Category
				</Button>
			</HStack>

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
										/>
										<IconButton
											icon={<MdDelete />}
											aria-label="Delete"
											variant="ghost"
											borderRadius={50}
											color="background.600"
										/>
									</HStack>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Flex>
	);
};

export default AdminCategoriesPage;
