import { apiSlice } from "../apiSlice";
import { BAG_ITEM_URL } from "../constants";

export interface BagItem {
	id: string;
	productId: string;
	userId: string;
	unitPrice: number;
	size: string;
	color: string;
	createdAt: Date;
	updatedtAt: Date;
}

export const bagItemApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createCategory: builder.mutation<
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

export const { useCreateCategoryMutation } = bagItemApiSlice;
