import { apiSlice } from "../apiSlice";
import { CATEGORY_URL } from "../constants";

export interface Category {
	id: string;
	name: string;
	image: string;
	createdAt: Date;
	updatedtAt: Date;
}

export const productApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query<Category[], void>({
			query: () => ({
				url: CATEGORY_URL,
			}),
			providesTags: ["Categories"],
		}),
	}),
});

export const { useGetCategoriesQuery } = productApiSlice;
