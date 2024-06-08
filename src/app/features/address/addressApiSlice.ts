import { apiSlice } from "../../apiSlice";
import { ADDRESS_URL } from "../../constants";
import { Address } from "../../interfaces/order";

export const addressApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMyCurrentAddress: builder.query<Address, string>({
			query: (token) => ({
				url: `${ADDRESS_URL}/mine`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			providesTags: ["BagItems"],
		}),
	}),
});

export const { useGetMyCurrentAddressQuery } = addressApiSlice;
