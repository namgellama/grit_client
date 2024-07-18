import { apiSlice } from "../../apiSlice";
import { SEARCH_URL } from "../../constants";
import { Product } from "../../interfaces/product";

interface QueryParams {
	name?: string;
}

export const searchApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSearchProducts: builder.query<Product[], QueryParams>({
			query: ({ name }) => {
				const params = new URLSearchParams();
				if (name) params.append("name", name);

				return {
					url: `${SEARCH_URL}?${params.toString()}`,
				};
			},
			providesTags: ["SearchProducts"],
		}),
	}),
});

export const { useGetSearchProductsQuery } = searchApiSlice;
