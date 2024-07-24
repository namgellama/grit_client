import { apiSlice } from "@/app/apiSlice";
import { AUTH_URL } from "@/app/constants";
import { CurrentUser, RegisterRequestDTO, User } from "@/app/interfaces/auth";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<CurrentUser, Partial<User>>({
			query: (data) => ({
				url: `${AUTH_URL}/login`,
				body: data,
				method: "POST",
			}),
		}),
		register: builder.mutation<User, Partial<RegisterRequestDTO>>({
			query: (data) => ({
				url: `${AUTH_URL}/register`,
				body: data,
				method: "POST",
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
