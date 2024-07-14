import { createSlice } from "@reduxjs/toolkit";

const initialState: string[] = [];

const imageSlice = createSlice({
	name: "images",
	initialState,
	reducers: {
		addImage: (state, action) => {
			state.push(...action.payload);
		},

		deleteImage: (state, action) => {
			return state.filter((prevImage) => prevImage !== action.payload);
		},
	},
});

export const { addImage, deleteImage } = imageSlice.actions;

export default imageSlice.reducer;
