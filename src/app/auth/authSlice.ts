import { createSlice } from "@reduxjs/toolkit";
import { CurrentUser } from "./authApiSlice";

interface AuthState {
	user?: CurrentUser | null;
}
const localStorageKey = "user";
const storedUser = localStorage.getItem(localStorageKey);

const initialState: AuthState = storedUser
	? { user: JSON.parse(storedUser) }
	: { user: null };

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			localStorage.setItem(
				localStorageKey,
				JSON.stringify(action.payload)
			);
		},

		logout: (state) => {
			state.user = null;
			localStorage.removeItem("user");
		},
	},
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
