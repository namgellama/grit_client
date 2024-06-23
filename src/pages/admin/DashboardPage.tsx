import { Box, SimpleGrid } from "@chakra-ui/react";
import { RevenueByMonth } from "../../components";

const DashboardPage = () => {
	return (
		<Box my={2} px={2}>
			<SimpleGrid columns={2} spacing={10}>
				<Box>
					<RevenueByMonth />
				</Box>
				<Box></Box>
				<Box></Box>
				<Box></Box>
				<Box></Box>
			</SimpleGrid>
		</Box>
	);
};

export default DashboardPage;
