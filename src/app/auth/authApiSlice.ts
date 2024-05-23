import { apiSlice } from "../apiSlice";
import { AUTH_URL } from "../constants";

interface User {
	id: string;
	name: string;
	email?: string;
	phoneNumber: string;
	role: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<User, Partial<User>>({
			query: (data) => ({
				url: `${AUTH_URL}/login`,
				body: data,
				method: "POST",
			}),
		}),
	}),
});

export const { useLoginMutation } = authApiSlice;
