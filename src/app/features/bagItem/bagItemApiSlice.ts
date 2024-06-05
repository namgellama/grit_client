import { apiSlice } from "../../apiSlice";
import { BAG_ITEM_URL } from "../../constants";
import { BagItem } from "../../interfaces/bagItem";

export const bagItemApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getBagItems: builder.query<BagItem[], string>({
			query: (token) => ({
				url: BAG_ITEM_URL,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			providesTags: ["BagItems"],
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
			invalidatesTags: ["BagItems"],
		}),
		updateBagItem: builder.mutation<
			BagItem,
			{ id: string; data: Partial<BagItem>; token: string }
		>({
			query: ({ id, data, token }) => ({
				url: `${BAG_ITEM_URL}/${id}`,
				body: data,
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["BagItems"],
		}),
		deleteBagItem: builder.mutation<null, { id: string; token: string }>({
			query: ({ id, token }) => ({
				url: `${BAG_ITEM_URL}/${id}`,
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["BagItems"],
		}),
		deleteBagItems: builder.mutation<null, string>({
			query: (token) => ({
				url: BAG_ITEM_URL,
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["BagItems"],
		}),
	}),
});

export const {
	useGetBagItemsQuery,
	useCreateBagItemMutation,
	useUpdateBagItemMutation,
	useDeleteBagItemMutation,
	useDeleteBagItemsMutation,
} = bagItemApiSlice;