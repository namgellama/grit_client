import { apiSlice } from "../apiSlice";
import { Category } from "../category/categoryApiSlice";
import { PRODUCT_URL } from "../constants";

export interface Product {
	id: string;
	name: string;
	color: Color[];
	description: string;
	image: string;
	price: number;
	stock: number;
	sizes: string[];
	segment: string;
	createdAt: Date;
	updateAt: Date;
	categoryId: string;
	category: Category;
}

export interface Color {
	hexColor: string;
	colorName: string;
	image: string;
}

export const productApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query<Product[], void>({
			query: () => ({
				url: `${PRODUCT_URL}`,
			}),
			providesTags: ["Products"],
		}),
	}),
});

export const { useGetProductsQuery } = productApiSlice;
