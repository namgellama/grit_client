import { useGetKPIQuery } from "@/app/features/dashboard/dashboardApiSlice";
import { useAppSelector } from "@/app/hooks";
import { ErrorMessage } from "@/components";
import { Box, Flex, HStack, Skeleton, Text } from "@chakra-ui/react";
import { BsHandbagFill } from "react-icons/bs";
import { GiTwoCoins } from "react-icons/gi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const KPIData = () => {
	const { user } = useAppSelector((state) => state.auth);

	const { data: kpi, isLoading, error } = useGetKPIQuery(user?.token ?? "");
	const kpiData = [
		{
			icon: <RiMoneyRupeeCircleFill style={{ fontSize: "40px" }} />,
			name: "Revenue",
			data: `Rs. ${kpi?.revenue}`,
		},
		{
			icon: <BsHandbagFill style={{ fontSize: "40px" }} />,
			name: "Orders",
			data: kpi?.orderCount,
		},
		{
			icon: <GiTwoCoins style={{ fontSize: "40px" }} />,
			name: "Average Order Value",
			data: `Rs. ${kpi?.averageOrderValue.toFixed(2)}`,
		},
	];

	return (
		<HStack w="100%" gap={5} mt={5} mb={10}>
			{error ? (
				<ErrorMessage>Something went wrong</ErrorMessage>
			) : (
				kpiData.map((kpi) => (
					<Skeleton key={kpi.name} isLoaded={!isLoading} flex={1}>
						<Flex direction="column" bg="white" p={4} gap={3}>
							{kpi.icon}
							<Box>
								<Text fontWeight="semibold">{kpi.name}</Text>
								<Text fontWeight="bold" fontSize="lg">
									{kpi.data}
								</Text>
							</Box>
						</Flex>
					</Skeleton>
				))
			)}
		</HStack>
	);
};

export default KPIData;
