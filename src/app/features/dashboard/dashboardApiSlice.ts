import { apiSlice } from "../../apiSlice";
import { DASHBOARD_URL } from "../../constants";
import { KPI, RevenueByMonthResponse } from "../../interfaces/dashboard";

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
	}),
});

export const { useGetKPIQuery, useGetRevenueByMonthQuery } = dashboardApiSlice;
