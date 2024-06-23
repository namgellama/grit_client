import { Box, SimpleGrid } from "@chakra-ui/react";
import {
	KPIData,
	MostSoldProducts,
	MyContainer,
	RevenueByMonth,
} from "../../components";

const DashboardPage = () => {
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

export default DashboardPage;
