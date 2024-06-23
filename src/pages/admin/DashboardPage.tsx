import { Box, SimpleGrid } from "@chakra-ui/react";
import { KPIData, MyContainer, RevenueByMonth } from "../../components";

const DashboardPage = () => {
	return (
		<MyContainer my={2}>
			<KPIData />
			<SimpleGrid columns={2} spacing={10}>
				<Box>
					<RevenueByMonth />
				</Box>
				<Box></Box>
				<Box></Box>
				<Box></Box>
				<Box></Box>
			</SimpleGrid>
		</MyContainer>
	);
};

export default DashboardPage;
