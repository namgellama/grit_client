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

		removeAllImages: () => {
			return [];
		},
	},
});

export const { addImage, deleteImage, removeAllImages } = imageSlice.actions;

export default imageSlice.reducer;
