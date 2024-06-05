import { apiSlice } from "../../apiSlice";
import { ORDER_ITEM_URL } from "../../constants";
import { Order, OrderRequest } from "../../interfaces/order";

export const orderApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation<
			Order,
			{ data: OrderRequest; token: string }
		>({
			query: ({ data, token }) => ({
				url: ORDER_ITEM_URL,
				method: "POST",
				body: data,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
	}),
});

export const { useCreateOrderMutation } = orderApiSlice;
