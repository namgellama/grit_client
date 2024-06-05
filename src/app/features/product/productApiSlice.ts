import { apiSlice } from "../../apiSlice";
import { Category } from "../category/categoryApiSlice";
import { PRODUCT_URL } from "../../constants";

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
	}),
});

export const { useGetProductsQuery, useGetProductQuery } = productApiSlice;
