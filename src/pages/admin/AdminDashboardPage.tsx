import {
	KPIData,
	MostSoldProducts,
	MyContainer,
	RevenueByMonth,
} from "@/components";
import { Box, SimpleGrid } from "@chakra-ui/react";

const AdminDashboardPage = () => {
	return (
		<MyContainer my={2}>
			<KPIData />
			<SimpleGrid columns={2} spacing={10}>
				<Box>
					<RevenueByMonth />
				</Box>
				<Box>
					<MostSoldProducts />
				</Box>
			</SimpleGrid>
		</MyContainer>
	);
};

export default AdminDashboardPage;
