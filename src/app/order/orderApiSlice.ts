import { apiSlice } from "../apiSlice";
import { ORDER_ITEM_URL } from "../constants";

interface OrderItem {
	id: string;
	quantity: number;
	unitPrice: number;
	unitTotalPrice: number;
	size: string;
	color: string;
	createdAt: Date;
	updatedAt: Date;
	productId: string;
}

interface Address {
	id: string;
	addressLine1: string;
	addressLine2: string;
	city: string;
	postalCode?: string;
}

export interface Order {
	id: string;
	totalPrice: number;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	orderItems: OrderItem[];
	address?: Address;
}

export const orderApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation<
			Order,
			{ data: Partial<Order>; token: string }
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
