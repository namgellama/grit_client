import { apiSlice } from "../apiSlice";
import { AUTH_URL } from "../constants";

export interface User {
	id: string;
	name: string;
	phoneNumber: string;
	email?: string;
	role: string;
	createdAt: string;
	updatedAt: string;
}

export interface CurrentUser extends User {
	token: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<CurrentUser, Partial<User>>({
			query: (data) => ({
				url: `${AUTH_URL}/login`,
				body: data,
				method: "POST",
			}),
		}),
	}),
});

export const { useLoginMutation } = authApiSlice;
