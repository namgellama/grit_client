import { apiSlice } from "../../apiSlice";
import { ORDER_URL } from "../../constants";
import { Order, OrderRequest } from "../../interfaces/order";

interface QueryParams {
	orderStatus?: string;
	paymentStatus?: string;
	sortOrder?: string;
}

export const orderApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getOrders: builder.query<Order[], { token: string }>({
			query: ({ token }) => {
				return {
					url: `${ORDER_URL}`,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
			},
			providesTags: ["Orders"],
		}),

		getMyOrders: builder.query<
			Order[],
			{ token: string; query: QueryParams }
		>({
			query: ({
				token,
				query: { orderStatus, paymentStatus, sortOrder },
			}) => {
				const params = new URLSearchParams();
				if (orderStatus) params.append("orderStatus", orderStatus);
				if (paymentStatus)
					params.append("paymentStatus", paymentStatus);
				if (sortOrder) params.append("sortOrder", sortOrder);

				return {
					url: `${ORDER_URL}/mine?${params.toString()}`,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
			},
			providesTags: ["MyOrders"],
		}),

		getMyOrder: builder.query<Order, { id: string; token: string }>({
			query: ({ id, token }) => ({
				url: `${ORDER_URL}/mine/${id}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			providesTags: ["MyOrder"],
		}),

		createOrder: builder.mutation<
			Order,
			{ data: OrderRequest; token: string }
		>({
			query: ({ data, token }) => ({
				url: ORDER_URL,
				method: "POST",
				body: data,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["MyOrders"],
		}),
	}),
});

export const {
	useGetOrdersQuery,
	useGetMyOrdersQuery,
	useGetMyOrderQuery,
	useCreateOrderMutation,
} = orderApiSlice;
