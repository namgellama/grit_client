import { apiSlice } from "../apiSlice";
import { BAG_ITEM_URL } from "../constants";
import { Product } from "../product/productApiSlice";

export interface BagItem {
	id: string;
	productId: string;
	userId: string;
	unitPrice: number;
	quantity: number;
	unitTotalPrice: number;
	size: string;
	color: string;
	createdAt: Date;
	updatedtAt: Date;
	product: Product;
}

export const bagItemApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getBagItems: builder.query<BagItem[], string>({
			query: (token) => ({
				url: BAG_ITEM_URL,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
		createBagItem: builder.mutation<
			BagItem,
			{ data: Partial<BagItem>; token: string }
		>({
			query: ({ data, token }) => ({
				url: BAG_ITEM_URL,
				body: data,
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
	}),
});

export const { useGetBagItemsQuery, useCreateBagItemMutation } =
	bagItemApiSlice;
