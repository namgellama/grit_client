import { useMemo } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useGetRevenueByMonthQuery } from "../../app/features/dashboard/dashboardApiSlice";
import { useAppSelector } from "../../app/hooks";
import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import HeaderText from "./HeaderText";

const RevenueByMonth = () => {
	const { user } = useAppSelector((state) => state.auth);
	const currentYear = new Date().getFullYear();

	const { data, isLoading, error } = useGetRevenueByMonthQuery(
		user?.token ?? ""
	);

	const revenue = useMemo(() => {
		if (data) {
			const allMonths = [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			];

			const revenueByMonth = Object.fromEntries(
				data.map(({ month, revenue }) => [month, revenue])
			);
			return allMonths.map((month) => ({
				name: month,
				revenue: revenueByMonth[month] || 0,
			}));
		}
	}, [data]);

	return (
		<Card>
			<CardHeader>
				<HeaderText
					heading={`Revenue Month by Month of ${currentYear}`}
					description="Graph representing the revenue month by month"
				/>
			</CardHeader>
			<CardBody>
				<ResponsiveContainer width="100%" height={400}>
					<BarChart
						width={500}
						height={300}
						data={revenue}
						margin={{
							top: 17,
							right: 15,
							left: -5,
							bottom: 8,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="name"
							axisLine={false}
							tickLine={false}
						/>
						<YAxis axisLine={false} tickLine={false} />
						<Tooltip />
						<Bar dataKey="revenue" fill="#4188ff" />
					</BarChart>
				</ResponsiveContainer>
			</CardBody>
		</Card>
	);
};

export default RevenueByMonth;
