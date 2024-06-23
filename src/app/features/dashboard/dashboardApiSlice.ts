import { apiSlice } from "../../apiSlice";
import { DASHBOARD_URL } from "../../constants";
import { RevenueByMonthResponse } from "../../interfaces/dashboard";

export const dashboardApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
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

export const { useGetRevenueByMonthQuery } = dashboardApiSlice;
