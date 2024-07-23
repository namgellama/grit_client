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

		createCategory: builder.mutation<
			Category,
			{ data: Partial<Category>; token: string }
		>({
			query: ({ data, token }) => ({
				url: CATEGORY_URL,
				method: "POST",
				body: data,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["Categories"],
		}),

		updateCategory: builder.mutation<
			Category,
			{ data: Partial<Category>; token: string; categoryId: string }
		>({
			query: ({ data, token, categoryId }) => ({
				url: `${CATEGORY_URL}/${categoryId}`,
				method: "PUT",
				body: data,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["Categories", "Category"],
		}),

		deleteCategory: builder.mutation<null, { id: string; token: string }>({
			query: ({ id, token }) => ({
				url: `${CATEGORY_URL}/${id}`,
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["Categories"],
		}),
	}),
});

export const {
	useGetCategoriesQuery,
	useGetCategoryQuery,
	useCreateCategoryMutation,
	useDeleteCategoryMutation,
	useUpdateCategoryMutation,
} = productApiSlice;
