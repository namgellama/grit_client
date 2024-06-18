import { apiSlice } from "../../apiSlice";
import { PRODUCT_URL } from "../../constants";
import { Product } from "../../interfaces/product";

interface QueryParams {
	segment?: string;
	ageStatus?: string;
}

interface Image {
	asset_id: string;
	display_name: string;
	secure_url: string;
	url: string;
	created_at: Date;
}

interface Response {
	message: string;
	image: Image;
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
			{ data: Partial<Product>; token: string }
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

		uploadProductImage: builder.mutation<Response, FormData>({
			query: (data) => ({
				url: `/api/upload`,
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductQuery,
	useAddProductMutation,
	useUploadProductImageMutation,
} = productApiSlice;
