export interface RevenueByMonthResponse {
	month: string;
	revenue: number;
}

export interface KPI {
	revenue: number;
	orderCount: number;
	averageOrderValue: number;
}
