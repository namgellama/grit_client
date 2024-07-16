import {
	Badge,
	Button,
	Flex,
	HStack,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { FaRegEye } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../app/features/product/productApiSlice";
import { getProductStatus } from "../../utilities/getProductStatus";

const AdminProductsPage = () => {
	const {
		data: products,
		isLoading,
		error,
	} = useGetProductsQuery({ ageStatus: undefined, segment: undefined });
	const navigate = useNavigate();

	return (
		<Flex direction="column" p={10} gap={5}>
			<HStack justify="space-between">
				<Text
					fontWeight="bold"
					textTransform="uppercase"
					letterSpacing={0.5}
				>
					GRIT Products
				</Text>

				<Button
					variant="solid"
					colorScheme="messenger"
					size="sm"
					borderRadius={2}
					onClick={() => navigate("/dashboard/products/new")}
				>
					Add Product
				</Button>
			</HStack>

			<TableContainer bg="white">
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>#</Th>
							<Th>Name</Th>
							<Th>Price</Th>
							<Th>Category</Th>
							<Th>Segment</Th>
							<Th> Status</Th>
							<Th></Th>
						</Tr>
					</Thead>
					<Tbody>
						{products?.map((product, index) => (
							<Tr key={product.id}>
								<Td>{index + 1}</Td>
								<Td>
									<Link
										to={`/dashboard/products/${product.id}`}
									>
										<Flex align="center" gap={4}>
											<Image
												w="30px"
												h="30px"
												borderRadius={5}
												objectFit="cover"
												src={product.variants[0].image!}
												alt={product.name}
											/>
											<Text
												fontSize="sm"
												fontWeight="semibold"
											>
												{product.name}
											</Text>
										</Flex>
									</Link>
								</Td>
								<Td fontSize="sm">
									Rs. {product.sellingPrice}
								</Td>
								<Td fontSize="sm">{product.category.name}</Td>
								<Td fontSize="sm">{product.segment}</Td>
								<Td>
									<Badge
										variant="solid"
										colorScheme={getProductStatus(
											product.isNew
										)}
									>
										{product.isNew ? "New" : "Old"}
									</Badge>
								</Td>
								<Td>
									<Menu>
										<MenuButton
											as={Button}
											variant="outline"
											size="xs"
											colorScheme="purple"
											p={3}
											borderRadius={3}
										>
											<HiOutlineDotsHorizontal />
										</MenuButton>

										<MenuList>
											<MenuItem fontSize="sm">
												<Flex align="center" gap={3}>
													<FaRegEye
														style={{
															fontSize: "12px",
														}}
													/>
													View
												</Flex>
											</MenuItem>
											<MenuItem fontSize="sm">
												<Flex align="center" gap={3}>
													<FiEdit
														style={{
															fontSize: "12px",
														}}
													/>
													Edit Product
												</Flex>
											</MenuItem>
											<MenuItem fontSize="sm">
												<Flex
													align="center"
													gap={3}
													color="red"
												>
													<RiDeleteBin7Line />
													Delete
												</Flex>
											</MenuItem>
										</MenuList>
									</Menu>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Flex>
	);
};

export default AdminProductsPage;
