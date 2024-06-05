import { apiSlice } from "../apiSlice";
import { ORDER_ITEM_URL } from "../constants";

export interface OrderItem {
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

export interface Address {
	id: string;
	addressLine1: string;
	addressLine2: string;
	city: string;
	postalCode?: string;
	country: string;
}

export interface Order {
	id: string;
	totalPrice: number;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	orderItems: OrderItem[];
	address?: Address;
	payment: Payment;
}

export interface Payment {
	id: string;
	amount: number;
	method: string;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	orderId: string;
}

export interface OrderRequest {
	orderItems: OrderItem[];
	totalPrice: number;
	address: Partial<Address>;
	payment: Partial<Payment>;
}

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
