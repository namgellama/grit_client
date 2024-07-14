import { apiSlice } from "../../apiSlice";
import { PRODUCT_URL } from "../../constants";
import { Product, ProductCreate } from "../../interfaces/product";

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
	useAddProductMutation,
} = productApiSlice;
