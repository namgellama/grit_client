import { apiSlice } from "../../apiSlice";
import { PAYMENT_URL } from "../../constants";
import { Payment } from "../../interfaces/order";

export const paymentApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		updatePayment: builder.mutation<
			Payment,
			{ id: string; data: { status: string }; token: string }
		>({
			query: ({ id, data, token }) => ({
				url: `${PAYMENT_URL}/${id}`,
				method: "PATCH",
				body: data,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["Order", "Orders", "MyOrder", "MyOrders"],
		}),
	}),
});

export const { useUpdatePaymentMutation } = paymentApiSlice;
