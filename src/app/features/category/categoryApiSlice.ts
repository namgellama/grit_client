import { apiSlice } from "../../apiSlice";
import { CATEGORY_URL } from "../../constants";
import { Category } from "../../interfaces/category";

export const productApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCategories: builder.query<Category[], void>({
			query: () => ({
				url: CATEGORY_URL,
			}),
			providesTags: ["Categories"],
		}),
		getCategory: builder.query<Category, string>({
			query: (categoryId) => ({
				url: `${CATEGORY_URL}/${categoryId}`,
			}),
			providesTags: ["Category"],
		}),
	}),
});

export const { useGetCategoriesQuery, useGetCategoryQuery } = productApiSlice;
