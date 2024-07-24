import { apiSlice } from "@/app/apiSlice";
import { DASHBOARD_URL } from "@/app/constants";
import {
	KPI,
	MostSoldProduct,
	RevenueByMonthResponse,
} from "@/app/interfaces/dashboard";

export const dashboardApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getKPI: builder.query<KPI, string>({
			query: (token) => ({
				url: `${DASHBOARD_URL}/kpi`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			providesTags: ["KPI"],
		}),

		getRevenueByMonth: builder.query<RevenueByMonthResponse[], string>({
			query: (token) => ({
				url: `${DASHBOARD_URL}/revenueByMonth`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			providesTags: ["RevenueByMonth"],
		}),

		getMostSoldProducts: builder.query<MostSoldProduct[], string>({
			query: (token) => ({
				url: `${DASHBOARD_URL}/mostSoldProducts`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			providesTags: ["MostSoldProducts"],
		}),
	}),
});

export const {
	useGetKPIQuery,
	useGetRevenueByMonthQuery,
	useGetMostSoldProductsQuery,
} = dashboardApiSlice;
