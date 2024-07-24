import { apiSlice } from "@/app/apiSlice";
import { PRODUCT_URL } from "@/app/constants";
import { Product, ProductCreate } from "@/app/interfaces/product";

interface QueryParams {
	segment?: string;
	ageStatus?: string;
}

export const productApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<Product[], QueryParams>({
			query: ({ segment, ageStatus }) => {
				const params = new URLSearchParams();
				if (segment) params.append("segment", segment);
				if (ageStatus) params.append("ageStatus", ageStatus);

				return {
					url: `${PRODUCT_URL}?${params.toString()}`,
				};
			},
			providesTags: ["Products"],
		}),

		getProduct: builder.query<Product, string>({
			query: (productId) => ({
				url: `${PRODUCT_URL}/${productId}`,
			}),
			providesTags: ["Product"],
		}),

		getProductAdmin: builder.query<
			Product,
			{ productId: string; token: string }
		>({
			query: ({ productId, token }) => ({
				url: `${PRODUCT_URL}/${productId}/admin`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			providesTags: ["AdminProduct"],
		}),

		addProduct: builder.mutation<
			Product,
			{ data: Partial<ProductCreate>; token: string }
		>({
			query: ({ data, token }) => ({
				url: PRODUCT_URL,
				method: "POST",
				body: data,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductQuery,
	useGetProductAdminQuery,
	useAddProductMutation,
} = productApiSlice;
