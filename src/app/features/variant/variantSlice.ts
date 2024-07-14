import { createSlice } from "@reduxjs/toolkit";

interface Variant {
	color: string;
	size: string | null;
	image: string | null;
}

const initialState: Variant[] = [];

const variantSlice = createSlice({
	name: "variants",
	initialState,
	reducers: {
		addVariant: (state, action) => {
			state.push(action.payload);
		},

		updateVariantSize: (state, action) => {
			const { color, size } = action.payload;
			const variant = state.find(
				(v) => v.color === color && v.size === null
			);
			if (variant) {
				variant.size = size;
			} else {
				state.push(action.payload);
			}
		},

		updateVariantImage: (state, action) => {
			const { color, size, image } = action.payload;

			const variant = state.find(
				(v) => v.color === color && v.size === size
			);

			if (variant) variant.image = image;
		},

		removeVariant: (state, action) => {
			return state.filter((x) => x.color !== action.payload);
		},

		removeSizeVariant: (state, action) => {
			const filteredState = state.filter(
				(x) => x.size === action.payload
			);

			const exceptActionPayload = state.filter(
				(x) => x.size !== action.payload
			);

			if (state.length <= 1) {
				filteredState.map((x) => (x.size = null));
			} else if (
				filteredState.length > 1 &&
				exceptActionPayload.length < 1
			) {
				filteredState.map((x) => (x.size = null));
			} else {
				return state.filter((x) => x.size !== action.payload);
			}
		},
	},
});

export const {
	addVariant,
	updateVariantSize,
	updateVariantImage,
	removeVariant,
	removeSizeVariant,
} = variantSlice.actions;

export default variantSlice.reducer;
