import { apiSlice } from "../../apiSlice";
import { ORDER_ITEM_URL } from "../../constants";
import { Order, OrderRequest } from "../../interfaces/order";

export const orderApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMyOrders: builder.query<Order[], string>({
			query: (token) => ({
				url: `${ORDER_ITEM_URL}/mine`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),

		getMyOrder: builder.query<Order, { id: string; token: string }>({
			query: ({ id, token }) => ({
				url: `${ORDER_ITEM_URL}/mine/${id}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),

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

export const {
	useGetMyOrdersQuery,
	useGetMyOrderQuery,
	useCreateOrderMutation,
} = orderApiSlice;
