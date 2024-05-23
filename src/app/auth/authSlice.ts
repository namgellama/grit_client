import { createSlice } from "@reduxjs/toolkit";
import { User } from "./authApiSlice";

interface AuthState {
	userInfo?: User | null;
}

const localStorageKey = "userInfo";
const storedUserInfo = localStorage.getItem(localStorageKey);

const initialState: AuthState = storedUserInfo
	? { userInfo: JSON.parse(storedUserInfo) }
	: { userInfo: null };

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = { ...action.payload };
			localStorage.setItem(
				localStorageKey,
				JSON.stringify(action.payload)
			);
		},
	},
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
