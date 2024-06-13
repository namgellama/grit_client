import {
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
import { useGetProductsQuery } from "../../app/features/product/productApiSlice";

const AdminProductsPage = () => {
	const {
		data: products,
		isLoading,
		error,
	} = useGetProductsQuery({ ageStatus: undefined, segment: undefined });

	return (
		<Flex direction="column" w="100%" p={10} gap={5}>
			<HStack justify="space-between" w="100%">
				<Text
					fontWeight="bold"
					textTransform="uppercase"
					letterSpacing={0.5}
				>
					GRIT Products
				</Text>
			</HStack>

			<TableContainer bg="white">
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>#</Th>
							<Th></Th>
							<Th>Name</Th>
							<Th>Price</Th>
							<Th>Segment</Th>
							<Th>Sizes</Th>
							<Th>Colors</Th>
							<Th>Stock</Th>
							<Th>Category</Th>
							<Th>Age Status</Th>
							<Th>Sale Status</Th>

							<Th></Th>
						</Tr>
					</Thead>
					<Tbody>
						{products?.map((product, index) => (
							<Tr key={product.id}>
								<Td>{index + 1}</Td>
								<Td>
									<Image
										w="60px"
										h="60px"
										objectFit="cover"
										src={product.color[0].image}
										alt={product.name}
									/>
								</Td>
								<Td>{product.name}</Td>
								<Td>Rs. {product.price}</Td>
								<Td>{product.segment}</Td>
								<Td>{product.sizes.join(", ")}</Td>
								<Td>
									{product.color
										.map((color) => color.colorName)
										.join(", ")}
								</Td>
								<Td>{product.stock}</Td>
								<Td>{product.category.name}</Td>
								<Td>{product.ageStatus}</Td>
								<Td>{product.saleStatus}</Td>

								<Td>
									<Button
										bg="background.800"
										color="white"
										_hover={{
											bg: "background.700",
											color: "white",
										}}
										size="sm"
										// onClick={() =>
										// 	navigate(
										// 		`/dashboard/orders/${order.id}`
										// 	)
										// }
									>
										Details
									</Button>
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
