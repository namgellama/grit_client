import {
	Badge,
	Button,
	Flex,
	HStack,
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
import { Link, useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../app/features/product/productApiSlice";
import {
	getAgeStatus,
	getSaleStatus,
} from "../../utilities/getProductStatuses";

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
							<Th></Th>
							<Th>Name</Th>
							<Th>Price</Th>
							<Th>Category</Th>
							<Th>Segment</Th>
							<Th>Sale Status</Th>
							<Th>Age Status</Th>
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
										<Image
											w="60px"
											h="60px"
											objectFit="cover"
											src={product.image}
											alt={product.name}
										/>
									</Link>
								</Td>
								<Td>
									<Link
										to={`/dashboard/products/${product.id}`}
									>
										{product.name}
									</Link>
								</Td>
								<Td>Rs. {product.price}</Td>
								<Td>{product.category.name}</Td>
								<Td>{product.segment}</Td>
								<Td>
									<Badge
										variant="solid"
										colorScheme={getSaleStatus(
											product.saleStatus
										)}
									>
										{product.saleStatus}
									</Badge>
								</Td>
								<Td>
									<Badge
										variant="solid"
										colorScheme={getAgeStatus(
											product.ageStatus
										)}
									>
										{product.ageStatus}
									</Badge>
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
