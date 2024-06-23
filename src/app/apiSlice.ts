import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";

export interface Error {
	data: { message: string; stack: string };
	error: string;
	status: number;
}

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
});

export const apiSlice = createApi({
	baseQuery,
	tagTypes: [
		"Products",
		"Categories",
		"Category",
		"Product",
		"BagItems",
		"Orders",
		"Order",
		"MyOrders",
		"MyOrder",
		"Address",
		"RevenueByMonth",
	],
	endpoints: () => ({}),
});
