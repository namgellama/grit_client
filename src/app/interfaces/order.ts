import { User } from "./auth";
import { Product } from "./product";

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
	product: Product;
}

export interface OrderItemRequest {
	quantity: number;
	unitPrice: number;
	unitTotalPrice: number;
	size: string;
	color: string;
	productId: string;
}

export interface Address {
	id: string;
	addressLine1: string;
	addressLine2: string;
	city: string;
	postalCode?: string;
	country: string;
	phoneNumber: string;
}

export interface Order {
	id: string;
	subTotal: number;
	deliveryCharge: number;
	total: number;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	user: User;
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
	orderItems: OrderItemRequest[];
	subTotal: number;
	deliveryCharge: number;
	total: number;
	address: Partial<Address>;
	payment: Partial<Payment>;
}
