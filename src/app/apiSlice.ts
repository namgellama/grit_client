import {
	BaseQueryFn,
	FetchArgs,
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";

export interface Error {
	data: { message: string; stack: string };
	error: string;
	status: number;
}

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
}) as unknown as BaseQueryFn<string | FetchArgs, unknown, Error, {}>;

export const apiSlice = createApi({
	baseQuery,
	tagTypes: ["Products", "Categories", "Category"],
	endpoints: () => ({}),
});
